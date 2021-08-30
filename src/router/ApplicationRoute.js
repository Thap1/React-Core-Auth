import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { protextedPath } from ".";
import LeftMenu from "../component/left-menu";
import { accessMatrixModel } from "../mock/accessMatrix";
import { accessMatrix, authenticated } from "../state-recoil";
import { getRoleName } from "../utils/sesstion-storage";

export const RedirectLogin = () => {
  const { login } = protextedPath;
  return <Redirect to={login} />;
};

const ApplicationRoute = () => {
  const [menuAccessMatrix, setAccessMatrix] = useRecoilState(accessMatrix);
  const [isAuthenticated] = useRecoilState(authenticated);

  useEffect(() => {
    saveAccessMatrix();
  }, []);

  console.log("getRoleName:::", getRoleName());
  const saveAccessMatrix = () => {
    return setAccessMatrix(accessMatrixModel);
  };

  const renderMenuItems = () => {
    return <h1>renderMenuItems</h1>;
  };

  const returnLeftMenu = () => {
    // <RedirectLogin />
    return <LeftMenu>{renderMenuItems()}</LeftMenu>;
  };
  return returnLeftMenu();
};

export default ApplicationRoute;
