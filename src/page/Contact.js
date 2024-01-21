import {
  CButton,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import foodservices from "src/Services/FoodlServices";
import CIcon from "@coreui/icons-react";
import { cilColorBorder, cilTrash } from "@coreui/icons";
import Loader from "src/components/Loader";
import contactservices from "src/Services/ContactServices";
const ContactList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["contact-list"],
    () => contactservices?.all(),
    {
      onSuccess: (data) => {
        //   console.log("Data of Food", data?.data?.data);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );

  const deleteContact = (id) => {
    return delete_contact.mutate({ id: id });
  };

  const delete_contact = useMutation(
    (formdata) => contactservices?.by_id_del(formdata),
    {
      onError: (err) => {
        toast?.error(err?.response?.data?.message);
      },
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        toast?.success("Deleted", { delay: 10 });
        queryClient.invalidateQueries("contact-list");
        queryClient?.refetchQueries("contact-list");
        return true;
      },
    }
  );
  const delete_all_contact = useMutation(
    (formdata) => contactservices?.by_all_del(),
    {
      onError: (err) => {
        toast?.error(err?.response?.data?.message);
      },
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        toast?.success(" All Deleted", { delay: 10 });
        queryClient.invalidateQueries("contact-list");
        queryClient?.refetchQueries("contact-list");
        return true;
      },
    }
  );

  return (
    <>
      <ToastContainer />
      <CCard className="mb-2">
        <CCardBody>
          <div className="d-flex justify-content-between">
            <h4>Contact List</h4>
            {/* <Link to={"/food/add"}> */}
            {!isLoading && (
              <CButton
                color="danger"
                disabled={data?.data?.data?.length > 0 ? false : true}
                onClick={() => delete_all_contact.mutate()}
              >
                Delete All
              </CButton>
            )}
            {/* </Link> */}
          </div>
        </CCardBody>
      </CCard>
      {isLoading ? (
        <Loader />
      ) : (
        <CCard>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Messaged on</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Message</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data?.data?.data?.length == 0 ? (
                  <CCardBody>
                    <h4>No one Contacted</h4>
                  </CCardBody>
                ) : (
                  data?.data?.data?.map((each, ind) => {
                    return (
                      <CTableRow key={each?._id}>
                        <CTableHeaderCell scope="row">
                          {ind + 1}
                        </CTableHeaderCell>

                        <CTableDataCell>{each?.name}</CTableDataCell>
                        <CTableDataCell>{each?.email}</CTableDataCell>
                        <CTableDataCell>
                          <div className="" style={{ width: "100px" }}>
                            {each?.message}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {new Date(each?.createdAt).toDateString()}
                        </CTableDataCell>
                        <CTableDataCell
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteContact(each?._id)}
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
      )}
    </>
  );
};
export default ContactList;
