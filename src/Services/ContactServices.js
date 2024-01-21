import axios from "axios";
import getAuthHeader from "src/Utils/SendHeader";
// const API_URL = "https://food-drop-backend.onrender.com/api";
const API_URL='http://127.0.0.1:4000/api'


const contactservices = {};

contactservices.all = () => {
  return axios.get(`${API_URL}/admin/contact`, getAuthHeader());
};

contactservices.by_id_del = (data) => {
  return axios.delete(`${API_URL}/admin/delete/contact/one/${data?.id}`, getAuthHeader());
};
contactservices.by_all_del = (data) => {
  return axios.delete(`${API_URL}//admin/delete/contact/all`, getAuthHeader());
};

export default contactservices;
