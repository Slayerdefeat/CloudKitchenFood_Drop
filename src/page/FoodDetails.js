import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CRow,
  CForm
} from "@coreui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import StorageHelper from "src/Httphelper";
import categoryservices from "src/Services/CategoryServices";
import foodservices from "src/Services/FoodlServices";
import { foodAddValidation } from "src/Utils/ValidationHelper/Validation";
import Loader from "src/components/Loader";
const FoodDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const rest_id = StorageHelper?.getData()?._id;
  const initialValues = { name: "", price: "", image: null, food_category: "" };
  const { data: food_details, isLoading: isLoad } = useQuery(
    ["food-details", id],
    () => foodservices?.by_id(id),
    {
      enabled: !!id,
      refetchOnWindowFocus:false,
      refetchOnMount:true,
      onError: (err) => {
        toast?.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast?.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        formik?.setFieldValue('name',data?.data?.data?.name)
        formik?.setFieldValue('price',data?.data?.data?.price)
        formik?.setFieldValue('image',data?.data?.data?.image)
        formik?.setFieldValue('food_category',data?.data?.data?.category_id?._id)
      },
    }
  );

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
    // validationSchema: foodAddValidation,
    onSubmit: (values, action) => {
      console.log(values)
    
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
    console.log("Data- at details of food",rest_id)
    const formdata = new FormData();
    formdata?.append("name", data?.name);
    formdata?.append("price", data?.price);
    formdata?.append("image", data?.image);
    formdata?.append("category_id", data?.food_category);
    formdata?.append("rest_id", rest_id);
    formdata?.append("id",id)
    return edit_food?.mutate(formdata);
  };
  const edit_food=useMutation((formdata)=>{
 
    return foodservices?.by_id_updte_data({id:id,formdata})},{
    onSuccess:(data)=>{
    if(data?.data?.error){
      toast.error(data?.data?.data?.message,{delay:10})
      return false

    }
    toast?.success('Food Updated',{delay:10})
    return setTimeout(() => {
      queryClient.refetchQueries('food-list')
      return nav('/food')
    }, 2000);


  },onError:(err)=>{
    toast?.error(err?.response?.data?.message)
    return false;

  }
})
  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className=" container d-flex justify-content-center"
          style={{ flexDirection: "column" }}
        >
          <CForm onSubmit={formik?.handleSubmit}>
            <CCard className="mb-5 p-2">
              <CCardBody className=" d-flex justify-content-center align-items-center">
                {data?.data?.data?.length &&
                  data?.data?.data?.map((each) => {
                    return (
                      <CFormCheck
                      key={each?._id}
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
                   
                    </CRow>{" "}
                    <CRow>
                <div className="d-flex justify-content-between" style={{ alignItems: 'center' }}>
                  <div>
                    {' '}
                    <p>Last Updated {new Date(food_details?.data?.data?.updatedAt).toUTCString()} </p>
                  </div>
                  <div>
                    {' '}
                    <CButton className="px-5" type="submit">Update </CButton>
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
                             image || formik?.values?.image                              
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
        </div>
      )}
    </>
  );
};

export default FoodDetails;
