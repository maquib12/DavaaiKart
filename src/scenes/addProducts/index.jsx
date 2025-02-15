import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useAddProductMutation } from "../../state/api";

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();
  const [product, setProduct] = useState({
    name: "",
    composition: "",
    manufacturer: "",
    consumeType: "",
    returnPolicy: "",
    expires: "",
    price: "",
    numberOfProducts: "",
    packetSize: "",
    description: "",
    category: "",
    rating: "",
    supply: "",
  });

  const [image, setImage] = useState(null); // For single image
  const [imagePreview, setImagePreview] = useState(null); // For preview
  const [additionalImages, setAdditionalImages] = useState([]); // For multiple images

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Generate preview URL
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("composition", product.composition);
    formData.append("manufacturer", product.manufacturer);
    formData.append("consumeType", product.consumeType);
    formData.append("returnPolicy", product.returnPolicy);
    formData.append("expires", product.expires);
    formData.append("price", product.price);
    formData.append("numberOfProducts", product.numberOfProducts);
    formData.append("packetSize", product.packetSize);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("rating", product.rating);
    formData.append("supply", product.supply);

    if (image) {
      formData.append("image", image);
    }
    additionalImages.forEach((img, index) => {
      formData.append("images", img);
    });

    try {
      await addProduct(formData).unwrap();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Composition"
          name="composition"
          value={product.composition}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Manufacturer"
          name="manufacturer"
          value={product.manufacturer}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Consume Type"
          name="consumeType"
          select
          value={product.consumeType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {["Oral", "Injection", "Topical", "Inhaler"].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Return Policy"
          name="returnPolicy"
          value={product.returnPolicy}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Expires"
          name="expires"
          type="date"
          value={product.expires}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Number of Products"
          name="numberOfProducts"
          type="number"
          value={product.numberOfProducts}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Packet Size"
          name="packetSize"
          value={product.packetSize}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
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
          required
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={product.rating}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ inputProps: { min: 0, max: 5 } }}
        />
        <TextField
          label="Supply"
          name="supply"
          type="number"
          value={product.supply}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Box mt="20px">
          <Typography variant="subtitle1">Upload Image</Typography>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <Box mt="10px">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </Box>
          )}
        </Box>
        <Box mt="20px">
          <Typography variant="subtitle1">Upload Additional Images</Typography>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: "20px" }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};
export default AddProduct;
