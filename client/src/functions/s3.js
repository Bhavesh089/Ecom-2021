import axios from "axios";

//remove products
export const removeFromS3 = async (key, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/removeimages`,
    { key },
    {
      headers: {
        authToken,
      },
    }
  );
};
