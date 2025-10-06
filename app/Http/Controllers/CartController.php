<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        return view('cart.index', compact('cart'));
    }

    public function add(Request $request, Product $product)
    {
        $cart = session()->get('cart', []);
        $quantity = $request->input('quantity', 1);

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $quantity;
        } else {
            $cart[$product->id] = [
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $quantity,
                'image' => $product->images->first()->image_path ?? null,
            ];
        }

        session()->put('cart', $cart);
        return redirect()->route('cart.index')->with('success', 'Product added to cart.');
    }

    public function update(Request $request)
    {
        $cart = session()->get('cart', []);
        foreach ($request->input('quantity', []) as $id => $quantity) {
            if ($quantity <= 0) {
                unset($cart[$id]);
            } else {
                $cart[$id]['quantity'] = $quantity;
            }
        }
        session()->put('cart', $cart);
        return redirect()->route('cart.index')->with('success', 'Cart updated.');
    }

    public function remove($id)
    {
        $cart = session()->get('cart', []);
        unset($cart[$id]);
        session()->put('cart', $cart);
        return redirect()->route('cart.index')->with('success', 'Product removed from cart.');
    }
}