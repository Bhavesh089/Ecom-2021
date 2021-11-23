import React, { useEffect, useState } from "react";
import { getsubCat } from "../../functions/subcat";
import ProductCard from "../../components/cards/ProductCard";
import { SyncOutlined } from "@ant-design/icons";

const SubCategoryHome = ({ match }) => {
  const [subCat, setSubcat] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  let hello;
  useEffect(() => {
    setLoading(true);
    getsubCat(slug).then((res) => {
      console.log(res.data);
      setLoading(false);
      setSubcat(res.data.subsCat);
      setProducts(res.data.products);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <SyncOutlined spin className="ml-4 mb-3" />
          ) : (
            <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
              {subCat !== hello && subCat.name}
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <h4 className="text-center p-5 mt-5 display-2  Headings">
            Coming Soon Please Stay tune...
          </h4>
        )}
      </div>
    </div>
  );
};

export default SubCategoryHome;
