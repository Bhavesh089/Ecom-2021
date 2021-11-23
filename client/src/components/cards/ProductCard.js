import React, { useEffect, useState } from "react";
import { Card, message, Alert } from "antd";

import TextLoop from "react-text-loop";

import {
  MehFilled,
  HeartFilled,
  HeartOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import {
  addToWishlist,
  getWishlist,
  removeWishlist,
} from "../../functions/user";
import { useHistory } from "react-router";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import soldOut from "../../assets/soldout/sold-2035.svg";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isWishlist, setIsWishlist] = useState(false);
  const [isAddToCart, setisAddToCart] = useState(false);

  const [toolTip, setToolTip] = useState("Click to add");
  const { user, cart, wishlist } = useSelector((state) => ({ ...state }));

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
    checkAdded();
    let cart = [];
    if (typeof window !== "undefined") {
      //if cart in the local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      const found = cart.some((el) => el._id === product._id);
      if (!found) {
        console.log(found, "found");
        //push new product to cart
        cart.push({
          ...product,
          count: 1,
        });
      }
      //remove duplicate
      let unique = _.uniqWith(cart, _.isEqual);
      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      //show tool tip
      setToolTip("Added");
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

  useEffect(() => {
    loadWishlist();
    checkAdded();
  }, [user, product]);

  const loadWishlist = () => {
    console.log(user);
    if (user && typeof product._id !== "undefined") {
      getWishlist(user.token).then((res) => {
        console.log(res.data, "wishList--->");

        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: res.data.wishlist,
        });

        console.log(product._id);
        console.log(wishlist, "wishlist ------------->");

        const found = res.data.wishlist.some((el) => el._id === product._id);

        console.log(found, "---->");
        if (found) {
          console.log(found, "found");
          //push new product to cart
          setIsWishlist(true);
        }
      });
    }
  };

  const handleRemoveWishlist = () => {
    removeWishlist(product._id, user.token).then((res) => {
      wishlist.map((wishProduct, i) => {
        if (wishProduct._id === product._id) {
          wishlist.splice(i, 1);
        }
      });
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: wishlist,
      });

      setIsWishlist(false);

      message.error({
        icon: <MehFilled />,
        content: "Removed from your Wishlist",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });

      // loadWishlist();
    });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("Added to wishlist", res.data);
      message.success({
        icon: <HeartFilled />,
        content: "Added to your Wishlist",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      loadWishlist();

      // history.push("/user/wishlist");
    });
  };

  const signInMessage = () => {
    message.success({
      icon: <HeartFilled />,
      content: "please Login to see in your wishlist",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  const cardRedirect = () => {
    return history.push(`/product/${product.slug}`);
  };

  const offerPrice = () => {
    let dicountPercent =
      (product.price.ind - product.offerPrice.ind) / product.price.ind;

    dicountPercent = dicountPercent * 100;
    return (
      <>
        <p style={{ margin: "0px" }}>
          <s>{product.price.ind}.00₹</s> {product.offerPrice.ind}.00₹
        </p>

        {/* <p>
          {" "}
          <s style={{ padding: "5px" }}>{product.price.ind}.00₹</s>
          <div class="circle-badge float-right">
            <span class="circle__content">{dicountPercent}%</span>
          </div>
        </p> */}
      </>
    );
  };

  const offerPriceBadge = () => {
    let dicountPercent =
      (product.price.ind - product.offerPrice.ind) / product.price.ind;

    dicountPercent = dicountPercent * 100;
    return (
      <>
        <div class="circle-badge float-right">
          <span class="circle__content">{dicountPercent}%</span>
        </div>
      </>
    );
  };

  return (
    <>
      {/* {product.title}   */}
      <Card
        hoverable
        className="p-1 card"
        cover={
          <>
            {product.offerPrice && offerPriceBadge()}
            <img
              onClick={cardRedirect}
              alt={product.title}
              src={
                product.images[0] == null ? "" : product.images[0]["Location"]
              }
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                overflow: "hidden",
              }}
            />
          </>
        }
        actions={[
          <Link to={`/product/${product.slug}`}>
            <EyeOutlined className="product-icon" />
          </Link>,
          product.quantity > 0 ? (
            isAddToCart ? (
              <a>
                <CheckCircleFilled
                  key="edit "
                  className="product-icon text-success"
                ></CheckCircleFilled>

                <b className="Headings">Added</b>
              </a>
            ) : (
              <a onClick={handleAddtoCart}>
                <ShoppingCartOutlined
                  key="edit "
                  className="product-icon"
                ></ShoppingCartOutlined>

                <b className="Headings">Add to Cart</b>
              </a>
            )
          ) : (
            <img src={soldOut} alt="sold-out!!" style={{ height: "40px" }} />
          ),
          user ? (
            isWishlist ? (
              <HeartFilled onClick={handleRemoveWishlist} />
            ) : (
              <a onClick={handleAddToWishlist}>
                <HeartOutlined key="edit " className="product-icon" />
              </a>
            )
          ) : (
            <a onClick={signInMessage}>
              <HeartOutlined key="edit " className="product-icon" />
            </a>
          ),
        ]}
      >
        {/* <Meta title={product.title} description={`${product.price.ind}.00₹`} /> */}
        <Meta
          title={product.title}
          description={
            product.offerPrice ? offerPrice() : `${product.price.ind}.00₹`
          }
        />
      </Card>

      <Alert
        banner
        message={
          <TextLoop mask>
            {product.offerPrice && (
              <div style={{ fontSize: "10px" }}>offer expires soon!!!</div>
            )}
            {product.quantity < 10 && product.quantity > 0 && (
              <div className="text-danger" style={{ fontSize: "10px" }}>
                Only {product.quantity} left hurry up!!
              </div>
            )}
            <div className="text-info" style={{ fontSize: "10px" }}>
              Any Query? DM us.W
            </div>
            {product.quantity == 0 && (
              <div className="text-danger" style={{ fontSize: "10px" }}>
                DM us for restock
              </div>
            )}
          </TextLoop>
        }
      />
    </>
  );
};

export default ProductCard;
