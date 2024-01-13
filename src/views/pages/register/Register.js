import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useFormik } from "formik";
import AuthServices from "src/Services/AuthServices";
import { useMutation } from "@tanstack/react-query";
import loader from "../../../assets/images/loader.gif";
import Loader from "src/components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signUpvalidation } from "src/Utils/ValidationHelper/Validation";
const Register = () => {
  const [image, setImage] = useState({ profile_img: null, food_license: null });
  const [showimage, setShowImage] = useState({
    profile_img: null,
    food_license: null,
  });
  const [imaeErr, setImageErr] = useState({
    profile_img: "",
    food_license: "",
  });
  const nav = useNavigate();
  const initial_value = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    profile_img: null,
    food_license: null,
  };
  const formik = useFormik({
    initialValues: initial_value,
    validationSchema: signUpvalidation,
    onSubmit: (values, action) => handleSubmit(values),
  });
  const handleImage = (e) => {
    if (!e?.target?.files || e?.target?.files.length == 0) {
      return;
    }
    console.log(e.target.files[0], e.target.name);
    setImage({ ...image, [e.target.name]: e.target.files[0] });
    setShowImage({
      ...showimage,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleSubmit = (data) => {
    console.log("data", data, image);
    if (!image.food_license) {
      return setImageErr({ ...imaeErr, food_license: "required" });
    }
    if (!image.profile_img) {
      return setImageErr({ ...imaeErr, profile_img: "required" });
    }
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("profile_img", image?.profile_img);
    formData.append("food_license", image?.food_license);
    return mutation.mutate(formData);
  };
  const mutation = useMutation({
    mutationFn: (formdata) => {
      return AuthServices.signup(formdata);
    },
    onSuccess: (data) => {
      console.log("data-->", data);
      toast.success("account created successfully",{delay:10});
      setTimeout(() => {
        nav("/login");
      }, 2000);
      return true;
    },
    onError: (err) => {
      console.log(err?.message);
      toast.error(err?.message,{delay:10});
    },
  });


  return (
    <>
          <ToastContainer />
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {mutation.isLoading ? (
        <Loader />
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={formik.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <p className="text-danger">
                      {formik.touched.name && formik.errors.name}
                    </p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </CInputGroup>

                    <p className="text-danger">
                      {formik.touched.email && formik.errors.email}
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="new-password"
                      />
                    </CInputGroup>

                    <p className="text-danger">
                      {formik.touched.password && formik.errors.password}
                    </p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="cpassword"
                        value={formik.values.cpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                    </CInputGroup>

                    <p className="text-danger">
                      {formik.touched.cpassword && formik.errors.password}
                    </p>
                    <CFormLabel>Food License</CFormLabel>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        type="file"
                        onChange={handleImage}
                        name="food_license"
                      />
                    </CInputGroup>

                    <p className="text-danger">{imaeErr.food_license}</p>
                    <div className="d-grid">
                      <img
                        height={100}
                        width={100}
                        src={showimage.food_license || loader}
                      />
                    </div>

                    <CFormLabel>Profile Image</CFormLabel>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        name="profile_img"
                      />
                    </CInputGroup>

                    <p className="text-danger">{imaeErr.profile_img}</p>

                    <div className="d-grid text-center mb-2">
                      <img
                        height={100}
                        width={100}
                        name="food_license"
                        src={showimage.profile_img || loader}
                      />
                    </div>
                    <div className="d-grid">
                      <CButton color="success" type="submit">
                        Create Account
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
    </>
  );
};

export default Register;
