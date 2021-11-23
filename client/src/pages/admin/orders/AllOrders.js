import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import { getOrderAdmin, getOrderStatusAdmin } from "../../../functions/order";
import { Divider } from "antd";
import { toast } from "react-toastify";
import AdminOrdersTable from "../../../components/table/AdminOrdersTable";

const AllOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setorders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const handleStatusChange = (orderId, orderStatus) => {
    getOrderStatusAdmin(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      window.location.reload();
    });
  };

  //load all orders
  const loadAllOrders = () => {
    setLoading(true);
    getOrderAdmin(user.token)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setorders(res.data);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
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
                <h4 className="create-title">All Orders</h4>
              </Divider>
              <AdminOrdersTable
                orders={orders}
                handleStatusChange={handleStatusChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
