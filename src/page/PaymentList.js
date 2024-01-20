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
} from '@coreui/react'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import StorageHelper from 'src/Httphelper'
import orderservices from 'src/Services/OrderServices'
import CustomeContext from 'src/Utils/CustomContext'
import Loader from 'src/components/Loader'
const PaymentList = () => {
  const rest_id = StorageHelper?.getData()._id;
  const { data, isLoading } = useQuery(
    ["payment-list"],
    () => orderservices.order_by_rest_id({ rest_id }),
    {
      onSuccess: (data) => {
        console.log("Data of payment List",data)
      },
      onError: (err) => {
        toast?.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );
  return (
    <>
    <ToastContainer/>
  
      <CCard className="mb-2">
        <CCardBody>
          <div className="d-flex justify-content-between">
            <h4>Payment List </h4>
          </div>
        </CCardBody>
      </CCard>
      {
    isLoading ? <Loader/>:      <CCard>
    <CCardBody>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Transection Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Payment</CTableHeaderCell>
            <CTableHeaderCell scope="col">Paid by</CTableHeaderCell>
            <CTableHeaderCell scope="col">Paid on </CTableHeaderCell>
            <CTableHeaderCell scope="col">order  </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {
            data?.data?.data?.length==0?<p className='text-danger'>No Payment Found</p>:data?.data?.data?.map((each,ind)=>{
              return  <CTableRow key={each?._id}>
              <CTableHeaderCell scope="row">{ind+1}</CTableHeaderCell>
              <CTableDataCell>{each?.payment_id?.transection_id}</CTableDataCell>
              <CTableDataCell>&#8377; {each?.payment_id?.amount}</CTableDataCell>
              <CTableDataCell>{each?.user_id?.name}</CTableDataCell>
              <CTableDataCell>{new Date(each?.payment_id?.updatedAt || null).toUTCString()}</CTableDataCell>
              <CTableDataCell>{each?.foods?.map((each)=><tr>{each?.food_id?.name}</tr>)}</CTableDataCell>

            </CTableRow>
            })
          }

         
        
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
    }

    </>
  )
}
export default PaymentList
