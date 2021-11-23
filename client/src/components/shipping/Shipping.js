import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, InputNumber, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const Shipping = ({
  shipping,
  setShipping,
  handleOk,
  handleCancelShipping,
  showModal,
  visibleShipping,
  confirmShippingLoading,
}) => {
  const { name, pincode, address, landmark, phoneNumber } = shipping;

  const shippingForm = () => (
    <Form
      initialValues={{
        remember: true,
      }}
      layout={"vertical"}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please provide your Name!",
          },
        ]}
      >
        <Input
          placeholder="Name.."
          value={name}
          onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
          className="success-focus"
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please provide your Address!",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Address.."
          value={address}
          onChange={(e) =>
            setShipping({ ...shipping, address: e.target.value })
          }
          className="success-focus"
        />
      </Form.Item>

      <Form.Item
        label="Mobile Number"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please provide valid number",
          },
          {
            pattern: new RegExp(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/),
            message: "Enter valid phone number",
          },
        ]}
      >
        <Input
          placeholder="90221391xxx.."
          value={phoneNumber}
          onChange={(e) => {
            setShipping({ ...shipping, phoneNumber: e.target.value });
          }}
          className="success-focus"
          required
        />
      </Form.Item>

      <Form.Item
        label="pincode"
        name="pincode"
        rules={[
          {
            type: "number",
            required: true,
            message: "Please provide valid Pincode",
          },
          {
            pattern: new RegExp(/^[1-9][0-9]{5}$/),
            message: "Provide valid pincode !",
          },
        ]}
        style={{ display: "inline-block" }}
      >
        <InputNumber
          placeholder="pincode.."
          value={pincode}
          onChange={(value) => {
            setShipping({ ...shipping, pincode: value });
          }}
          className="success-focus"
          required
        />
      </Form.Item>

      <Form.Item
        label="Landmark"
        name="Landmark"
        rules={[
          {
            required: true,
            message: "Please provide your Landmark!",
          },
        ]}
      >
        <Input
          placeholder="Landmark.."
          value={landmark}
          onChange={(e) =>
            setShipping({ ...shipping, landmark: e.target.value })
          }
          className="success-focus"
        />
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add an address
      </Button>
      <Modal
        title="Please Provide your Address"
        visible={visibleShipping}
        onOk={handleOk}
        confirmLoading={confirmShippingLoading}
        onCancel={handleCancelShipping}
      >
        {shippingForm()}
      </Modal>
    </>
  );
};

export default Shipping;
