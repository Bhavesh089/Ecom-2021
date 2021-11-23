import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getCategories } from "../../../functions/category";

import {
  getsubCat,
  removesubCat,
  getsubCats,
  updatesubCat,
  createsubCat,
} from "../../../functions/subcat";

import { Button, Spin, Tag, Divider, Modal, Select } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/Search/LocalSearch";

const SubCategory = () => {
  //to create categoryName
  const [name, setName] = useState("");
  //select category used in options
  const [category, setCategory] = useState("");

  //update cat
  const [updateName, setUpdateName] = useState("");
  //used for update cat
  const [slugName, setSlugName] = useState("");
  //used when create cat
  const [loading, setLoading] = useState(false);
  //used when get cat
  const [categories, setCategories] = useState([]);
  //get subs
  const [subs, setSubs] = useState([]);
  //used for pop up
  const [visible, setVisible] = React.useState(false);
  //used of subcat select in model
  const [parentId, setParentId] = useState("");
  //used for pop up
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  //keyword for filtering
  const [keyword, setKeyword] = React.useState("");

  //spinner
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  //This function used for get list of categories
  useEffect(() => {
    loadCategories();
    loadsubsCats();
  }, []);
  //load categories
  const loadCategories = () => {
    getCategories().then((res) => {
      console.log(res.data.getListCategory);
      setCategories(res.data.getListCategory);
    });
  };

  const loadsubsCats = () => {
    getsubCats().then((res) => {
      console.log(res.data.getListsubCat);
      setSubs(res.data.getListsubCat);
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
    createsubCat(user.token, name, category)
      .then((res) => {
        setLoading(false);
        setName("");
        // setCategory("");
        loadsubsCats();
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

  const deleteTag = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer);
    // console.log(slug);

    if (window.confirm("Delete?")) {
      setLoading(true);
      removesubCat(user.token, slug)
        .then((res) => {
          setLoading(false);
          loadsubsCats();
          loadCategories();
          toast.error(res.data);
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

  const showModal = (catName, getSlugName, parent) => {
    // console.log(catName);
    setUpdateName(catName);
    setSlugName(getSlugName);
    setParentId(parent);

    setVisible(true);
  };

  //update category
  const handleOk = async () => {
    setConfirmLoading(true);
    if (updateName === "") {
      setConfirmLoading(false);
      return toast.error("Category Name cannot be empty");
    }
    updatesubCat(user.token, slugName, updateName, parentId)
      .then((res) => {
        setVisible(false);
        setUpdateName("");
        setSlugName("");
        setConfirmLoading(false);
        loadCategories();
        loadsubsCats();
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
  const subCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="advancedSearchTextbox form-group addCategory">
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="emailHelp"
          placeholder="Enter Sub Category"
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
  );

  //two columns and one row
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 boder-bottom">
          <Divider orientation="left">
            <h4 className="create-title">Create Sub Category </h4>
          </Divider>
          <Select
            name="category"
            className="addCategory"
            placeholder="Choose Category.."
            onChange={(value) => setCategory(value)}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </Select>

          {subCategoryForm()}
        </div>

        <div className="col-md-6">
          <Divider orientation="left">
            <h4 className="create-title">Sub Categories</h4>
          </Divider>
          {/* search components */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs.filter(searched(keyword)).map((s) => (
            <div className="categories" key={s._id}>
              <Tag
                color="black"
                className="tags-class"
                closable
                onClose={() => deleteTag(s.slug)}
                onClick={() => showModal(s.name, s.slug, s.parent)}
              >
                {s.name}
              </Tag>
              {/* //popup */}
              <Modal
                title="Update Category Name"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                className="modal-class"
              >
                <select
                  name="category"
                  className="addoptionsCategory"
                  placeholder="Choose Category.."
                  onChange={(e) => setParentId(e.target.value)}
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option
                        key={c._id}
                        value={c._id}
                        selected={c._id === parentId}
                      >
                        {c.name}
                      </option>
                    ))}
                </select>

                <input
                  type="text"
                  className="form-control"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  aria-describedby="emailHelp"
                  placeholder="update Sub Category"
                />
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
