<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cart</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Shopping Cart</h1>
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if (empty($cart))
            <p>Your cart is empty.</p>
        @else
            <form action="{{ route('cart.update') }}" method="POST">
                @csrf
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($cart as $id => $item)
                            <tr>
                                <td>{{ $item['name'] }}</td>
                                <td>₹{{ $item['price'] }}</td>
                                <td>
                                    <input type="number" name="quantity[{{ $id }}]" value="{{ $item['quantity'] }}" min="0" class="form-control w-25">
                                </td>
                                <td>₹{{ $item['price'] * $item['quantity'] }}</td>
                                <td>
                                    <form action="{{ route('cart.remove', $id) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-danger">Remove</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <button type="submit" class="btn btn-primary">Update Cart</button>
                <a href="{{ route('checkout') }}" class="btn btn-success">Proceed to Checkout</a>
            </form>
        @endif
    </div>
</body>
</html>