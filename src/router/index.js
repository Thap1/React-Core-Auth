import React, { Suspense } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../view/login";
import PageNotFound from "../view/page-found/PageNotFound";
import ApplicationRoute from "./ApplicationRoute";

export const protextedPath = {
  initPath: "/",
  login: "/login",
  notFound: "/404",
};
export const pathContent = {
  dashboard: "/dashboard",
  branch: "/branches",
  merchantQR: "/merchantQR",
  task: "/tasks",
  setting: "/settings",
};
export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <HashRouter>
        <Switch>
          <Route
            exact
            path={protextedPath.initPath}
            component={() => <Redirect to={protextedPath.login} />}
          />
          <Route path={protextedPath.login} component={LoginPage} />
          <ApplicationRoute />
          <Route path={protextedPath.notFound} component={PageNotFound} />
          <Route
            exact
            path='*'
            component={() => <Redirect to={protextedPath.notFound} />}
          />
        </Switch>
      </HashRouter>
    </Suspense>
  );
};
