import React, { useEffect, useState } from "react";
import { getOrders } from "../../functions/order";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserOrderTable from "../../components/table/UserOrderHistory";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data));
      setOrders(res.data);
    });
  };

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="mb-3 p-5 card card-style">
        <h6 className="display-6 Headings">
          <b>Order Status : </b>
          <span
            className={`badge ${
              order.orderStatus === "Completed"
                ? `bg-success`
                : order.orderStatus === "Cancelled"
                ? `bg-danger`
                : order.orderStatus === "Dispatched"
                ? `bg-primary`
                : order.orderStatus === "Processing"
                ? `bg-info`
                : `bg-info`
            } text-white`}
          >
            {order.orderStatus}
          </span>
        </h6>
        <h6>
          <b className="display-6 Headings">Order Id : </b>
          <span>{order._id}</span>
        </h6>
        <br />
        <h6 className="display-6 Headings">
          Products X {order.products.length}
        </h6>
        <hr />
        {order.products.map((p, i) => (
          <div key={i}>
            {p.product.offerPrice ? (
              <>
                {p.product.title} ({p.color}) x {p.count} = ₹
                {p.product.offerPrice.ind * p.count}
              </>
            ) : (
              <p>
                {p.product.title} ({p.color}) x {p.count} = ₹
                {p.product.price.ind * p.count}
              </p>
            )}
          </div>
        ))}
        <hr />
        <h6>Payment Info</h6>
        <UserOrderTable order={[order]} />
        <div className="row">
          <div className="col">
            <p>PDF download</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {!orders.length ? (
            <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
              There is no Purchase Order
              <Link to="/shop"> Continue Shopping</Link>
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
              Your Purchase Order History
            </h4>
          )}

          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
