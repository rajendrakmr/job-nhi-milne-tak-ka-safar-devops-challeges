import React, { useEffect, useState } from "react";
import { addProduct, getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Grid,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProduct({ name: "", price: "", description: "", image: null });
    setPreview(null);
  };

  // 📸 Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
      setPreview(URL.createObjectURL(file)); // temporary preview URL
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", newProduct.name);
  formData.append("price", newProduct.price);
  formData.append("description", newProduct.description);
  if (newProduct.image) {
    formData.append("image", newProduct.image);
  }

  await addProduct(formData);

  handleClose();
  const res = await getProducts();
  setProducts(res.data);
}
  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", py: 6 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={5}
        >
          <Typography variant="h4" fontWeight={700} color="text.primary">
            Our Products
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            + Add Product
          </Button>
        </Stack>

        {/* Product Listing */}
        <Grid container spacing={3}>
          {products && products.length > 0 ? (
            products.map((p) => (
              <Grid item key={p._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={p} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ py: 10 }}
              >
                No products available. Click “Add Product” to create one.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* MUI Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} textAlign="center">
            Add New Product
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Product Name"
                variant="outlined"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />

              {/* 📸 Image Upload */}
              <Stack spacing={1}>
                <Button variant="outlined" component="label">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>

                {/* Preview */}
                {preview && (
                  <Box
                    sx={{
                      mt: 1,
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid #ddd",
                    }}
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </Stack>

              {/* Buttons */}
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
