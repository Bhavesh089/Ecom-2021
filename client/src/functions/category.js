import axios from "axios";

//get Categories
export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
};

//get single category
export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`);
};

//remove category
export const removeCategory = async (authToken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    {
      headers: {
        authToken,
      },
    }
  );
};

//update category
export const updateCategory = async (authToken, slug, name, catImages) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    { name, catImages },
    {
      headers: {
        authToken,
      },
    }
  );
};

//create category
export const createCategory = async (authToken, name, image) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/category`,
    { name, image },
    {
      headers: {
        authToken,
      },
    }
  );
};

//get  subcategory
export const getCategorySubs = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/category/subs/${_id}`
  );
};
