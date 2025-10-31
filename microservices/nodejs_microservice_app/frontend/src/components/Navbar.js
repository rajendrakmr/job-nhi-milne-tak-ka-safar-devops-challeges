import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={{ color: "white" }}>🛍️ ShopApp</h2>
      <div>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/cart">Cart</Link>
        <Link style={styles.link} to="/login">Login</Link>
        <Link style={styles.link} to="/register">Register</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#333",
    padding: "10px 20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "15px"
  }
};
