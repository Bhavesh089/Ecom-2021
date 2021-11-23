import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getCategories,
  removeCategory,
  getCategory,
  updateCategory,
  createCategory,
} from "../../../functions/category";

import { Button, Spin, Tag, Divider, Modal } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/Search/LocalSearch";
import FileUploadCat from "../../../components/category/FileUploadCat";
import { removeFromS3 } from "../../../functions/s3";

const Category = () => {
  //to create categoryName
  const [name, setName] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  //cat images
  const [image, setImage] = useState([]);
  //update cat
  const [updateName, setUpdateName] = useState("");
  //used for update cat
  const [slugName, setSlugName] = useState("");
  //used when create cat
  const [loading, setLoading] = useState(false);
  //used when get cat
  const [categories, setCategories] = useState([]);
  //used for pop up
  const [visible, setVisible] = React.useState(false);
  //used for pop up
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  //keyword for filtering
  const [keyword, setKeyword] = React.useState("");

  //used for popup
  const [catImages, setCatImages] = useState([]);

  //spinner
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  //This function used for get list of categories
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getCategories().then((res) => {
      console.log(res.data.getListCategory);
      setCategories(res.data.getListCategory);
    });
  };
  //get usertoken
  const { user } = useSelector((state) => ({ ...state }));

  //create cat handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //send catname and token
    console.log(name);
    createCategory(user.token, name, image)
      .then((res) => {
        setLoading(false);
        setName("");
        setImage([]);
        loadCategories();
        toast.success(`${res.data.name} has been added as Category`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  //Delete Tag

  const deleteTag = async (slug, cat) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer);
    // console.log(slug);

    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(user.token, slug)
        .then((res) => {
          setLoading(false);
          loadCategories();
          toast.error(res.data);

          if (cat.image.length) {
            for (let i = 0; i < cat.image.length; i++) {
              let key = cat.image[i].key;
              //remove file from s3 as well
              removeFromS3(key, user.token)
                .then((resdata) => {
                  console.log("IMAGE Removed RES DATA", resdata);
                })
                .catch((err) => console.log(err));
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  //model

  const showModal = (catName, getSlugName, catImage) => {
    setCatImages(catImage);
    setUpdateName(catName);
    setSlugName(getSlugName);

    setVisible(true);
  };

  //update category
  const handleOk = async () => {
    setConfirmLoading(true);
    if (updateName === "") {
      setConfirmLoading(false);
      return toast.error("Category Name cannot be empty");
    }

    if (catImages === null) {
      setConfirmLoading(false);
      return toast.error("Category Images cannot be empty");
    }

    updateCategory(user.token, slugName, updateName, catImages)
      .then((res) => {
        setVisible(false);
        setUpdateName("");
        setSlugName("");
        setCatImages([]);
        setConfirmLoading(false);
        loadCategories();
        toast.success(`${res.data.name} successfully updated`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setConfirmLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  //to cancel the popup
  const handleCancel = () => {
    setVisible(false);
  };

  //searching
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  //Front end
  //create Cat form
  const categoryForm = () => (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ml-4">
          <FileUploadCat
            image={image}
            setImage={setImage}
            loading={loadingImage}
            setLoading={setLoadingImage}
          />
        </div>
        <div className="advancedSearchTextbox form-group addCategory">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter Category"
            required
          />

          {loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <Button
              onClick={handleSubmit}
              type="primary"
              shape="round"
              block
              className="add-button"
              size="large"
              icon={<PlusOutlined />}
              // disabled={!email || password.length < 6}
              ghost
            >
              ADD
            </Button>
          )}
        </div>
      </form>
    </>
  );

  //two columns and one row
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 boder-bottom">
          <Divider orientation="left">
            <h4 className="create-title">Create Category </h4>
          </Divider>

          {categoryForm()}
        </div>

        <div className="col-md-6">
          <Divider orientation="left">
            <h4 className="create-title">Categories</h4>
          </Divider>
          {/* search components */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {categories.filter(searched(keyword)).map((cat) => (
            <div className="categories" key={cat._id}>
              <Tag
                color="black"
                className="tags-class"
                closable
                onClose={() => deleteTag(cat.slug, cat)}
                onClick={() => showModal(cat.name, cat.slug, cat.image)}
              >
                {cat.name}
              </Tag>

              <Modal
                title="Update Category Name"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                className="modal-class"
              >
                <FileUploadCat
                  image={catImages}
                  setImage={setCatImages}
                  setLoading={setLoading}
                  loading={loading}
                />
                {JSON.stringify(catImages)}
                <input
                  type="text"
                  className="form-control"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  aria-describedby="emailHelp"
                  placeholder="Enter Category"
                />
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
