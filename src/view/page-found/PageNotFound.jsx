import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router";
import { protextedPath } from "../../router";

const PageNotFound = () => {
  const history = useHistory();
  const goLogin = () => {
    history.push(protextedPath.login);
  };
  return (
    <div>
      <h3>Page Not Found</h3>
      <Button onClick={goLogin}>Go to Login</Button>
    </div>
  );
};

export default PageNotFound;
