import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import StorageHelper from "src/Httphelper";
import orderservices from "src/Services/OrderServices";
import Loader from "src/components/Loader";
const OrderList = () => {
  const querclient = useQueryClient();
  const arr = ["pending", "accepted", "ready", "out-for-delivery", "delivered"];
  const rest_id = StorageHelper?.getData()._id;
  const { data, isLoading } = useQuery(
    ["order-list"],
    () => orderservices.order_by_rest_id({ rest_id }),
    {
      onSuccess: (data) => {},
      onError: (err) => {
        toast?.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );
  const statusChange = (id, orderstatus) => {
    return updte_status?.mutate({ id: id, status: arr[orderstatus] });
  };
  const updte_status = useMutation(
    (formdata) => {
      return orderservices?.by_id_status_updte(formdata);
    },
    {
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast?.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        querclient?.invalidateQueries("order-list");
        querclient?.refetchQueries("order-list");
        toast?.success("Order status change", { delay: 10 });
        return true;
      },
      onError: (err) => {
        toast?.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );
  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CCard className="mb-2">
            <CCardBody>
              <div className="d-flex justify-content-between">
                <h4>Order List</h4>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Food</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Payment</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data?.data?.data?.length == 0 ? (
                    <p className="text-danger">No Order Found</p>
                  ) : (
                    data?.data?.data?.map((each, ind) => {
                      return (
                        <CTableRow key={each?._id}>
                          <CTableHeaderCell scope="row">
                            {ind + 1}
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <CRow>
                              <CCol>
                                name :<b> {each?.user_id?.name}</b>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol>
                                email : <b>{each?.user_id?.email}</b>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol>
                                phone number :{" "}
                                <b>{each?.user_id?.phone_number}</b>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol>
                                address :<b> {each?.address}</b>
                              </CCol>
                            </CRow>
                            {/* <CRow>
                        <CCol>
                         Order Placed : {new Date(each?.createdAt).toUTCString()}

                        </CCol>

                      </CRow> */}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CRow>
                              <CCol>
                                {each?.foods?.map((ele) => (
                                  <tr>{ele?.food_id?.name}({ele?.qty}) -   &#8377; {parseInt(ele?.food_id?.price)*parseInt(ele?.qty)}</tr>
                                ))}
                              </CCol>
                            </CRow>
                          
                          </CTableDataCell>
                          <CTableDataCell>
                            <CRow>
                              <CCol>
                                <button
                                  className="btn btn-outline-danger"
                                  disabled={
                                    each?.order_status == "out-for-delivery" ||
                                    each?.order_status == "delivered"
                                      ? true
                                      : false
                                  }
                                  onClick={() =>
                                    statusChange(
                                      each?._id,
                                      each?.order_status != "out-for-delivery"
                                        ? arr.indexOf(each?.order_status) + 1
                                        : arr.indexOf(each?.order_status)
                                    )
                                  }
                                >
                                  {each?.order_status.toUpperCase()}
                                </button>
                                <p className="tex">
                                  order placed :{" "}
                                  {new Date(each?.createdAt).toUTCString()}
                                </p>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol>
                                <p className="tex">
                                  Last update :{" "}
                                  {new Date(each?.updatedAt).toUTCString()}
                                </p>
                              </CCol>
                            </CRow>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CRow>
                              <CCol>
                                {each?.payment_id?.status ? (
                                  <CButton
                                    color="success"
                                    style={{ color: "white" }}
                                  >
                                    Paid
                                  </CButton>
                                ) : (
                                  <CButton color="secondary">Pending</CButton>
                                )}
                              </CCol>
                            </CRow>

                            <CRow>
                              <CCol>
                                transection_id:{" "}
                                {each?.payment_id?.transection_id}
                              </CCol>
                            </CRow>

                            <CRow>
                              <CCol>
                                amount paid: &#8377; {each?.payment_id?.amount}
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol>
                                paid on:{" "}
                                {new Date(each?.updatedAt).toUTCString()}
                              </CCol>
                            </CRow>
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
export default OrderList;
