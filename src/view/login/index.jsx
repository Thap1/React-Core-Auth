import React, { useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { login } from "./../../api/login";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { pathContent } from "../../router";
import CryptoJS from "crypto-js";
import { setAuth } from "../../utils/sesstion-storage";
import { authenticated } from "../../state-recoil";
import { useRecoilState } from "recoil";

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [, setAuthRecoil] = useRecoilState(authenticated);

  const clickLogin = () => {
    const requestBody = {
      username: username,
      password: password,
    };
    login(requestBody)
      .then((res) => {
        let userInfo = {};
        try {
          let decodeData = decodeResponse(res?.data?.authToken);
          if (decodeData) {
            userInfo = {
              ...res?.data,
              roleName: decodeData.resource_access["spring-boot"].roles[0],
              fullName: decodeData.name,
            };
            setAuth({ userInfo });
            setAuthRecoil({
              isAuthentication: true,
              userInfo: userInfo,
            });
          }
        } catch (error) {
          console.log("error: ", error);
        }
        history.push(pathContent.dashboard);
      })
      .catch((err) => console.log("errLogin:", err));
  };
  function decodeResponse(param) {
    const decodeToString = CryptoJS.enc.Base64.parse(param).toString(
      CryptoJS.enc.Utf8
    );
    return jwtDecode(decodeToString);
  }
  return (
    <div className=''>
      <h2>Login Form</h2>
      <Input
        type='text'
        placeholder='Username'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={clickLogin}>Login</Button>
    </div>
  );
};
export default LoginPage;
