import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

const ProductCard = ({ product }) => (
  <Card
    sx={{
      width: 250, // ✅ FIXED WIDTH
      height: 350, // ✅ FIXED HEIGHT (optional)
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: 3,
      boxShadow: 2,
      "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
      transition: "0.3s",
    }}
  >
    <CardMedia
      component="img"
      height="160"
      image={`https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/300/200`}
      alt={product.name}
    />


    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom noWrap>
        {product.name}
      </Typography>
      <Typography color="primary" fontWeight={600}>
        ₹{product.price}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 1,
          height: 40,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {product.description || "No description available"}
      </Typography>
    </CardContent>

    <Box sx={{ p: 2, pt: 0 }}>
      <Button
        fullWidth
        variant="contained"
        sx={{ borderRadius: 2, textTransform: "none" }}
      >
        Add to Cart
      </Button>
    </Box>
  </Card>
);

export default ProductCard;
