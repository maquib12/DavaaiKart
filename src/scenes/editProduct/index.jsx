import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom"; // Assuming you use React Router
import { useGetProductByIdQuery, useUpdateProductMutation } from "state/api";

const EditProduct = () => {
  const { id } = useParams();
  const { data: productData } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product).unwrap();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (!product) return <>Loading...</>;

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Supply"
          name="supply"
          type="number"
          value={product.supply}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={product.rating}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
