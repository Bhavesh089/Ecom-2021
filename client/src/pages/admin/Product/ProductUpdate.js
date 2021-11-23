import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { getProduct, updateProduct } from "../../../functions/product";
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

const ProductUpdate = ({ match, history }) => {
  //set current product values
  const [values, setValues] = useState(intialState);
  //set subcat
  const [subOptions, setSubOptions] = useState([]);
  //set loading
  const [loading, setLoading] = useState(false);
  //set list of categories
  const [categories, setCategories] = useState([]);
  //array subs for sub cats
  const [arrayofSubs, setArrayofSubs] = useState([]);
  //selected cat
  const [SelectedCategory, setSelectedCategory] = useState("");

  //user token
  const { user } = useSelector((state) => ({ ...state }));

  //slug from params
  const { slug } = match.params;
  //update product
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subCat = arrayofSubs;
    values.category = SelectedCategory ? SelectedCategory : values.category;

    updateProduct(user.token, slug, values)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/getproducts");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data.err);
        }
      });
  };

  //This function used for get list of categories and get particular product
  useEffect(() => {
    loadCategories();
    loadGetProduct();
    console.log(values);
  }, []);

  //get categories
  const loadCategories = () => {
    getCategories().then((res) => {
      console.log(res.data.getListCategory);
      setCategories(res.data.getListCategory);
      // console.log({  res.data.getListCategory});
    });
  };

  //get specific prodeuct
  const loadGetProduct = () => {
    getProduct(slug).then((res) => {
      console.log(res.data.category.name);
      //save in the state from response
      setValues({ ...values, ...res.data });
      // console.log({  res.data.getListCategory});
      //get product subcategories
      getCategorySubs(res.data.category._id).then((res) => {
        console.log("Optionsssss--->", res.data);
        setSubOptions(res.data);
      });
      //create array of sub id
      let arr = [];
      res.data.subCat.map((s) => {
        arr.push(s._id);
      });
      setArrayofSubs(arr);
    });
  };

  //categories handle change
  const categoriesHandleChange = (value) => {
    console.log("clicked categories id", value);

    //if catgories changed set sub cat as empty
    setValues({ ...values, subCat: [] });
    console.log(values);
    //selected category
    setSelectedCategory(value);

    //get selected category sub cats
    getCategorySubs(value)
      .then((res) => {
        console.log("Optionsssss--->", res.data);
        setSubOptions(res.data);

        //if same category then load previous product
        if (values.category._id === value) {
          loadGetProduct();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setArrayofSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 boder-bottom">
          <Divider orientation="left">
            <h4 className="create-title">Update Product</h4>
          </Divider>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            loading={loading}
          />
          <ProductUpdateForm
            values={values}
            handleSubmit={handleSubmit}
            setValues={setValues}
            categories={categories}
            setCategories={setCategories}
            categoriesHandleChange={categoriesHandleChange}
            subOptions={subOptions}
            arrayofSubs={arrayofSubs}
            setArrayofSubs={setArrayofSubs}
            SelectedCategory={SelectedCategory}
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

export default ProductUpdate;
