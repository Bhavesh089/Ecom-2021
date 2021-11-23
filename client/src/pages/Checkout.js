import React, { useState, useEffect } from "react";
import { Popconfirm, Button, Card, Radio, Alert, Input, message } from "antd";

import {
  getUserCart,
  emptyCart,
  saveUserShippingAddress,
  getUserShippingAddress,
  applyCoupon,
  selectedAddress,
} from "../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import Shipping from "../components/shipping/Shipping";
import { createPayment } from "../functions/payment";

const shippingState = {
  name: "",
  pincode: "",
  address: "",
  landmark: "",
  phoneNumber: "",
};
const Checkout = ({ history }) => {
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const { user, coupon: isCoupon } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [confirmShippingLoading, setConfirmShippingLoading] =
    React.useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleShipping, setVisibleShipping] = useState(false);

  const [shipping, setShipping] = useState(shippingState);
  const [shippingSaved, setShippingSaved] = useState(false);
  const [getShippingAddress, setGetShippingAddress] = useState([]);
  const [selectedAddressId, setselectedAddressId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountErr, setDiscountErr] = useState("");

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("cancelled");
    setVisible(false);
  };

  const handleOk = () => {
    setConfirmShippingLoading(true);
    saveUserShippingAddress(user.token, shipping).then((res) => {
      if (res.data.ok) {
        setselectedAddressId("");
        setShippingSaved(true);
        toast.success("Address saved");
        loadShippingAddress();
        setConfirmShippingLoading(false);
        setVisibleShipping(false);
      }
    });
  };

  const handleCancelShipping = () => {
    console.log("Clicked cancel button");
    setVisibleShipping(false);
  };

  const showModal = () => {
    setVisibleShipping(true);
  };

  //onchangeSelectedAddress
  const onChangeAddress = (e) => {
    console.log("radio checked", e.target.value);
    setselectedAddressId(e.target.value);
    selectedAddress(e.target.value, user.token)
      .then((res) => {
        console.log(res.data, "selected response");
      })
      .catch((err) => {
        console.log(err);
        setselectedAddressId("");
      });
  };

  useEffect(() => {
    loadShippingAddress();
  }, []);

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        console.log(res.data, "--------------------->");
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
        if (res.data.totalAfterDiscount) {
          setTotalAfterDiscount(res.data.totalAfterDiscount);
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        } else {
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
        }
      })
      .catch();
  }, []);

  //loadShippingAddress
  const loadShippingAddress = () => {
    getUserShippingAddress(user.token)
      .then((res) => {
        setGetShippingAddress(res.data.shipping);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emptyUserCart = () => {
    setConfirmLoading(true);
    //remove from local storage
    localStorage.removeItem("cart");
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    //remove from db
    emptyCart(user.token).then((res) => {
      setVisible(false);
      setConfirmLoading(false);
      setProducts([]);
      setTotalAfterDiscount(0);
      setCoupon("");
      setTotal(0);
      toast.success("Cart is empty. continue shopping ");
    });
  };

  const applyCouponFunction = () => {
    applyCoupon(coupon, user.token).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        //redux state

        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountErr(res.data.err);
        //update redux state
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      } else {
        message.success({
          content: "Hurray coupon successfully applied 🎉 ",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
        setCoupon("");
      }
    });
  };

  const showApplycoupon = () => (
    <>
      <Input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountErr("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <br />
      <Button type="primary" className="m-2" onClick={applyCouponFunction}>
        Apply
      </Button>
      <br />
    </>
  );

  //placeOrder
  const placeOrderHandler = () => {
    createPayment(user.token, isCoupon)
      .then((res) => {
        console.log(res.data);

        let information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: res.data,
        };

        post(information);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row m-5">
      <div className="col-md-6">
        <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
          Delivery Address
        </h4>
        <br />
        <h6 className="display-6 Headings">
          <b>SELECT YOUR ADDRESS</b>
        </h6>
        <br />
        {selectedAddressId == "" && getShippingAddress.length > 0 && (
          <Alert
            message="Please select an Address to place an order"
            type="warning"
            showIcon
          />
        )}
        {getShippingAddress.length ? (
          getShippingAddress.map((s) => (
            <>
              <Radio.Group
                key={s._id}
                onChange={onChangeAddress}
                value={selectedAddressId}
              >
                <Radio value={s}>
                  <div key={s._id} className="shipping-card">
                    <Card key={s._id} style={{ width: 300 }}>
                      <p>Name : {s.name}</p>
                      <p className="text-preline"> Address : {s.address}</p>
                      <p>Mobile : {s.phoneNumber}</p>
                      <p> pincode : {s.pincode}</p>
                      <p>landmark : {s.landmark}</p>
                    </Card>
                  </div>
                </Radio>
              </Radio.Group>
            </>
          ))
        ) : (
          <Alert
            message="Please Add an Address to place order"
            type="warning"
            showIcon
          />
        )}
        <br />
        <Shipping
          shipping={shipping}
          setShipping={setShipping}
          handleOk={handleOk}
          handleCancelShipping={handleCancelShipping}
          showModal={showModal}
          visibleShipping={visibleShipping}
          confirmShippingLoading={confirmShippingLoading}
        />
        <hr />
        <h6 className="display-6 Headings">
          <b>ANY COUPON?</b>
        </h6>
        <br />
        {discountErr && <Alert message={discountErr} type="error" showIcon />}

        {showApplycoupon()}
        <br />
      </div>
      <br />
      <div className="col-md-6">
        <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
          Order Summary
        </h4>
        <hr />
        <h6>Products X {products.length}</h6>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            {/* <h4>{JSON.stringify(p.offerPrice)}</h4> */}

            {p.offerPrice ? (
              <>
                <p>
                  {p.product.title} ({p.color}) x {p.count} = {"  "} ₹
                  {p.offerPrice.ind * p.count}
                </p>
                <Alert
                  message={`Saved : ${
                    p.product.price.ind - p.offerPrice.ind
                  }.00₹ on ${p.product.title}`}
                  type="success"
                  showIcon
                />
              </>
            ) : (
              <p>
                {p.product.title} ({p.color}) x {p.count} = {"  "} ₹
                {p.price.ind * p.count}
              </p>
            )}
          </div>
        ))}
        <div className="dotted-line">
          <hr />
        </div>

        <p>Cart Total : ₹{total}</p>
        {totalAfterDiscount > 0 && (
          <>
            <Alert
              message={`Discount Applied  Total Payable : ₹ ${totalAfterDiscount}`}
              type="success"
              showIcon
            />
          </>
        )}
        <div className="dotted-line">
          <hr />
        </div>
        <div className="row">
          <div className="col-md-6">
            <Button
              disabled={selectedAddressId === "" || !products.length}
              type="primary"
              onClick={() => {
                placeOrderHandler();
              }}
            >
              Place Order
            </Button>
          </div>
          <div className="col-md-6">
            <div>
              <Popconfirm
                className="my-pop-over"
                title="Empty Cart?"
                visible={visible}
                onConfirm={emptyUserCart}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
              >
                <Button
                  disabled={!products.length}
                  onClick={showPopconfirm}
                  className="bg-warning text-white mt-2"
                >
                  Empty Cart
                </Button>
              </Popconfirm>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
