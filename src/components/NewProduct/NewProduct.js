import React from "react";
import { Form, Input, InputNumber, Select, Switch, Button } from "antd";
import classes from "./NewProduct.module.css";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const NewProduct = ({ data, isEdit, setModal, setForm }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    const {
      title,
      material,
      imageurl,
      manufacturer,
      description,
      color,
      price,
      approved,
      category,
    } = values;
    const payload = {
      title,
      material,
      imageurl,
      manufacturer,
      description,
      color,
      price,
      approved,
      category,
    };
    if (isEdit) {
      payload.productId = data._id;
      fetch("http://localhost:8080/admin/edit-product", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          setModal(false);
          navigate("/admin/approval");
        })
        .catch((err) => console.log(err));
    }
    if (!isEdit) {
      fetch("http://localhost:8080/admin/add-product", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          setForm(false);
          navigate("/admin/approval");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Form
      className={classes.productFormContainer}
      name="productForm"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ approved: false }}
    >
      <Form.Item
        className={classes.productFormItem}
        initialValue={data?.title || ""}
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input className={classes.input} />
      </Form.Item>
      <Form.Item
        className={classes.productFormItem}
        initialValue={data?.price || ""}
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <InputNumber min={0} className={classes.input} />
      </Form.Item>
      <Form.Item
        className={classes.productFormItem}
        name="description"
        label="Description"
        initialValue={data?.description || ""}
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea className={classes.input} />
      </Form.Item>
      <Form.Item
        className={classes.productFormItem}
        name="material"
        label="Material"
        initialValue={data?.material || ""}
        rules={[{ required: true, message: "Please select the material!" }]}
      >
        <Select>
          <Option value="cotton">Cotton</Option>
          <Option value="leather">Leather</Option>
          <Option value="polyester">Polyester</Option>
          <Option value="velvet">Velvet</Option>
          <Option value="silk">Silk</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item
        className={classes.productFormItem}
        name="color"
        label="Color"
        initialValue={data?.color || ""}
        rules={[{ required: true, message: "Please input the color!" }]}
      >
        <Input className={classes.input} />
      </Form.Item>
      <Form.Item
        className={classes.productFormItem}
        name="category"
        label="Category"
        initialValue={data?.category || ""}
        rules={[{ required: true, message: "Please select the Category!" }]}
      >
        <Select>
          <Option value="men">Men</Option>
          <Option value="women">Women</Option>
        </Select>
      </Form.Item>
      <Form.Item name="approved" label="Approved" valuePropName="checked">
        <Switch disabled={!data} initialValue={data?.approved || false} />
      </Form.Item>
      <Form.Item
        name="imageurl"
        className={classes.productFormItem}
        label="Image URL"
        rules={[{ required: true }]}
        initialValue={data?.image_url || ""}
      >
        <Input className={classes.input} />
      </Form.Item>
      <Form.Item
        name="manufacturer"
        className={classes.productFormItem}
        label="Manufacturer"
        initialValue={data?.manufacturer || ""}
        rules={[{ required: true, message: "Please input the manufacturer!" }]}
      >
        <Input className={classes.input} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
        <Button type="primary" htmlType="submit" className={classes.submit}>
          {isEdit ? "Update Product" : "Add Product"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewProduct;
