<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Success</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Order Placed Successfully</h1>
        <p>Order ID: {{ $order->id }}</p>
        <p>Total Amount: ₹{{ $order->total_amount }}</p>
        <a href="{{ route('home') }}" class="btn btn-primary">Continue Shopping</a>
    </div>
</body>
</html>