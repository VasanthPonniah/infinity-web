import React from "react";
import { Layout, Row, Col } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        background: "#001529",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Row gutter={16} justify="center">
        <Col>
          <h2>Contact Us</h2>
          <p>Email: infinitee@gmail.com</p>
          <p>Phone: +9585086815</p>
        </Col>
        <Col>
          <h2>Follow Us</h2>
          <div style={{ fontSize: "24px" }}>
            <InstagramOutlined style={{ marginRight: "10px", color: "#fff" }} />
            <FacebookOutlined style={{ marginRight: "10px", color: "#fff" }} />
            <TwitterOutlined style={{ color: "#fff" }} />
          </div>
        </Col>
      </Row>
      <p style={{ marginTop: "20px" }}>©2024 Copyrights reserved.</p>
    </Layout.Footer>
  );
};

export default Footer;
