import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  TextField,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery, useDeleteProductMutation } from "state/api";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => onEdit(_id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => onDelete(_id)}
        >
          Delete
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Filtered and paginated data
  // const filteredProducts = data?.filter(
  //   (product) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredProducts = data?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts?.slice((page - 1) * pageSize, page * pageSize);

  // Reset pagination on search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page
  };
  // Handlers
  const handleAddProduct = () => {
    navigate("/products/add"); // Navigate to AddProduct page
  };
  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`); // Navigate to EditProduct page with ID
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <Box mt="20px" display="flex" justifyContent="space-between">
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mr: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          sx={{ flexShrink: 0 }}
        >
          Add Product
        </Button>
      </Box>
      {paginatedProducts || !isLoading ? (
        <>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {paginatedProducts.map(
              ({
                _id,
                name,
                description,
                price,
                rating,
                category,
                supply,
                stat,
              }) => (
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={supply}
                  stat={stat}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            )}
          </Box>
          <Box
            mt="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Typography>
              Page {page} of {Math.ceil(filteredProducts.length / pageSize)}
            </Typography>
            <Button
              variant="contained"
              disabled={page * pageSize >= filteredProducts.length}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
