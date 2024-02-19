import React from "react";
import Navbar from "./UI/Navbar/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import { Spin } from "antd";
import Footer from "./UI/Footer/Footer";
const RootLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      <Navbar />
      {navigation.state === "loading" && (
        <Spin fullscreen size="large" tip="Loading">
          <div
            style={{
              padding: "50px",
              background: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            }}
          />
        </Spin>
      )}
      <div style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
