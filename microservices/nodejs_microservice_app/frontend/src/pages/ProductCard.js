import React from "react";
import { addToCart } from "../api/shoppingApi";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    addToCart({ productId: product._id, quantity: 1 });
  };

  return (
    <div className="card">
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
