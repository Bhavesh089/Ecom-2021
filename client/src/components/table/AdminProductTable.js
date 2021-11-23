import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Tag, Space, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const AdminProductTable = ({ product, handleRemoveProduct }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleTableChange = (pagination) => {
    console.log(pagination);
  };

  let searchInput;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            const searchInput = node;
            // setTimeout(node);
          }}
          placeholder={
            dataIndex === "createdAt" ? "yy-mm-dd" : `Search ${dataIndex}`
          }
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleSearch(selectedKeys, confirm, dataIndex);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      // case for category
      dataIndex[0] === "category"
        ? record[dataIndex]
          ? record[dataIndex]["name"]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : ""
        : //elseif slug case
        dataIndex === "title"
        ? record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : ""
        : dataIndex === "createdAt"
        ? record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : ""
        : "",

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex[0] ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={searchText}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(dataIndex);
    console.log(selectedKeys);

    confirm();
    setSearchText(selectedKeys[0]);

    setSearchedColumn(dataIndex);
    console.log();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Product Name",

      dataIndex: "title",
      ...getColumnSearchProps("title"),
      key: "title",
      fixed: "left",
      render: (text, record) => (
        <Link to={`/admin/product/${record.slug}`}>
          {record.title} <EditOutlined />
        </Link>
      ),
    },
    {
      title: "Product Category",
      dataIndex: ["category", "name"],
      ...getColumnSearchProps(["category"]),
      key: "category",
    },
    {
      title: "Shipping",
      dataIndex: "shipping",
      key: "shipping",
    },
    {
      title: "Indian price",
      dataIndex: ["price", "ind"],
      key: "price",
      sorter: (a, b) => a.price.ind - b.price.ind,
    },
    {
      title: "US price",
      dataIndex: ["price", "us"],
      key: "price",
    },
    {
      title: "sold",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "created date",
      dataIndex: "createdAt",
      ...getColumnSearchProps("createdAt"),
      key: "createdAt",

      render: (date) => new Date(date).toDateString(),
    },
    {
      title: "Sub Categories",
      key: "subCat",
      dataIndex: "subCat",
      render: (sub) => (
        <>
          {sub.map((tag) => {
            let color = tag.name.length > 13 ? "geekblue" : "green";
            if (tag.name === "Necklace") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag._id}>
                {tag.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Delete",
      key: "slug",
      fixed: "left",
      render: (record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => handleRemoveProduct(record)}
            className="text-danger"
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      className="table-res"
      columns={columns}
      dataSource={product}
      rowKey={(record) => record._id}
      pagination={{
        current: 11,
        pageSize: 10,
      }}
      scroll={{ x: 1300 }}
      onChange={handleTableChange}
    />
  );
};

export default AdminProductTable;
