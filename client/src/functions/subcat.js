import axios from "axios";

//get subCategories
export const getsubCats = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/subcats`);
};

//get subCategories of categories
export const getsubofCat = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/category/subs/${_id}`
  );
};

//get single subcategory
export const getsubCat = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/subcat/${slug}`);
};

//remove subcategory
export const removesubCat = async (authToken, slug) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/subcat/${slug}`, {
    headers: {
      authToken,
    },
  });
};

//update subcategory
export const updatesubCat = async (authToken, slug, name, parent) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/subcat/${slug}`,
    { name, parent },
    {
      headers: {
        authToken,
      },
    }
  );
};

//create subcategory
export const createsubCat = async (authToken, name, parent) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/subcat`,
    { name, parent },
    {
      headers: {
        authToken,
      },
    }
  );
};
