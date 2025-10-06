<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicine Shop</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Medicine Shop</h1>
        <a href="{{ route('cart.index') }}" class="btn btn-info mb-3">View Cart</a>
        <div class="row">
            @foreach ($products as $product)
                <div class="col-md-4">
                    <div class="card mb-4">
                        @if ($product->images->first())
                            <img src="{{ Storage::url($product->images->first()->image_path) }}" class="card-img-top" alt="{{ $product->name }}">
                        @endif
                        <div class="card-body">
                            <h5 class="card-title">{{ $product->name }}</h5>
                            <p class="card-text">{{ $product->description }}</p>
                            <p class="card-text">Price: ₹{{ $product->price }}</p>
                            <form action="{{ route('cart.add', $product) }}" method="POST">
                                @csrf
                                <input type="number" name="quantity" value="1" min="1" class="form-control d-inline w-25">
                                <button type="submit" class="btn btn-primary">Add to Cart</button>
                            </form>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</body>
</html>