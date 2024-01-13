import SetHeader from "src/Utils/SendHeader";
import axios from "axios";

const AuthServices = {};
const API_URL = "http://localhost:4000/api";

console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);

AuthServices.signup = async (formdata) => {
  // console.log("signyp",formdata)
  return axios.post(`${API_URL}/restaurant/create`, formdata);
};
AuthServices.login = async (formdata) => {
  return axios.post(`${API_URL}/restaurant/login`, formdata);
};

export default AuthServices;
