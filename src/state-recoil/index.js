import { atom } from "recoil";
import { getToken, getUserInfo } from "../utils/sesstion-storage";

export const accessMatrix = atom({
  key: "accessMatrixModel",
  default: {},
});

export const authenticated = atom({
  key: "AUTHENTICATION",
  default: {
    isAuthentication: !!getToken(),
    userInfo: getUserInfo() ?? {},
  },
});
