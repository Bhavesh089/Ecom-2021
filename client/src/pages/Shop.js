import React, { useEffect } from "react";

import { fetchProductByFilter, getProductsByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { useState } from "react";
import { DownOutlined, SyncOutlined } from "@ant-design/icons";
import { getCategories } from "../functions/category";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
const Shop = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  let { search } = useSelector((state) => ({ ...state }));
  let { text } = search;
  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
  }, []);

  // load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //load all categories
  const loadAllCategories = () => {
    getCategories().then((res) => setCategories(res.data.getListCategory));
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (text === "") {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const listOfCat = (
    <Menu>
      {categories.map((c) => (
        <Menu.Item key={c._id}>
          <Link
            to={`/category/${c.slug}`}
            className="text-center drop-down-shop"
          >
            {c.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  // <Menu>
  //   <Menu.Item key="0">
  //     <a href="https://www.antgroup.com">1st menu item</a>
  //   </Menu.Item>
  //   <Menu.Item key="1">
  //     <a href="https://www.aliyun.com">2nd menu item</a>
  //   </Menu.Item>
  //   <Menu.Divider />
  //   <Menu.Item key="3">3rd menu item</Menu.Item>
  // </Menu>
  return (
    <>
      <div className="container-fluid ">
        <Dropdown overlay={listOfCat} trigger={["click"]}>
          <h4 className="text-center shop-cat-filter m-2 p-2">
            Shop by Categories
            <DownOutlined className="m-2" />
          </h4>
        </Dropdown>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col">
            {product.length < 1 ? (
              <h4 className="text-center p-3 mt-5 display-4 Headings">
                No products Found
              </h4>
            ) : (
              <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
                Products
              </h4>
            )}
          </div>
        </div>
        {loading ? (
          <SyncOutlined spin className="ml-4 mb-3" />
        ) : (
          <>
            <div className="row">
              {product.map((p) => (
                <div className="col-md-4 col-6" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Shop;
