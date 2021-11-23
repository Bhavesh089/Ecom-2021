import React, { useEffect } from "react";
import { Button, Form, Input, Select, InputNumber } from "antd";
import { SendOutlined } from "@ant-design/icons";

const ProductUpdateForm = ({
  values,
  handleSubmit,
  setValues,
  categoriesHandleChange,
  categories,

  subOptions,

  arrayofSubs,
  setArrayofSubs,
  SelectedCategory,
}) => {
  const {
    title,
    offerPrice,
    price,
    description,
    category,
    subCat,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...values });
    form.setFieldsValue({
      offInd: offerPrice.ind,
      ind: price.ind,
      us: price.us,
      category: SelectedCategory ? SelectedCategory : category._id,
      subCat: arrayofSubs,
    });
  });

  return (
    <>
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        layout={"vertical"}
      >
        {/* title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please provide product title!",
            },
          ]}
        >
          <Input
            placeholder="title.."
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="success-focus"
          />
        </Form.Item>

        {/* description */}
        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please provide product Description!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Description.."
            value={description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            className="success-focus"
          />
        </Form.Item>

        {/* offerPrice */}
        <Form.Item
          label="price in ₹ :"
          name="offInd"
          rules={[
            {
              type: "number",
              min: 0,
              max: 10000,
              required: true,
              message: "Please provide offer price in Rupees",
            },
          ]}
          style={{ display: "inline-block" }}
        >
          <InputNumber
            placeholder="Rupees.."
            value={offerPrice.ind}
            onChange={(value) => {
              let offerPrice = { ...values.offerPrice };
              offerPrice.ind = value;
              setValues({ ...values, offerPrice });
            }}
            className="success-focus"
            required
          />
        </Form.Item>

        {/* price */}

        <Form.Item
          label="price in ₹ :"
          name="ind"
          rules={[
            {
              type: "number",
              min: 0,
              max: 10000,
              required: true,
              message: "Please provide price in Rupees",
            },
          ]}
          style={{ display: "inline-block" }}
        >
          <InputNumber
            placeholder="Rupees.."
            value={price.ind}
            onChange={(value) => {
              let price = { ...values.price };
              price.ind = value;
              setValues({ ...values, price });
            }}
            className="success-focus"
            required
          />
        </Form.Item>

        <Form.Item
          label="price in US $"
          name="us"
          rules={[
            {
              type: "number",
              min: 0,
              max: 10000,
              required: true,
              message: "Please provide price in Dollers",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <InputNumber
            placeholder="Doller.."
            value={price.us}
            onChange={(value) => {
              let price = { ...values.price };
              price.us = value;
              setValues({ ...values, price });
            }}
            className="success-focus"
          />
        </Form.Item>

        {/* shipping */}
        <Form.Item label="Shipping" name="shipping">
          <Select
            placeholder="shipping"
            onChange={(value) => {
              setValues({ ...values, shipping: value });
            }}
            className="success-focus"
          >
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>

        {/* Quantity */}
        <Form.Item
          label="Product Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please provide product quantity!",
            },
          ]}
        >
          <InputNumber
            placeholder="quantity.."
            value={quantity}
            onChange={(value) => setValues({ ...values, quantity: value })}
            className="success-focus"
          />
        </Form.Item>

        {/* colors */}
        <Form.Item label="colors" name="color">
          <Select
            placeholder="select color..."
            onChange={(value) => setValues({ ...values, color: value })}
            className="success-focus"
          >
            {colors.map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* brands */}
        <Form.Item label="Brands" name="brand">
          <Select
            placeholder="select brand"
            onChange={(value) => {
              setValues({ ...values, brand: value });
            }}
            className="success-focus"
          >
            {brands.map((b) => (
              <Select.Option key={b} value={b}>
                {b}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* categories */}
        <Form.Item label="category" name="category">
          <Select
            placeholder="Choose Category.."
            onChange={(value) => categoriesHandleChange(value)}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
          </Select>
          {/* {JSON.stringify(values)} */}
        </Form.Item>

        {/* subCategories */}

        <Form.Item label="Sub Category" name="subCat">
          <Select
            defaultValue={arrayofSubs}
            placeholder="Choose Sub Category.."
            mode="multiple"
            style={{ width: "100%" }}
            onChange={(value) => setArrayofSubs(value)}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Select.Option key={s._id} value={s._id}>
                  {s.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Button
          onClick={handleSubmit}
          htmlType="submit"
          type="primary"
          shape="round"
          block
          className="mb-3"
          size="large"
          icon={<SendOutlined />}
          ghost
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProductUpdateForm;
