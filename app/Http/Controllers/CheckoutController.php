<?php

namespace App\Http\Controllers;

use App\Mail\OrderConfirmation;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Razorpay\Api\Api;

class CheckoutController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }
    public function index()
    {
        $cart = session()->get('cart', []);
        return view('checkout.index', compact('cart'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'prescription' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:2048',
        ]);

        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Cart is empty.');
        }

        $total = array_sum(array_map(function ($item) {
            return $item['price'] * $item['quantity'];
        }, $cart));

        $order = Order::create([
            'user_id' => Auth::id(),
            'total_amount' => $total,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        foreach ($cart as $id => $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $id,
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        if ($request->hasFile('prescription')) {
            $path = $request->file('prescription')->store('prescriptions', 'public');
            Prescription::create([
                'order_id' => $order->id,
                'file_path' => $path,
            ]);
        }

        // Initiate Razorpay payment
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
        $razorpayOrder = $api->order->create([
            'amount' => $total * 100, // In paise
            'currency' => 'INR',
            'payment_capture' => 1,
        ]);

        $order->update(['razorpay_order_id' => $razorpayOrder['id']]);

        return view('checkout.payment', compact('order', 'cart'));
    }

    public function verify(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
        $attributes = $request->all();

        try {
            $api->utility->verifyPaymentSignature($attributes);
            $order = Order::where('razorpay_order_id', $request->razorpay_order_id)->first();
            $order->update(['payment_status' => 'completed']);
            Mail::to($order->user->email)->send(new OrderConfirmation($order));
            session()->forget('cart');
            return redirect()->route('checkout.success', $order)->with('success', 'Payment successful.');
        } catch (\Exception $e) {
            return redirect()->route('checkout')->with('error', 'Payment failed.');
        }
    }

    public function success(Order $order)
    {
        return view('checkout.success', compact('order'));
    }
}