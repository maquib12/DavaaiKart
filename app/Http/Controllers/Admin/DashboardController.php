<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalOrders = Order::count();
        $totalSales = Order::where('status', 'delivered')->sum('total_amount');
        $totalProducts = Product::count();
        $totalUsers = User::count();

        return view('admin.dashboards.index', compact('totalOrders', 'totalSales', 'totalProducts', 'totalUsers'));
    }
}