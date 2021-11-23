import React, { useEffect, useState } from "react";
import { getOrderById, updateOrderById } from "../functions/order";
import { Result, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../functions/user";

const PaymentStatus = ({ match, history }) => {
  const [orderStatus, setOrderStatus] = useState(false);

  const { orderId } = match.params;

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(orderId, "Route------>");
    console.log(user, "Route------>");

    if (user) {
      getOrderById(orderId, user.token)
        .then((res) => {
          console.log(res.data);
          if (res.data.PaymentDetails) {
            updateOrderById(orderId, user.token).then((res) => {
              console.log("updated", res.data);
            });

            if (res.data.PaymentDetails.STATUS === "TXN_SUCCESS") {
              setOrderStatus(true);
              if (typeof window !== "undefined")
                localStorage.removeItem("cart");

              dispatch({
                type: "ADD_TO_CART",
                payload: [],
              });

              dispatch({
                type: "COUPON_APPLIED",
                payload: false,
              });

              emptyCart(user.token)
                .then((res) => console.log(res))
                .catch((err) => err);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [orderId]);

  return orderStatus ? (
    <Result
      status="success"
      title="Thank you for shopping with ABEOZ"
      subTitle={`Your OrderId ${orderId} `}
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => history.push("/user/orderhistory")}
        >
          Go to Order History
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  ) : (
    <Result
      status="error"
      title="Couldn't processed your order, Please try again later"
      subTitle={`Your OrderId ${orderId} `}
      extra={[
        <Button type="primary" key="console" onClick="/user/orderhistory">
          Go to Orderhistory
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  );
};

export default PaymentStatus;
