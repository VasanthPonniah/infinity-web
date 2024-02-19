import React, { useContext } from "react";
import classes from "./ProductDetail.module.css";
import { CartContext } from "../../store/CartContext";
import ViewCartAlert from "../ViewCartAlert/ViewCartAlert";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Rate } from "antd";

const ProductDetail = ({ product }) => {
  const AuthCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const addToCartHandler = (prod) => {
    if (AuthCtx.isLoggedIn) {
      CartCtx.addItem(prod);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={classes.ProductDetail}>
      <div className={classes.productImage}>
        <img src={product.image_url} alt={product.title} />
      </div>
      <div className={classes.productInfo}>
        <h2>{product.title}</h2>
        <p className={classes.price}>${product.price.toFixed(2)}</p>
        <p className={classes.description}>{product.description}</p>
        <p className={classes.material}>
          <strong>Material:</strong> {product.material}
        </p>
        <p className={classes.manufacturer}>
          <strong>Manufacturer: </strong>
          {product.manufacturer}
        </p>
        <p className={classes.color}>
          <strong>Color:</strong> {product.color}
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rate value={product.reviews} allowHalf />
          <p>({product.num_reviews})</p>
        </div>
        <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
        <Button
          onClick={() =>
            product.category === "men"
              ? navigate("/products?men=true")
              : navigate("/products?women=true")
          }
          style={{ marginLeft: "20px", height: "40px" }}
          type="primary"
          danger
        >
          Continue shopping
        </Button>
      </div>
      {CartCtx.cartItems.find((item) => item._id === product._id) && (
        <ViewCartAlert />
      )}
    </div>
  );
};

export default ProductDetail;
