import React, { useState } from "react";
import cartImg from "../../assets/img/shopping-cart-2028.svg";
import home from "../../assets/img/home-191.svg";
import heart from "../../assets/img/heart-2933.svg";
import shop from "../../assets/img/shopping-bag-2038.svg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";

const Phone = () => {
  const history = useHistory();
  let { user, cart, wishlist } = useSelector((state) => ({ ...state }));

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  const handleFunction = (e) => {
    console.log(history, "------------>");

    if (typeof e.target.value !== undefined) {
      // console.log(e.target.value, "----->");
      history.push(e.target.value);
    }
  };

  return (
    // <div class="wrapper">
    <div class="phone">
      <nav class="nav-menu">
        <Link to="/" class="nav-btn" onClick={handleClick}>
          <img
            src={require("../../assets/logos/abeoz.jpg")}
            alt=""
            width="36px"
            style={{ borderRadius: "12px 1px", background: "black" }}
          />
        </Link>

        <Link to="/cart" class="nav-btn" onClick={handleClick}>
          <Badge
            count={cart.length}
            style={{ marginLeft: -17 }}
            className="my-badge"
          ></Badge>
          <img src={cartImg} alt="" width="40px" />
        </Link>

        <Link to="/user/wishlist" class="nav-btn" onClick={handleClick}>
          <Badge count={wishlist.length} className="my-badge">
            {" "}
          </Badge>
          <img src={heart} alt="" width="40px" />
        </Link>

        <Link to="/shop" class="nav-btn" onClick={handleClick}>
          <img src={shop} alt="" width="40px" />
        </Link>
      </nav>
    </div>
  );
};

export default Phone;
