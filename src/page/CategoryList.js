import {
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import categoryservices from "src/Services/CategoryServices";
import Loader from "src/components/Loader";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
const CategoryList = () => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category_list"],
    queryFn: () => categoryservices.all(),
    onSuccess: (data) => {
      if (data?.data?.error) {
        toast.error(data?.data?.message, { delay: 10 });
      }
      console.log("My Category list ", data?.data);
    },
    onError: (err) => {
      toast.error(err?.message, { delay: 10 });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const {
    data: eachCateg,
    isLoading: isLoad,
    isSuccess,
    isError: err,
    error: errmsg,
  } = useQuery({
    queryKey: ["each_category"],
    queryFn: () => categoryservices.by_id(editId),
    retry: false,
    enabled: editable,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (editable) {
        setValue(data?.data?.data?.name);
        return true;
      }
    },
    onError: (err) => {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, { delay: 10 });
      return false;
    },
  });

  const handleChange = (e) => {
    setValue(e?.target?.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value, "value", editId);
    if (!editId && !editable) {
      return addCategory.mutate({ name: value });
    }

    return editCategory.mutate({ name: value, _id: editId });
  };

  const addCategory = useMutation(
    (formdata) => categoryservices.create(formdata),
    {
      onSuccess: (data) => {
        console.log("data->", data?.data?.data);
        toast.success("Category Added", { delay: 10 });
        queryClient.refetchQueries("category_list");
        setEditId(null), setEditable(false);
        setValue("");
        return true;
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );

  const editCategory = useMutation(
    (formdata) => categoryservices.by_id_updte(formdata),
    {
      onSuccess: (data) => {
        console.log("data->----->", data?.data?.data);
        toast.success("Category update", { delay: 10 });
        setEditId(null), setEditable(false);
        setValue("");
        queryClient.refetchQueries("category_list");

        return true;
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );

  const handleDelete = (id) => {
    return deleteCategory.mutate({ id: id });
  };
  const deleteCategory = useMutation(
    (formdata) => categoryservices.by_id_del(formdata),
    {
      onSuccess: (data) => {
        console.log("data->----->", data?.data?.data);
        if (data?.data?.error) {
          toast.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        toast.success("Category Deleted", { delay: 10 });
        queryClient.refetchQueries("category_list");
        setEditId(null), setEditable(false);
        setValue("");

        return true;
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );

  // useEffect(() => {
  //   if (editable) {
  //     setValue(eachCateg?.data?.data?.name);
  //   }
  // }, [eachCateg?.data, isLoad]);

  return (
    <>
      <ToastContainer />
      {isError || err ? (
        <p className="text-danger">{error?.message || errmsg?.message}</p>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <CCard className="mb-2">
            <CCardBody>
              <div className="d-flex justify-content-between">
                <h4>Category List</h4>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody className="d-flex justify-content-between">
              <CFormInput
                placeholder="category"
                aria-label="Category"
                className="mx-5"
                value={value}
                onChange={handleChange}
              />
              {editable ? (
                <>
                  <CButton
                    className="ml-2 mx-2"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Update
                  </CButton>
                  <CButton
                    className="ml-2"
                    type="button"
                    onClick={() => {
                      setEditId(null), setEditable(false);
                      setValue("");
                    }}
                  >
                    Cancel
                  </CButton>
                </>
              ) : (
                <CButton className="ml-2" type="button" onClick={handleSubmit}>
                  Add
                </CButton>
              )}
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Added On</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Last Updated{" "}
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data?.data?.data.length == 0 ? (
                    <CCardBody className="d-flex justify-content-between">
                      <CFormInput
                        placeholder="category"
                        aria-label="Category"
                        className="mx-5"
                      />
                      <CButton className="ml-2">Add</CButton>
                    </CCardBody>
                  ) : (
                    data?.data?.data?.map((each, ind) => {
                      return (
                        <CTableRow key={each?._id}>
                          <CTableHeaderCell scope="row">
                            {ind + 1}
                          </CTableHeaderCell>

                          <CTableDataCell
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setEditable(true);
                              setEditId(each?._id);
                              return true;
                            }}
                          >
                            {each?.name}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(each?.createdAt).toDateString()}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(each?.updatedAt).toDateString()}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(each?._id)}
                          >
                            <CIcon icon={cilTrash} size="xl" />
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </>
      )}
    </>
  );
};

export default CategoryList;
