import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ManOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { Badge, Menu, message } from "antd";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { CartContext } from "../../store/CartContext";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const AuthCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const Profile = () => {
    return AuthCtx.isLoggedIn || AuthCtx.isAdminLoggedIn ? (
      <NavLink
        onClick={() => {
          message.success({ content: "Logged out successfullly" });
          AuthCtx.adminLogout();
          AuthCtx.logout();
          CartCtx.emptyCart();
          navigate("/login");
        }}
      >
        <LogoutOutlined />
      </NavLink>
    ) : (
      <NavLink to={"/login"}>
        <LoginOutlined />
      </NavLink>
    );
  };

  const items = [
    {
      label: "Infiniteee",
      icon: (
        <NavLink to={"/"}>
          <img
            alt="Infinitee"
            style={{ height: "40px", width: "40px", objectFit: "contain" }}
            src="https://media.istockphoto.com/id/851997516/vector/infinity-symbol-with-color-gradient.jpg?s=612x612&w=0&k=20&c=Hd-JnPsI8d-QQn5xg7INFipUgupQYFlpFKd81L3yBPQ="
          />
        </NavLink>
      ),
    },
    {
      label: "Home",
      key: "home",
      icon: (
        <NavLink to={"/"}>
          <HomeOutlined />
        </NavLink>
      ),
    },
    {
      label: "Men",
      key: "men",
      icon: (
        <NavLink to={"/products?men=true"}>
          <ManOutlined />
        </NavLink>
      ),
    },
    {
      label: "Women",
      key: "women",
      icon: (
        <NavLink to={"/products?women=true"}>
          <WomanOutlined />
        </NavLink>
      ),
    },
    {
      label: AuthCtx.isAdminLoggedIn ? "Approval" : "Cart",
      key: "cart",
      icon: AuthCtx.isAdminLoggedIn ? (
        <NavLink to={"/admin/approval"}>
          <ProfileOutlined />
        </NavLink>
      ) : (
        <NavLink to={"/cart"}>
          <Badge count={CartCtx.cartItems.length} size="small">
            <ShoppingCartOutlined />
          </Badge>
        </NavLink>
      ),
    },
    {
      label: "Admin",
      key: "admin",
      icon: (
        <NavLink to={"/admin/login"}>
          <UserOutlined />
        </NavLink>
      ),
    },
    {
      label: AuthCtx.isAdminLoggedIn || AuthCtx.isLoggedIn ? "Logout" : "Login",
      key: "auth",
      icon: <Profile />,
    },
  ];

  return <Menu mode="horizontal" items={items} className={classes.menu} />;
};
export default Navbar;
