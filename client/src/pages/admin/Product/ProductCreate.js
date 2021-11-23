import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import ProductCreateForm from "../../../components/forms/ProductCreateForm";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";

import { Divider } from "antd";

const intialState = {
  title: "",
  description: "",
  price: {
    ind: "",
    us: "",
  },
  offerPrice: {
    ind: "",
  },

  categories: [],
  category: "",
  subCat: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Silver"],
  brands: ["Abeoz"],
  color: "",
  brand: "",
};

const ProductCreate = ({ history }) => {
  //store all the product details in values
  const [values, setValues] = useState(intialState);
  //sub cat options
  const [subOptions, setSubOptions] = useState([]);
  //show sub categories
  const [showSubs, setShowSubs] = useState(false);
  //loading
  const [loading, setLoading] = useState(false);
  //get user from state
  const { user } = useSelector((state) => ({ ...state }));
  //create product
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        window.alert(`${res.data.title} is created`);
        history.push(`/admin/getproducts`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data.err);
        }
      });
  };

  //This function used for get list of categories
  useEffect(() => {
    loadCategories();
    console.log(values);
  }, []);

  //get categories
  const loadCategories = () => {
    getCategories().then((res) => {
      console.log(res.data.getListCategory);
      setValues({ ...values, categories: res.data.getListCategory });
      // console.log({  res.data.getListCategory});
    });
  };

  //get the subcategories of that category with ID
  const categoriesHandleChange = (value) => {
    console.log("clicked categories id", value);
    console.log(values);
    //if select other category empty the subcat
    setValues({ ...values, subCat: [], category: value });
    //and get sub categories
    getCategorySubs(value)
      .then((res) => {
        console.log("Optionsssss--->", res.data);
        setSubOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowSubs(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 boder-bottom">
          <Divider orientation="left">
            <h4 className="create-title">Create Product</h4>
          </Divider>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            loading={loading}
          />
          <ProductCreateForm
            values={values}
            handleSubmit={handleSubmit}
            setValues={setValues}
            categoriesHandleChange={categoriesHandleChange}
            subOptions={subOptions}
            showSubs={showSubs}
          />
        </div>

        {/* <div className="col-md-6">
          <Divider orientation="left">
            <h4 className="create-title">Categories</h4>
          </Divider>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCreate;
