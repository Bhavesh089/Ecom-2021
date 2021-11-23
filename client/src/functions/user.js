import axios from "axios";

export const userCart = async (cart, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );

export const getUserCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const emptyCart = async (authToken) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/user/cart`, {
    headers: {
      authToken,
    },
  });

export const saveUserShippingAddress = async (authToken, shippingAddress) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/user/shipping`,
    { shippingAddress },
    {
      headers: {
        authToken,
      },
    }
  );

export const getUserShippingAddress = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/user/shipping`, {
    headers: {
      authToken,
    },
  });

//save selected address
export const selectedAddress = async (shippingAddress, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/user/selectshipping`,
    { shippingAddress },
    {
      headers: {
        authtoken,
      },
    }
  );

//apply coupon
export const applyCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

//wishList
export const getWishlist = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/user/wishlist`, {
    headers: {
      authToken,
    },
  });

//wishList
export const removeWishlist = async (productId, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API_URL}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );

//wishList
export const addToWishlist = async (productId, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/user/wishlist`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
