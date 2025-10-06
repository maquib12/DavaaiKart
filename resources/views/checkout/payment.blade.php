<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Make Payment</h1>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($cart as $id => $item)
                    <tr>
                        <td>{{ $item['name'] }}</td>
                        <td>₹{{ $item['price'] }}</td>
                        <td>{{ $item['quantity'] }}</td>
                        <td>₹{{ $item['price'] * $item['quantity'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <form action="{{ route('checkout.verify') }}" method="POST" id="razorpay-form">
            @csrf
            <input type="hidden" name="razorpay_payment_id" id="razorpay_payment_id">
            <input type="hidden" name="razorpay_order_id" id="razorpay_order_id" value="{{ $order->razorpay_order_id }}">
            <input type="hidden" name="razorpay_signature" id="razorpay_signature">
            <button id="rzp-button" class="btn btn-success">Pay ₹{{ $order->total_amount }}</button>
        </form>
    </div>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
        var options = {
            "key": "{{ env('RAZORPAY_KEY') }}",
            "amount": {{ $order->total_amount * 100 }},
            "currency": "INR",
            "order_id": "{{ $order->razorpay_order_id }}",
            "name": "Medicine Shop",
            "description": "Order #{{ $order->id }}",
            "handler": function (response) {
                document.getElementById('razorpay_payment_id').value = response.razorpay_payment_id;
                document.getElementById('razorpay_order_id').value = response.razorpay_order_id;
                document.getElementById('razorpay_signature').value = response.razorpay_signature;
                document.getElementById('razorpay-form').submit();
            }
        };
        var rzp = new Razorpay(options);
        document.getElementById('rzp-button').onclick = function (e) {
            rzp.open();
            e.preventDefault();
        }
    </script>
</body>
</html>