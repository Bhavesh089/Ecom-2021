import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { DownOutlined, SyncOutlined } from "@ant-design/icons";
import { getsubofCat } from "../../functions/subcat";
import { Menu, Dropdown } from "antd";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [subCategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(res.data, "this category data id");
      setLoading(false);
      setCategory(res.data.category);
      setProducts(res.data.products);
      loadAllSubCategories(res.data.category._id);
    });
  }, []);

  // load all subcategories
  const loadAllSubCategories = (id) => {
    getsubofCat(id).then((res) => {
      setSubCategory(res.data);
      console.log(res.data, "this subcategories data of a category ");
    });
  };

  const listOfSubCat = (
    <Menu>
      {subCategory.map((s) => (
        <Menu.Item key={s._id}>
          <Link to={`/subCat/${s.slug}`} className="text-center drop-down-shop">
            {s.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // const listOfSubCat = (
  //   <Menu>
  //     {categories.map((c) => (
  //       <Menu.Item key={c._id}>
  //         <Link
  //           to={`/category/${c.slug}`}
  //           className="text-center drop-down-shop"
  //         >
  //           {c.name}
  //         </Link>
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

  return (
    <>
      <div className="container-fluid ">
        {loading ? (
          <SyncOutlined spin className="ml-4 mb-3" />
        ) : (
          <Dropdown overlay={listOfSubCat} trigger={["click"]}>
            <h4 className="text-center shop-cat-filter m-2 p-2">
              Styles of {category.name}
              <DownOutlined className="m-2" />
            </h4>
          </Dropdown>
        )}
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            {loading ? (
              <SyncOutlined spin className="ml-4 mb-3" />
            ) : (
              <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
                {category.name}
              </h4>
            )}
          </div>
        </div>
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 col-6" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryHome;
