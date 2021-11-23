import axios from "axios";

//getall coupns
export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/coupons`);

//create
export const createCoupons = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

//remove
export const deleteCoupons = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/coupons/${couponId}`, {
    headers: {
      authtoken,
    },
  });
