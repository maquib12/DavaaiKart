<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('cart', [CartController::class, 'index'])->name('cart.index');
Route::post('cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
Route::post('cart/update', [CartController::class, 'update'])->name('cart.update');
Route::delete('cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::post('checkout/verify', [CheckoutController::class, 'verify'])->name('checkout.verify');
Route::get('checkout/success/{order}', [CheckoutController::class, 'success'])->name('checkout.success');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'isAdmin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('orders', OrderController::class)->only(['index', 'update']);
    Route::resource('users', UserController::class)->only(['index', 'edit', 'update', 'destroy']);
});
