<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Checkout</h1>
        <form action="{{ route('checkout.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
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
            <div class="form-group">
                <label for="prescription">Upload Prescription (Optional)</label>
                <input type="file" name="prescription" id="prescription" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Place Order</button>
        </form>
    </div>
</body>
</html>