import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subCat, shipping, color, brand, quantity } = product;

  const offerPrice = () => {
    let dicountPercent =
      (product.price.ind - product.offerPrice.ind) / product.price.ind;

    dicountPercent = dicountPercent * 100;
    return (
      <>
        {" "}
        <span className="label label-default label-pill pull-xs-right">
          <s style={{ padding: "5px" }}>{product.price.ind}.00₹</s>
        </span>
        <span className="label label-default label-pill pull-xs-right">
          {product.offerPrice.ind}.00₹
        </span>
        {/* <div class="circle-badge float-right">
            <span class="circle__content">{dicountPercent}%</span>
          </div> */}
      </>
    );
  };

  return (
    <>
      <ul className="list-group list-color">
        <li className="list-group-item">
          Price{""}
          {product.offerPrice ? (
            offerPrice()
          ) : (
            <span className="label label-default label-pill pull-xs-right">
              {typeof price === "undefined" ? "" : `${price.ind}.00 ₹`}
            </span>
          )}
          {/*           
          <span className="label label-default label-pill pull-xs-right">
            {typeof price === "undefined" ? "" : `${price.ind}.00 ₹`}
          </span> */}
        </li>

        {category && (
          <li className="list-group-item">
            Category{""}
            <Link
              to={`/category/${category.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {typeof category === "undefined" ? "" : category.name}
            </Link>
          </li>
        )}

        {subCat && (
          <li className="list-group-item">
            {""}
            Tags
            {typeof subCat === "undefined"
              ? ""
              : subCat.map((s) => (
                  <Link
                    key={s._id}
                    to={`/subCat/${s.slug}`}
                    className="label label-default label-pill pull-xs-right"
                  >
                    {s.name}
                  </Link>
                ))}
          </li>
        )}

        <li className="list-group-item">
          Color{""}
          <span className="label label-default label-pill pull-xs-right">
            {typeof color === "undefined" ? "" : color}
          </span>
        </li>
      </ul>
    </>
  );
};

export default ProductListItems;
