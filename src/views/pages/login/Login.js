import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import AuthServices from "src/Services/AuthServices";
import { ToastContainer, toast } from "react-toastify";
import Loader from "src/components/Loader";
import { LoginForm } from "src/Utils/ValidationHelper/Validation";
import StorageHelper from "src/Httphelper";

const Login = () => {
  const nav = useNavigate();

  const initial_value = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initial_value,
    validationSchema: LoginForm,
    onSubmit: (values, action) => {
      return handleSubmit(values);
    },
  });
  const handleSubmit = (data) => {
    console.log(data, "login data");

    return mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (formdata) => AuthServices.login(formdata),
    onSuccess: (data) => {
      console.log(data, "Login success");

      StorageHelper.setToken(data?.data?.authtoken);
      StorageHelper.setData(data?.data?.data);

      toast.success("Login Successfully", { delay: 10 });
      setTimeout(() => {
        nav("/dashboard");
      }, 3000);

      return true;
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message, { delay: 10 });
      return false;
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
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={formik.handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">
                          Sign In to your account
                        </p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            autoComplete="Email"
                          />
                        </CInputGroup>
                        <p className="text-danger">
                          {formik.touched.email && formik.errors.email}
                        </p>

                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                            autoComplete="current-password"
                          />
                        </CInputGroup>
                        <p className="text-danger">
                          {formik.touched.password && formik.errors.password}
                        </p>
                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              color="primary"
                              type="submit"
                              className="px-4"
                            >
                              Login
                            </CButton>
                          </CCol>
                          {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5"
                    style={{ width: "44%" }}
                  >
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <Link to="/register">
                          <CButton
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Register Now!
                          </CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        )}
      </div>
    </>
  );
};

export default Login;
