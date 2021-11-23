//react
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//antdesign
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  HeartFilled,
  ShoppingOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

//firebase
import { auth } from "../../firebase";

//redux
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const LeftMenu = ({ mode, rightMenu }) => {
  //dispatch the type and payload
  const dispatch = useDispatch();
  //get payload from state

  let { user, cart, wishlist } = useSelector((state) => ({ ...state }));

  const history = useHistory();
  const [current, setCurrent] = useState("home");

  useEffect(() => {});

  //logout
  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode={mode}>
      <Item key="home " className="display-non" icon={<HomeOutlined />}>
        <Link to="/" className="left">
          Home
        </Link>
      </Item>

      <Item key="shop" className="display-non" icon={<ShoppingOutlined />}>
        <Link to="/shop" className="left">
          Shop
        </Link>
      </Item>

      <Item
        className="display-non"
        key="cart"
        icon={
          <Badge count={cart.length} offset={[-8, 0]}>
            <ShoppingCartOutlined />
          </Badge>
        }
      >
        <Link to="/cart" className="left display-non">
          Cart
        </Link>
      </Item>

      <SubMenu icon={<CommentOutlined />} title={"DM?"}>
        <Item className="left">
          <a href="https://wa.me/message/CDS2O34GWRG7H1">
            <WhatsAppOutlined
              key="edit "
              className="product-icon text-success"
              style={{ fontSize: "20px" }}
            ></WhatsAppOutlined>
            Whatsapp
            {/* <b className="Headings">Whatsapp</b> */}
          </a>
        </Item>

        <Item className="left">
          <a href="https://www.instagram.com/abeoz__/">
            <InstagramOutlined
              key="edit "
              className="product-icon text-danger"
              style={{ fontSize: "20px" }}
            ></InstagramOutlined>
            Instagram
            {/* <b className="Headings">Whatsapp</b> */}
          </a>
        </Item>
      </SubMenu>

      {user && (
        <SubMenu
          icon={<UserOutlined />}
          title={<span>{user.name && user.name.split("@")[0]}</span>}
          className={rightMenu}
        >
          {/* for subscriber */}
          {user && user.role == "Subscriber" && (
            <Item className="left">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {/* for admin */}
          {user && user.role == "admin" && (
            <Item className="left">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          {user && user.role == "admin" && (
            <Item className="left">
              <Link to="/admin/coupon">Coupon</Link>
            </Item>
          )}

          {/* for admin */}
          {user && user.role == "admin" && (
            <Item className="left">
              <Link to="/admin/category">Categories</Link>
            </Item>
          )}

          {/* for admin */}
          {user && user.role == "admin" && (
            <Item className="left">
              <Link to="/admin/subcategory">Sub Categories</Link>
            </Item>
          )}

          {/* for admin */}
          {user && user.role == "admin" && (
            <Item className="left">
              <Link to="/admin/product">Create Product</Link>
            </Item>
          )}

          {/* for admin */}
          {user && user.role == "admin" && (
            <Item className="left">
              <Link to="/admin/getproducts">Products</Link>
            </Item>
          )}

          {/* <Item key="setting:2" className="left">
            Option 2
          </Item> */}
          <Item icon={<LogoutOutlined />} onClick={logout} className="left">
            Logout
          </Item>
        </SubMenu>
      )}

      {user && (
        <Item
          key="whishlist"
          className={`${rightMenu} display-non`}
          icon={
            <Badge count={wishlist.length} offset={[-17, 0]}>
              <HeartFilled style={{ fontSize: "23px", marginRight: "-12px" }} />
            </Badge>
          }
        >
          <Link to="/user/wishlist" className="whishlish-icon left">
            Wishlist
          </Link>
        </Item>
      )}

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className={rightMenu}>
          <Link to="/register" className="left">
            Register
          </Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className={rightMenu}>
          <Link to="/login" className="left">
            Login
          </Link>
        </Item>
      )}
    </Menu>
  );
};

export default LeftMenu;
