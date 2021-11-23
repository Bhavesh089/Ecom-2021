import React from "react";
import { Table, Tag, Space, Input, Button } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AdminOrdersTable = ({ orders, handleStatusChange }) => {
  const columns = [
    {
      title: "Client Name",
      dataIndex: ["orderedBy", "name"],
      key: "name",
      fixed: "left",
    },
    {
      title: "Phone Number",
      dataIndex: ["toAddress", "phoneNumber"],
      key: "phoneNumber",
    },

    {
      title: "pincode",
      dataIndex: "toAddress",
      key: "phoneNumber",
      render: (record) => (
        <div>
          <p>{record.pincode}</p>
          <p>{record.address}</p>
        </div>
      ),
    },

    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products) =>
        products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} = ₹
              {p.product.price.ind * p.count}
            </p>
          </div>
        )),
    },
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total Amount",
      dataIndex: ["PaymentDetails", "TXNAMOUNT"],
      key: "TotalAmount",
    },
    {
      title: "Transaction ID",
      dataIndex: ["PaymentDetails", "TXNID"],
      key: "transactionId",
    },
    {
      title: "Payment Status",
      dataIndex: ["PaymentDetails", "STATUS"],
      key: "paymentStatus",
      render: (record) => {
        if (record === "TXN_SUCCESS") {
          return <CheckCircleOutlined className="text-center text-success" />;
        } else {
          return <CloseCircleOutlined className="text-center text-danger" />;
        }
      },
    },
    {
      title: "Date/Time",
      dataIndex: ["PaymentDetails", "TXNDATE"],
      key: "date",
    },

    {
      title: "Order Status",
      key: "orderStatus",
      fixed: "left",
      render: (record) => (
        <select
          className="form-control"
          defaultValue={record.orderStatus}
          name="status"
          onChange={(e) => handleStatusChange(record._id, e.target.value)}
        >
          <option value="Not Processed">Not Processed</option>
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      ),
    },
  ];

  return (
    <Table
      className="table-res"
      columns={columns}
      dataSource={[...orders]}
      rowKey={(record) => record._id}
      scroll={{ x: 1500 }}
    />
  );
};

export default AdminOrdersTable;
