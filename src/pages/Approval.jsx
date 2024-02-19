import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import { Button } from "antd";
import NewProuct from "../components/NewProduct/NewProduct";
import { AuthContext } from "../store/AuthContext";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const ApprovalPage = () => {
  const pendingProducts = useLoaderData();
  const [showForm, setShowForm] = useState(false);
  const AuthCtx = useContext(AuthContext);

  if (!AuthCtx.isAdminLoggedIn) {
    return (
      <div style={{ textAlign: "center", height: "30rem" }}>
        <h4>You need Admin Access</h4>
        <p>
          Try <Link to={"/admin/login"}>Logging in </Link>
        </p>
      </div>
    );
  }
  return (
    <>
      <ProductsTable data={pendingProducts} />
      <Button
        onClick={() => setShowForm((prev) => !prev)}
        style={{ margin: "2rem 10rem" }}
        type="primary"
        danger
      >
        Add Product
        <PlusOutlined />
      </Button>
      {showForm && <NewProuct setForm={(value) => setShowForm(value)} />}
    </>
  );
};

export async function loader() {
  const response = await fetch("http://localhost:8080/admin/pending-products");
  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    return null;
  }
}

export default ApprovalPage;
