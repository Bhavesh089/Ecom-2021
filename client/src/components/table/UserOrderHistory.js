import React from "react";

import { Table } from "antd";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const UserOrderTable = ({ order }) => {
  console.log(order);

  const columns = [
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
  ];

  return (
    <Table
      className="table-res"
      columns={columns}
      dataSource={order}
      rowKey={(record) => record._id}
      scroll={{ x: 500 }}
    />
  );
};

export default UserOrderTable;
