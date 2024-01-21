import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CRow,
} from "@coreui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import StorageHelper from "src/Httphelper";
import categoryservices from "src/Services/CategoryServices";
import foodservices from "src/Services/FoodlServices";
import { foodAddValidation } from "src/Utils/ValidationHelper/Validation";
import Loader from "src/components/Loader";

const FoodAdd = () => {
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const rest_id = StorageHelper?.getData()?._id;
  const nav = useNavigate();
  const initialValues = { name: "", price: "", image: null, food_category: "" };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category_list"],
    queryFn: () => categoryservices.all(),
    onSuccess: (data) => {
      if (data?.data?.error) {
        toast.error(data?.data?.message, { delay: 10 });
      }
    },
    onError: (err) => {
      toast.error(err?.message, { delay: 10 });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: foodAddValidation,
    onSubmit: (values, action) => {
      if (!image) {
        formik?.setFieldError("image", "image required");
        return false;
      }
      return submitHandler(values);
    },
  });
  const handleImage = (e) => {
    if (e?.target?.files?.length == 0) {
      return;
    }
    setImage(URL.createObjectURL(e?.target?.files[0]));
    formik?.setFieldValue("image", e?.target?.files[0]);
    return true;
  };

  const submitHandler = (data) => {
    const formdata = new FormData();
    formdata?.append("name", data?.name);
    formdata?.append("price", data?.price);
    formdata?.append("image", data?.image);
    formdata?.append("category_id", data?.food_category);
    formdata?.append("rest_id", rest_id);
    return add_food?.mutate(formdata);
  };

  const add_food = useMutation((formdata) => foodservices?.create(formdata), {
    onSuccess: (data) => {
      if (data?.data?.error) {
        toast.error(data?.data?.data?.message, { delay: 10 });
        return false;
      }
      toast?.success("Food Added", { delay: 10 });
      return setTimeout(() => {
        queryClient.refetchQueries("food-list");
        return nav("/food");
      }, 2000);
    },
    onError: (err) => {
      toast?.error(err?.response?.data?.message);
      return false;
    },
  });

  return (
    <>
      <ToastContainer />
      <div
        className=" container d-flex justify-content-center"
        style={{ flexDirection: "column" }}
      >
        {isLoading || add_food?.isLoading ? (
          <Loader />
        ) : (
          <CForm onSubmit={formik?.handleSubmit}>
            <CCard className="mb-5 p-2">
              <CCardBody className=" d-flex justify-content-center align-items-center">
                {data?.data?.data?.length &&
                  data?.data?.data?.map((each) => {
                    return (
                      <CFormCheck
                        inline
                        type="radio"
                        id="inlineCheckbox1"
                        name="food_category"
                        value={each?._id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.food_category === each?._id}
                        label={each?.name}
                      />
                    );
                  })}
              </CCardBody>
              {formik?.touched?.food_category && (
                <p className="text-danger text-center">
                  {formik?.errors?.food_category}{" "}
                </p>
              )}
            </CCard>
            <CCard className="p-5">
              <CCardBody>
                <CRow className="">
                  <CCol
                    style={{
                      // marginTop: '20px',
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <CRow className="mb-2">
                      <CCol xs>
                        <CFormInput
                          name="name"
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          value={formik?.values?.name}
                          placeholder="name"
                          aria-label="name"
                          className="py-3"
                        />
                      </CCol>
                      {formik?.touched?.name && (
                        <p className="text-danger">{formik?.errors?.name} </p>
                      )}
                    </CRow>
                    <CRow>
                      <CCol xs>
                        <CFormInput
                          name="price"
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          value={formik?.values?.price}
                          placeholder="price"
                          aria-label="Price"
                          className="py-3"
                        />
                      </CCol>
                      {formik?.touched?.price && (
                        <p className="text-danger">{formik?.errors?.price} </p>
                      )}
                    </CRow>
                    <CRow>
                      <CCol>
                        <input
                          type="file"
                          onChange={handleImage}
                          name="image"
                          className="form-control file-upload-input "
                          accept="image/*"
                          placeholder="Image"
                        />
                      </CCol>
                      {formik?.touched?.image && (
                        <p className="text-danger">{formik?.errors?.image} </p>
                      )}
                    </CRow>{" "}
                    <CRow>
                      <div
                        className="d-flex justify-content-center"
                        style={{ alignItems: "center" }}
                      >
                        <div>
                          {" "}
                          <CButton className="px-5" type="submit">
                            Add{" "}
                          </CButton>
                        </div>
                      </div>
                    </CRow>
                  </CCol>

                  <CCol>
                    {/* <CRow className="mb-2">
                <CCol xs> */}
                    <div className="file-upload mt-2">
                      <div className="image-upload-wrap">
                        <div className={"drage-text"}>
                          <img
                            height={250}
                            width={250}
                            src={
                              image ||
                              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* </CCol> */}

                    {/* </CRow>{' '} */}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CForm>
        )}
      </div>
    </>
  );
};

export default FoodAdd;
