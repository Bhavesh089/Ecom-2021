import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeWishlist } from "../../functions/user";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { Button } from "antd";
import AddToCART from "../../components/Cart/addToCart";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState();
  const { user, wishlist: wishlistState } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      console.log(res.data, "--->");

      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) => {
    console.log(productId, "--------->");
    removeWishlist(productId, user.token).then((res) => {
      wishlistState.map((wishProduct, i) => {
        if (wishProduct._id === productId) {
          wishlistState.splice(i, 1);
        }
      });
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: wishlistState,
      });

      loadWishlist();
    });
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
        YOUR WISHLIST
      </h4>

      {/* <div className="mb-3 p-5 card card-style">
          <div className="alert alert-secondary"> */}

      {/* {JSON.stringify(wishlist.mao)} */}

      {typeof wishlist !== "undefined" && !wishlist.length ? (
        <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
          No Products in your Wishlist click on
          <Link to="/shop"> Continue Shopping</Link>
        </h4>
      ) : (
        typeof wishlist !== "undefined" &&
        wishlist.map((p) => (
          // <Link to={`/product/${p.slug}`}>
          <div key={p._id}>
            <div className="row">
              <div className="col-md-4 col-4 offset-md-2">
                <br />

                <h4 className="display-4 Headings">{p.title}</h4>
                {p.images.length ? (
                  <ModalImage
                    small={p.images[0].Location}
                    large={p.images[0].Location}
                  />
                ) : (
                  p.title
                )}
              </div>
              <div className="col-md-4 col">
                <br />
                <div className="card card-style wishlist-card mt-2 p-2">
                  <h6 className="display-6 Headings">
                    {p.offerPrice ? (
                      <b>
                        {" "}
                        Price :{" "}
                        <s style={{ padding: "5px" }}>{p.price.ind}.00₹</s>{" "}
                        {p.offerPrice.ind}.00₹
                      </b>
                    ) : (
                      <b>Price : {p.price.ind} ₹</b>
                    )}
                    {/* <b>Price : {`${p.price.ind}`} </b> */}
                  </h6>

                  <br />
                  <div className="alert alert-secondary">
                    <b>
                      {p.quantity > 0 ? (
                        <>
                          <h2 className="Headings text-success">Instock</h2>

                          <AddToCART product={p} />
                        </>
                      ) : (
                        <h2 className="Headings text-danger">SOLD OUT !!!</h2>
                      )}
                    </b>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        handleRemove(p._id);
                      }}
                      className="bg-danger text-white"
                    >
                      Remove From Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>

          // <div className="col-md-3">
          // <br />
          // <h6 className="display-6 Headings">
          //   <b>Price : {`${p.price.ind}`}</b>
          // </h6>
          // </div>

          // <div className="col-md-3">
          // <br />
          // <h6 className="display-6 Headings bg-success text-white">
          //   <b>
          //     {p.quantity > 0 ? (
          //       "Instock"
          //     ) : (
          //       <img
          //         src={require("../../assets/soldout/9-2-sold-out-png-pic.png")}
          //         alt="SOlDOUT"
          //         style={{ width: "100%" }}
          //       />
          //     )}
          //   </b>
          // </h6>
          // </div>
          // <hr />
          // </Link>
        ))
      )}
    </div>
  );
};

export default Wishlist;
