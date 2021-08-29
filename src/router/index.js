import React, { Suspense } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import LeftMenu from "../component/left-menu";
import LoginPage from "../view/login";
import PageNotFound from "../view/page-found/PageNotFound";
import Profile from "../view/profile";

export const protextedPath = {
  initPath: "/",
  login: "/login",
  profile: "/profile",
  menu: "/menu",
  notFound: "/404",
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
          <Route path={protextedPath.menu} component={LeftMenu} />
          <Route path={protextedPath.profile} component={Profile} />
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
