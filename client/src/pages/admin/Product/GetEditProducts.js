import React, { useEffect, useState } from "react";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import AdminProductTable from "../../../components/table/AdminProductTable";
import { useSelector } from "react-redux";
import { removeFromS3 } from "../../../functions/s3";

import { Divider } from "antd";

const GetEditProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllListProducts();
  }, []);

  //load all products
  const loadAllListProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  //remove product from table
  const handleRemoveProduct = (record) => {
    console.log(record);
    setLoading(true);
    //confirm delete
    if (window.confirm("Delete ?")) {
      removeProduct(record.slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(res.data);
          loadAllListProducts();
          if (record.images.length) {
            for (let i = 0; i < record.images.length; i++) {
              let key = record.images[i].key;
              //remove file from s3 as well
              removeFromS3(key, user.token)
                .then((resdata) => {
                  console.log("IMAGE Remove RES DATA", resdata);
                })
                .catch((err) => console.log(err));
            }
            loadAllListProducts();
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data);
        });

      //   removeProduct(slug, user.authToken);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <SyncOutlined spin />
          ) : (
            <div>
              <Divider orientation="left">
                <h4 className="create-title">Products</h4>
              </Divider>
              <AdminProductTable
                product={products}
                handleRemoveProduct={handleRemoveProduct}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetEditProducts;
