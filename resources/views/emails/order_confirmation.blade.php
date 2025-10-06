<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>
</head>
<body>
    <h1>Thank You for Your Order!</h1>
    <p>Order ID: {{ $order->id }}</p>
    <p>Total Amount: ₹{{ $order->total_amount }}</p>
    <h2>Order Items</h2>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($order->items as $item)
                <tr>
                    <td>{{ $item->product->name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>₹{{ $item->price }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    @if ($order->prescription)
        <p>Prescription: <a href="{{ Storage::url($order->prescription->file_path) }}">View</a></p>
    @endif
</body>
</html>