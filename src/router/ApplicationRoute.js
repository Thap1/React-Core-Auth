import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessMatrixModel } from "../mock/accessMatrix";
import { accessMatrix } from "../state-recoil";

const ApplicationRoute = () => {
  const [menuAccessMatrix, setAccessMatrix] = useRecoilState(accessMatrix);

  useEffect(() => {
    saveAccessMatrix();
  }, []);

  const saveAccessMatrix = () => {
    return setAccessMatrix(accessMatrixModel);
  };
  console.log("menuAccessMatrix:::", menuAccessMatrix);
};

export default ApplicationRoute;
