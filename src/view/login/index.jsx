import React, { useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { login } from "./../../api/login";
import { useHistory } from "react-router-dom";
import { protextedPath } from "../../router";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const clickLogin = () => {
    console.log("Submit:::", username, password);
    const requestBody = {
      username: username,
      password: password,
    };
    login(requestBody)
      .then((res) => {
        console.log("res:::::::", res);

        console.log("res?.data?.authToken::::", res?.data?.authToken);

        let decodeData = decodeResponse(res?.data?.authToken)
        console.log("Login decodeData:::", decodeData);
        history.push(protextedPath.menu);
      })
      .catch((err) => console.log("err:", err));
  };
  function decodeResponse(param) {
    const decodeToString = CryptoJS.enc.Base64.parse(param).toString(CryptoJS.enc.Utf8)
    return jwtDecode(decodeToString)
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
