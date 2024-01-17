
import axios from "axios";
import getAuthHeader from "src/Utils/SendHeader";
const API_URL = "https://food-drop-backend.onrender.com/api";
// const API_URL='http://127.0.0.1:4000/api'


const orderservices = {};

orderservices.create = (formdata) => {
  return axios.post(`${API_URL}/order/create`, formdata, getAuthHeader());
};
orderservices.all = () => {
  return axios.get(`${API_URL}/order/all`, getAuthHeader());
};
orderservices.order_by_rest_id = (data) => {
  return axios.get(`${API_URL}/order/rest/${data?.rest_id}`, getAuthHeader());
};

orderservices.by_id = (id) => {
  return axios.get(`${API_URL}/order/${id}`, getAuthHeader());
};
orderservices.by_id_updte = async(data) => {
  return await axios.put(`${API_URL}/order/${data?.id}`, data, getAuthHeader());
};
orderservices.by_id_status_updte= (data) => {
  return axios.put(`${API_URL}/order/status/${data?.id}`,data, getAuthHeader());
};

export default orderservices;