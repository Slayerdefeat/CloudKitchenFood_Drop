import axios from "axios";
import getAuthHeader from "src/Utils/SendHeader";
// const API_URL = "https://food-drop-backend.onrender.com/api";
const API_URL='http://127.0.0.1:4000/api'

const foodservices = {};

foodservices.create = (formdata) => {
  return axios.post(`${API_URL}/food/create`, formdata, getAuthHeader());
};
foodservices.all = () => {
  return axios.get(`${API_URL}/food/all`, getAuthHeader());
};
foodservices.by_id = (id) => {
  return axios.get(`${API_URL}/food/${id}`, getAuthHeader());
};
foodservices.by_id_updte = async(data) => {
  return await axios.put(`${API_URL}/food/${data?.id}`, data, getAuthHeader());
};
foodservices.by_id_updte_data = async(data) => {
  return await axios.put(`${API_URL}/food/${data?.id}`, data?.formdata, getAuthHeader());
};

foodservices.by_id_del = (data) => {
  return axios.delete(`${API_URL}/food/${data?.id}`, getAuthHeader());
};

export default foodservices;