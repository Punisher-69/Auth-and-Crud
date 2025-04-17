import axios from "axios";
const Dummy_Url = import.meta.env.VITE_PRODUCTS_URL;



export const getProducts = () => {
  return axios.get(`${Dummy_Url}/products?limit=20`);
};

export const deleteProduct = (id) => {
  return axios.delete(`${Dummy_Url}/products/${id}`);
};

export const updateProducts = (id, post) => {
  return axios.put(`${Dummy_Url}/products/${id}`, post);
};

export const postProduct = (product) => {
  return axios.post(`${Dummy_Url}/products`, product);
};
