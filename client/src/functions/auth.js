import axios from "axios";

//send token and get user from the backend //createuser
export const createUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/createUpdateUser`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

//get created or CUrrentuser from the backend
export const currentUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/currentUser`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

//get Admin user
export const currentAdmin = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/currentAdmin`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
