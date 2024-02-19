import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { CartContext } from "../../store/CartContext";
import Order from "../Order/Order";
import classes from "./Cart.module.css";

const Cart = () => {
  const CartCtx = useContext(CartContext);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const postOrder = (orderId) => {
    const payload = {
      orderId,
      user: AuthCtx.user,
      products: CartCtx.cartItems,
    };
    fetch("http://localhost:8080/user/post-order", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        message.success({
          content: data.message || "Your order have been placed",
          style: { marginTop: "20vh" },
        });
        CartCtx.emptyCart();
        navigate("/");
      })
      .catch((err) => console.log(err, "Err"));
  };

  const totalPrice =
    CartCtx.cartItems?.length &&
    CartCtx.cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  if (!AuthCtx.isLoggedIn) {
    return (
      <div style={{ textAlign: "center", height: "35rem" }}>
        <h4>You need to log in</h4>
        <p>
          Try <Link to={"/login"}>Logging in </Link>
        </p>
      </div>
    );
  }
  return (
    <div className={classes.cartContainer}>
      <h2>Shopping Cart</h2>
      {CartCtx.cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={classes.cartItems}>
          {CartCtx.cartItems.map((item) => (
            <div key={item._id} className={classes.cartItem}>
              <img
                src={item.image_url}
                alt={item.title}
                className={classes.cartImage}
              />
              <div className={classes.cartItemDetails}>
                <p className={classes.cartItemTitle}>{item.title}</p>
                <p className={classes.cartItemPrice}>${item.price}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <MinusOutlined onClick={() => CartCtx.removeItem(item._id)} />
                  <PlusOutlined onClick={() => CartCtx.addItem(item)} />
                </div>
                <div
                  style={{
                    float: "right",
                    top: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  <p>X {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {CartCtx.cartItems.length ? (
        <>
          <h3
            style={{
              textAlign: "center",
              backgroundColor: "#ffffff",
              height: "40px",
              paddingTop: "10px",
            }}
          >
            Total Price $ {totalPrice}
          </h3>
          <button className={classes.cartButton} onClick={() => setModal(true)}>
            Place Your Order
          </button>
        </>
      ) : (
        <span></span>
      )}
      {modal && (
        <Modal open={modal} closable={false} footer={null}>
          <Order
            totalPrice={totalPrice}
            setOrderModal={(value, orderId) => {
              postOrder(orderId);
              setModal(value);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Cart;
