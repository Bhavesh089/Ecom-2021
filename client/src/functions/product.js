import axios from "axios";

//create category
export const createProduct = async (authToken, product) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/product`,
    { product },
    {
      headers: {
        authToken,
      },
    }
  );
};

//get products
export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products/${count}`);
};

//remove products
export const removeProduct = async (slug, authToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    {
      headers: {
        authToken,
      },
    }
  );
};

//get products
export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`);
};

//update product

//update category
export const updateProduct = async (authToken, slug, product) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    { product },
    {
      headers: {
        authToken,
      },
    }
  );
};

//get products by asc or desc
export const getProducts = async (sort, order, limit) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
    sort,
    order,
    limit,
  });
};

//get product by pagination
// export const getProducts = async (sort, order, page) => {
//   return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
//     sort,
//     order,
//     page,
//   });
// };

//get products count
export const getProductsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products/total`);
};

//get products
export const getRelatedProducts = async (productId, limit) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/product/related/${productId}`,
    {
      limit,
    }
  );
};

//get products
export const getRelatedProductsCount = async (productId) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/product/relatedcount/${productId}`
  );
};

//fetch product  by filter
export const fetchProductByFilter = async (arg) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/search/filters`,
    arg
  );
};
