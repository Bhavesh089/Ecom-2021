import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { CheckCircleFilled, ShoppingCartOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useDispatch } from "react-redux";

const AddToCART = ({ product }) => {
  const dispatch = useDispatch();
  const [isAddToCart, setisAddToCart] = useState(false);

  useEffect(() => {
    checkAdded();
  }, []);

  const checkAdded = () => {
    let cartItems = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cartItems = JSON.parse(localStorage.getItem("cart"));
        const found = cartItems.some((el) => el._id === product._id);
        if (found) {
          setisAddToCart(true);
        } else {
          setisAddToCart(false);
        }
      }
    }
  };
  //create add to cart
  const handleAddtoCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      console.log(typeof product._id);
      //if cart in the local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      console.log(cart, "cart-->");

      const found = cart.some((el) => el._id === product._id);
      if (!found) {
        console.log(found, "found");
        //push new product to cart
        cart.push({
          ...product,
          count: 1,
        });
      }
      //push new product to cart
      if (Object.values(cart).indexOf(product._id) > -1) {
        console.log("has product");
      }

      //remove duplicate
      let unique = _.uniqWith(cart, _.isEqual);
      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      // //show tool tip
      // setToolTip("Added");
      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

      checkAdded();
    }
  };

  return isAddToCart ? (
    <Button
      icon={<CheckCircleFilled className="text-success" />}
      type="primary"
    >
      Added in cart
    </Button>
  ) : (
    <Button
      icon={<ShoppingCartOutlined />}
      type="primary"
      onClick={handleAddtoCart}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCART;
