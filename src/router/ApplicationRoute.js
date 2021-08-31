/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pathContent, protextedPath } from ".";
import LeftMenu from "../component/left-menu";
import { accessMatrixModel } from "../mock/accessMatrix";
import { accessMatrix, authenticated } from "../state-recoil";
import { getRoleName } from "../utils/sesstion-storage";
import Dashboard from "../view/dashboard";
import Task from "../view/task";
import Branch from "../view/branch";
import MerchantQR from "../view/merchantQR";
import Setting from "../view/setting";

export const RedirectLogin = () => {
  const { login } = protextedPath;
  return <Redirect to={login} />;
};

const ApplicationRoute = () => {
  const [menuAccessMatrix, setAccessMatrix] = useRecoilState(accessMatrix);
  const [recoilAuth] = useRecoilState(authenticated);
  useEffect(() => {
    saveAccessMatrix();
  }, []);

  const saveAccessMatrix = () => {
    return setAccessMatrix(accessMatrixModel);
  };

  const ProtectedRenderContent = ({ children, ...rest }) => {
    return (
      <Suspense>
        <Route exact {...rest}>
          {children}
        </Route>
      </Suspense>
    );
  };
  console.log("getRoleName:::", getRoleName());
  const renderMenuItems = () => {
    return (
      <div>
        <React.Fragment>
          <ProtectedRenderContent path={pathContent.dashboard}>
            <Dashboard />
          </ProtectedRenderContent>
          <ProtectedRenderContent path={pathContent.task}>
            <Task />
          </ProtectedRenderContent>
          <ProtectedRenderContent path={pathContent.branch}>
            <Branch />
          </ProtectedRenderContent>
          <ProtectedRenderContent path={pathContent.merchantQR}>
            <MerchantQR />
          </ProtectedRenderContent>
          <ProtectedRenderContent path={pathContent.setting}>
            <Setting />
          </ProtectedRenderContent>
        </React.Fragment>
      </div>
    );
  };

  const returnLeftMenu = () => {
    const { isAuthentication } = recoilAuth;
    if (menuAccessMatrix) {
      const { menuList } = menuAccessMatrix;
      return isAuthentication ? (
        <LeftMenu menuLists={menuList}>{renderMenuItems()}</LeftMenu>
      ) : (
        <RedirectLogin />
      );
    }
  };
  return returnLeftMenu();
};

export default ApplicationRoute;
