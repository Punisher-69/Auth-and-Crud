import axios from "axios";
const Dummy_Url = import.meta.env.VITE_PRODUCTS_URL;
console.log(Dummy_Url);
const api = axios.create({
  
});

export const getData = () => {
  return api.get(`${Dummy_Url}/products?limit=10`);
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
