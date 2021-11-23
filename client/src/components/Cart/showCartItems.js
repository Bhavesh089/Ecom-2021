import React from "react";
import { Button, InputNumber } from "antd";
import ModalImage from "react-modal-image";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const ShowCartItems = ({ c }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    let cart = [];
    if (typeof window != "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      //[1,2,3, 4]
      cart.map((product, i) => {
        if (product._id === c._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (value) => {
    let count = value < 1 ? 1 : value;
    if (count > c.quantity) {
      toast.error(`Max available quantity: ${c.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window != "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == c._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <>
      <div class="list-group list-group-flush">
        <div className="list-group-item">
          <div className="row ">
            <h4 className="display-4 Headings">{c.title}</h4>
            <div className="col-md-4 col-6">
              {c.images.length ? (
                <ModalImage
                  small={c.images[0].Location}
                  large={c.images[0].Location}
                />
              ) : (
                c.title
              )}
            </div>
            <div className="col-md-4 col">
              <div className="card card-style mt-3 p-4">
                <h6 className="display-6 Headings">
                  {" "}
                  <b>Color : {c.color}</b>
                </h6>
                <br />
                <h6 className="display-6 Headings">
                  {" "}
                  {c.offerPrice ? (
                    <b>
                      {" "}
                      Price :{" "}
                      <s style={{ padding: "5px" }}>{c.price.ind}.00₹</s>{" "}
                      {c.offerPrice.ind}.00₹
                    </b>
                  ) : (
                    <b>Price : ₹{c.price.ind}</b>
                  )}
                </h6>
                <br />
                <h6 className="display-6 Headings">
                  {c.quantity > 0 ? (
                    <b>
                      Quantity :
                      {
                        <InputNumber
                          type="number"
                          className="form-control"
                          value={c.count}
                          onChange={handleQuantityChange}
                        />
                      }
                    </b>
                  ) : (
                    <h2 className="Headings text-danger">SOLD OUT !!!</h2>
                  )}
                </h6>
                <br />
                <div className="pt-2">
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={handleRemove}
                    className="bg-danger text-white"
                  >
                    Delete
                  </Button>
                  {/* <DeleteOutlined onClick={handleRemove} className="text-danger" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default ShowCartItems;
