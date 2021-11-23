import React, { useState, useEffect } from "react";
import { Divider, Input, Button, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoupons,
  createCoupons,
  deleteCoupons,
} from "../../../functions/coupon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import LocalSearch from "../../../components/Search/LocalSearch";
import { DeleteOutlined } from "@ant-design/icons";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [keyword, setKeyword] = React.useState("");

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };
  const { user } = useSelector((state) => ({ ...state }));

  //create coupon
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(name, expiry, discount);
      createCoupons({ name, expiry, discount }, user.token)
        .then((res) => {
          setLoading(false);
          setName("");
          setDiscount("");
          setExpiry("");
          loadAllCoupons();
          toast.success(`${res.data.name} new coupon has been added`);
        })
        .catch((err) => {
          console.log("create coupon err", err);
        });
    } catch (err) {
      if (err.response.status === 400) {
        setLoading(false);
        toast.error(err.response.data);
      }
    }
  };

  //delete coupon
  const deleteTag = async (_id) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer);
    // console.log(slug);

    if (window.confirm("Delete?")) {
      setLoading(true);
      deleteCoupons(_id, user.token)
        .then((res) => {
          setLoading(false);
          loadAllCoupons();
          toast.error(res.data.name);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(`${err.response.data} coupon deleted`);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 boder-bottom">
          <Divider orientation="left">
            <h4 className="create-title">Create Coupon </h4>
          </Divider>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <Input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <Input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={expiry}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
                placeholderText="Enter Expiry date"
              />
            </div>

            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
          </form>
        </div>

        <div className="col-md-6">
          <Divider orientation="left">
            <h4 className="create-title">Coupons</h4>
          </Divider>
          {/* search components */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.filter(searched(keyword)).map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => deleteTag(c._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
