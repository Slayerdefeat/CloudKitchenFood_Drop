import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import { logo } from "src/assets/brand/logo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import shopservices from "src/Services/ShopServices";
import StorageHelper from "src/Httphelper";
import { ToastContainer, toast } from "react-toastify";

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const rest_id = StorageHelper?.getData()?._id;
  const querclient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["shop-status"],
    () => {
      return shopservices?.shop_status({ rest_id });
    },
    {
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast?.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }
        return true;
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message, { delay: 10 });
        return false;
      },
    }
  );

  const shop_status_change = useMutation(
    (formdata) => {
      return shopservices?.shop_updte(formdata);
    },
    {
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast?.error(data?.data?.data?.message, { delay: 10 });
          return false;
        }

        toast?.success(data?.data?.data?.message, { delay: 10 });
        StorageHelper?.setData(data?.data?.data)
        querclient.invalidateQueries("shop-status");
        querclient?.refetchQueries("shop-status");
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
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onClick={() => shop_status_change.mutate({ rest_id })}
                  checked={data?.data?.data?.isonline}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {data?.data?.data?.isonline ? "online" : "offline"}
                </label>
              </div>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
    </>
  );
};

export default AppHeader;
