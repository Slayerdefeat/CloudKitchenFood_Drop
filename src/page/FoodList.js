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
const FoodList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["food-list"],
    () => foodservices?.all(),
    {
      onSuccess: (data) => {
        console.log("Data of Food", data?.data?.data);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );
  const statusChange = (id, status) => {
    const formdata = new FormData();
    formdata?.append("id", id);
    formdata?.append("best_food", status);

    return best_food?.mutate({ id: id, best_food: status.toString() });
  };
  const deleteFood = (id) => {
    return delete_food.mutate({ id: id });
  };

  const delete_food = useMutation(
    (formdata) => foodservices?.by_id_del(formdata),
    {
      onError: (err) => {
        toast?.error(err?.response?.data?.message);
      },
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        toast?.success("Food Deleted", { delay: 10 });
        queryClient.invalidateQueries("food-list");
        queryClient?.refetchQueries("food-list");
        return true;
      },
    }
  );

  const best_food = useMutation(
    (formdata) => {
      console.log(formdata, "forrmdata");
      foodservices?.by_id_updte(formdata);
    },
    {
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        queryClient.invalidateQueries("food-list");
        queryClient?.refetchQueries("food-list");

        toast?.success("updated Food");
        return true;
      },
      onError: (err) => {
        console.log("Id", err?.response);
        toast.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );

  return (
    <>
      <ToastContainer />
      <CCard className="mb-2">
        <CCardBody>
          <div className="d-flex justify-content-between">
            <h4>Food List</h4>
            <Link to={"/food/add"}>
              <CButton>Add</CButton>
            </Link>
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
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Restaurant </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Added On</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Update</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Best Food</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data?.data?.data?.length == 0 ? (
                  <CCardBody>
                    <div className="d-flex justify-content-between">
                      <h4>NO Food Found</h4>
                      <Link to={"/food/add"}>
                        <CButton>Add</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                ) : (
                  data?.data?.data?.map((each, ind) => {
                    return (
                      <CTableRow key={each?._id}>
                        <CTableHeaderCell scope="row">
                          {ind + 1}
                        </CTableHeaderCell>
                        
                        <CTableDataCell>{each?.name}</CTableDataCell>
                        <CTableDataCell>
                          <img src={each?.image} height={70} width={70} />
                        </CTableDataCell>
                        <CTableDataCell>{each?.price}</CTableDataCell>
                        <CTableDataCell>
                          {each?.category_id?.name}
                        </CTableDataCell>
                        <CTableDataCell>{each?.rest_id?.name}</CTableDataCell>
                        <CTableDataCell>
                          {new Date(each?.createdAt).toDateString()}
                        </CTableDataCell>
                        <CTableDataCell>
                          {new Date(each?.updatedAt).toDateString()}
                        </CTableDataCell>
                        <CTableDataCell style={{ cursor: "pointer" }}>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={each?.best_food}
                              onClick={() =>
                                statusChange(each?._id, !each?.best_food)
                              }
                              id="flexSwitchCheckDefault"
                            />
                          </div>{" "}
                        </CTableDataCell>
                        <CTableDataCell
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteFood(each?._id)}
                        >
                          <CIcon icon={cilTrash} size="xl" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <Link to={'/food/details/'+each?._id}>
                          <CIcon icon={cilColorBorder} size="xl"/>
                          </Link>
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
export default FoodList;
