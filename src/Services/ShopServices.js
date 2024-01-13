
import axios from "axios";
import getAuthHeader from "src/Utils/SendHeader";
const API_URL = "http://localhost:4000/api";

const shopservices = {};

shopservices.shop_status = (formdata) => {
  return axios.get(`${API_URL}/restaurant/${formdata?.rest_id}`, getAuthHeader());
};
shopservices.shop_updte = (formdata) => {
  return axios.put(`${API_URL}/restaurant/${formdata?.rest_id}`,{}, getAuthHeader());
};


export default shopservices;