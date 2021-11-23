import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingCard from "../../components/cards/LoadingCard";
import ProductCard from "../../components/cards/ProductCard";
import {
  getProducts,
  getProductsByCount,
  getProductsCount,
} from "../../functions/product";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({});

  const { user } = useSelector((state) => ({ ...state }));
  //current page
  const [page, setPage] = useState(0);
  //total products
  const [productsCount, setProductsCount] = useState(0);

  const innerWidth = window.innerWidth;

  const innerHeight = window.innerHeight;

  // const handleSubmitRight = () => {
  //   setPage(page + 1);
  // };

  // const handleSubmitLeft = () => {
  //   setPage(page - 1);
  // };

  useEffect(() => {
    loadAllListProducts();
    if (innerWidth <= 760 && innerHeight <= 815) {
      setSettings({
        infinite: false,
        dots: true,
        speed: 1000,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 2,

        // slide: "> div",
        // cssEase: "linear",
      });
    } else {
      setSettings({
        infinite: false,
        dots: true,
        speed: 1000,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,

        // slide: "> div",
        // cssEase: "linear",
      });
    }
  }, []);

  // useEffect(() => {
  //   getProductsCount().then((res) => setProductsCount(res.data));
  // }, []);

  //load all products //sort, order, limit
  const loadAllListProducts = () => {
    setLoading(true);
    getProducts("createdAt", "desc", 10)
      .then((res) => {
        setLoading(false);
        console.log("Products", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };
  return (
    <>
      <div className="container mb-5 mt-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Slider {...settings}>
              {products.length &&
                products.map((product) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </Slider>

            {/* {products.map((product) => (
                <div key={product._id} className="col-md-3 col-sm-3 col-6">
                  <ProductCard product={product} />
                </div>
              ))} */}
          </>
        )}
        {/* <div className="row">
          <div className="col-md-4 offeset-md-4 text-center p-3 pt-5 mb-5 ">
            {page > 1 ? (
              <LeftOutlined onClick={handleSubmitLeft} className="arrow-size" />
            ) : null}

            {productsCount / 4 > page ? (
              <RightOutlined
                onClick={handleSubmitRight}
                className="arrow-size"
              />
            ) : null}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default NewArrivals;
