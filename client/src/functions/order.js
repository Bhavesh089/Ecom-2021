import axios from "axios";

//get Order by id
export const getOrderById = async (orderId, authToken) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/user/order/${orderId}`, {
    headers: {
      authToken,
    },
  });

export const updateOrderById = async (orderId, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API_URL}/user/order`,
    { orderId },
    {
      headers: {
        authToken,
      },
    }
  );

//get Order by id
export const getOrders = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/user/orders`, {
    headers: {
      authToken,
    },
  });

//orderforadmin
export const getOrderAdmin = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, {
    headers: {
      authToken,
    },
  });

//orderforadmin
export const getOrderStatusAdmin = async (orderId, orderStatus, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API_URL}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
