import axios from "axios";

export const createPayment = async (authToken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/user/payment`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );
