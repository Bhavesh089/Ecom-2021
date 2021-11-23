import React from "react";

import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imageStyle = {
    width: "100%",
    height: "80px",
    objectFit: "cover",
  };
  return (
    <Drawer
      className="text-center"
      title={`YOUR CART HAS ${cart.length} PRODUCTS`}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div className="row" key={p._id}>
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].Location} style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <div>{p.title}</div>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() => dispatch({ type: "SET_VISIBLE", payload: false })}
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
