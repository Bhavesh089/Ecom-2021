import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Alert } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import ShowCartItems from "../components/Cart/showCartItems";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((curr, next) => {
      if (next.offerPrice) {
        return curr + next.count * next.offerPrice.ind;
      } else {
        return curr + next.count * next.price.ind;
      }
    }, 0);
  };
  const saveOrderToDb = () => {
    alert("save order to db");

    console.log(cart, "------------<");
    userCart(cart, user.token)
      .then((res) => {
        history.push("/checkout");
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  //show added carts items
  const showCartItems = () => cart.map((c) => <ShowCartItems c={c} />);

  return (
    <>
      <div className="container-fluid pt-2">
        <div className="row ">
          <div className="col-md-8 ">
            {!cart.length ? (
              <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
                No Products in cart click on
                <Link to="/shop"> Continue Shopping</Link>
              </h4>
            ) : (
              <>
                <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
                  Your Cart Items
                </h4>
                {showCartItems()}
              </>
            )}
          </div>
          <div className="col-md-4 ">
            <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
              Order Summary
            </h4>
            <hr />
            <h5 className="display-4 Headings">Products X {cart.length}</h5>
            {cart.map((c, i) => (
              <div key={i}>
                {c.offerPrice ? (
                  <>
                    <p>
                      {c.title} x {c.count} = ₹{c.offerPrice.ind * c.count}
                    </p>
                    <Alert
                      message={`Saved : ${
                        c.price.ind - c.offerPrice.ind
                      }.00₹ on ${c.title}`}
                      type="success"
                      showIcon
                    />
                  </>
                ) : (
                  <p>
                    {c.title} x {c.count} = ₹{c.price.ind * c.count}
                  </p>
                )}
              </div>
            ))}
            <div className="dotted-line">
              <hr />
            </div>
            Total: <b>₹{getTotal()}</b>
            <div className="dotted-line">
              <hr />
            </div>
            {user ? (
              <div className="mb-4">
                <Button
                  onClick={saveOrderToDb}
                  type="primary"
                  disabled={!cart.length}
                >
                  Checkout
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <Link
                    to={{
                      pathname: "/login",
                      state: { from: "cart" },
                    }}
                  >
                    <Button type="primary" icon={<LoginOutlined />}>
                      Login
                    </Button>
                  </Link>
                  <div>
                    <small>Login to checkout</small>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
