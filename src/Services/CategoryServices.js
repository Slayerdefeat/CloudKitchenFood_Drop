import axios from "axios";
import getAuthHeader from "src/Utils/SendHeader";
const API_URL = "http://localhost:4000/api";

const categoryservices = {};

categoryservices.create = (formdata) => {
  return axios.post(`${API_URL}/category/create`, formdata, getAuthHeader());
};
categoryservices.all = () => {
  return axios.get(`${API_URL}/category/all`, getAuthHeader());
};
categoryservices.by_id = (id) => {
  return axios.get(`${API_URL}/category/${id}`, getAuthHeader());
};
categoryservices.by_id_updte = (data) => {
  return axios.put(`${API_URL}/category/${data?._id}`, data, getAuthHeader());
};
categoryservices.by_id_del = (data) => {
  return axios.delete(`${API_URL}/category/${data?.id}`, getAuthHeader());
};

export default categoryservices;
