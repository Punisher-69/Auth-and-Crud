import axios from "axios";
const Dummy_Url = import.meta.env.VITE_PRODUCTS_URL;

const api = axios.create({
  
});

export const getData = () => {
  return api.get(`${Dummy_Url}/products?limit=5`);
};

export const deletePost = (id) => {
  return api.delete(`${Dummy_Url}/products/${id}`);
};

export const updateApi = (id, post) => {
  return api.put(`${Dummy_Url}/products/${id}`, post);
};

export const postApi = (post) => {
  return api.post(`${Dummy_Url}/products/add`, post);
};
