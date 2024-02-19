import React, { useState } from "react";
import { Form, Input, Button, Steps } from "antd";

const { Step } = Steps;

const Order = ({ totalPrice, setOrderModal }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const backtoFirst = () => setCurrentStep(0);

  const orderId = Date.now();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Steps current={currentStep}>
        <Step title="Order Details" />
        <Step title="Address Details" />
      </Steps>
      {currentStep === 0 && (
        <div>
          <h2>Order Details</h2>
          <p>
            <strong>Order Id:</strong> {orderId}
          </p>
          <p>
            <strong>Price :</strong>$ {totalPrice}
          </p>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 1 && (
        <div>
          <h2>Address Details</h2>
          <AddressForm
            backtoFirst={backtoFirst}
            setModal={(value) => setOrderModal(value, orderId)}
          />
        </div>
      )}
    </div>
  );
};

const AddressForm = ({ backtoFirst, setModal }) => {
  const onFinish = (values) => {
    setModal(false);
  };

  return (
    <Form
      name="address-form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[{ required: true, message: "Please enter your full name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please enter your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "Please enter your city!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Postal Code"
        name="postalcode"
        rules={[{ required: true, message: "Please enter your postal code!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          danger
          style={{ marginRight: "2rem" }}
          onClick={backtoFirst}
        >
          Back to 1
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Order;
