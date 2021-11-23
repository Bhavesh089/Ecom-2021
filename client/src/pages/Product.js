import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import SingleProduct from "../components/cards/SingleProduct";
import {
  getProduct,
  getRelatedProducts,
  getRelatedProductsCount,
} from "../functions/product";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState({});
  const [settings, setSettings] = useState({});
  // const [relatedProductsCount, setRelatedProductsCount] = useState(0);
  // const [page, setPage] = useState(1);

  const innerWidth = window.innerWidth;

  const innerHeight = window.innerHeight;

  const { slug } = match.params;

  // const handleSubmitRight = () => {
  //   setPage(page + 1);
  // };

  // const handleSubmitLeft = () => {
  //   setPage(page - 1);
  // };

  useEffect(() => {
    loadingSingleProduct();

    window.scrollTo(0, 0);

    console.log(slug);
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
  }, [slug]);

  const loadingSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      //get count realted products
      // getRelatedProductsCount(res.data._id).then((res) =>
      //   setRelatedProductsCount(res.data)
      // );

      //load related
      getRelatedProducts(res.data._id, 10).then((res) =>
        setRelatedProduct(res.data)
      );
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-5 ">
        <SingleProduct product={product} />
      </div>
      <div className="row p-5">
        <div className="col text-center pt-2 pb-5">
          <hr />
          <h2 className="product-heading-class">You Might Also Like</h2>

          <hr />

          {relatedProduct.length ? (
            <Slider {...settings} className="related-slider">
              {relatedProduct.map((product) => (
                <div key={product._id} className="col-md-8">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center col">No Related Products</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
