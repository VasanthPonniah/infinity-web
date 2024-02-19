import React, { useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import NewProduct from "../NewProduct/NewProduct";
import { useNavigate } from "react-router-dom";
import classes from "./ProductsTable.module.css";

const ProductTable = ({ data }) => {
  const [modal, showModal] = useState(false);
  const [record, setRecord] = useState({});

  const navigate = useNavigate();

  const onDelete = (record) => {
    const payload = { productId: record._id };
    fetch("http://localhost:8080/admin/delete-product", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => navigate("/admin/approval"))
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: classes.heading,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Approved",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => (
        <span>{approved ? "Approved" : "Not Approved"}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setRecord(record);
              showModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={classes.tableContainer}>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={(record, index) =>
            index % 2 === 0 ? classes.evenRow : classes.oddRow
          }
          bordered
          pagination={false}
        />
      </div>
      {modal && (
        <Modal open={modal} closable={false} footer={null}>
          <NewProduct data={record} isEdit={true} setModal={showModal} />
        </Modal>
      )}
    </>
  );
};

export default ProductTable;
