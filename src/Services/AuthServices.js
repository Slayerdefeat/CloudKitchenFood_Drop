import axios from "axios";
import StorageHelper from "src/Httphelper";
import getAuthHeader from "src/Utils/SendHeader";
const rest_id=StorageHelper?.getData()._id
const AuthServices = {};
// const API_URL = "https://food-drop-backend.onrender.com/api";
const API_URL='http://127.0.0.1:4000/api'
;

// console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);

AuthServices.signup = async (formdata) => {
  // console.log("signyp",formdata)
  return axios.post(`${API_URL}/restaurant/create`, formdata);
};
AuthServices.login = async (formdata) => {
  return axios.post(`${API_URL}/restaurant/login`, formdata);
};
AuthServices.adminapproverest = async (formdata) => {
  return axios.get(`${API_URL}/admin/approve/res/${rest_id}`, getAuthHeader()).then((res)=>{
    alert("Resturant Approved")
    return 
  }).catch((err)=>{
    alert(err?.response?.data?.message)
  });
};

export default AuthServices;
