import React, { useEffect, useState } from "react";
import { Card, message, Popover, Button } from "antd";
import {
  MehFilled,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  CheckCircleFilled,
  WhatsAppOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import { Tabs } from "antd";
import _ from "lodash";
import { InfoCircleFilled, CarOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  getWishlist,
  removeWishlist,
} from "../../functions/user";
import soldOut from "../../assets/soldout/sold-2035.svg";

// import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const { Meta } = Card;
const SingleProduct = ({ product }) => {
  const { title, images, price, description } = product;
  const [isWishlist, setIsWishlist] = useState(false);
  const [isAddToCart, setisAddToCart] = useState(false);

  const dispatch = useDispatch();
  const { user, cart, wishlist } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   // const found = wishlist.some((el) => el._id === product._id);
  //   // if (found) {
  //   //   console.log(found, "found");
  //   //   //push new product to cart
  //   //   setIsWishlist(true);
  //   // }
  // }, []);

  useEffect(() => {
    checkAdded();
    loadWishlist();
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
      //if cart in the local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      const found = cart.some((el) => el._id === product._id);

      if (!found) {
        console.log(found, "found");

        //push new product to cart
        cart.push({
          ...product,
          count: 1,
        });
      }

      console.log("not found");

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

  // chatwithus
  const chatWithUsContent = () => {
    return (
      <>
        <a
          style={{ padding: "20px" }}
          href="https://wa.me/message/CDS2O34GWRG7H1"
        >
          <WhatsAppOutlined
            key="edit "
            className="product-icon text-success"
            style={{ fontSize: "20px" }}
          ></WhatsAppOutlined>

          {/* <b className="Headings">Whatsapp</b> */}
        </a>
        <a href="https://www.instagram.com/abeoz__/">
          <InstagramOutlined
            key="edit "
            className="product-icon text-danger"
            style={{ fontSize: "20px" }}
          ></InstagramOutlined>

          {/* <b className="Headings">Whatsapp</b> */}
        </a>
        {/* <a onClick={hide}>Close</a> */}
      </>
    );
  };

  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop autoFocus>
          {images && images.map((i) => <img src={i.Location} key={i.key} />)}
        </Carousel>

        <Tabs type="card">
          <TabPane
            tab={
              <span>
                <InfoCircleFilled />
                Description
              </span>
            }
            key="1"
          >
            {description && description}
          </TabPane>
          <TabPane
            tab={
              <span>
                <CarOutlined />
                Shipping & Delivery
              </span>
            }
            key="2"
          >
            Reviews
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5 pt-5">
        <h1 className="product-heading-class">{title}</h1>

        <Card
          actions={[
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
              <img src={soldOut} alt="sold-out!!" style={{ height: "5rem" }} />
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
          <ProductListItems product={product} />
        </Card>

        <hr />

        <Popover
          content={chatWithUsContent}
          title={<p style={{ fontStyle: "italic" }}>DM us, 24/7 Available.</p>}
          trigger="click"
          // visible={visible}
          // onVisibleChange={handleVisibleChange}
        >
          <Button type="primary" className="chat-us bg-warning ">
            <b>Chat with us?</b>
          </Button>
          <br />
          <small>For Instant Queries.</small>
        </Popover>
      </div>
    </>
  );
};

export default SingleProduct;
