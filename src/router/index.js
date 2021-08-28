import React, { Suspense } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../view/login";
import Profile from "../view/profile";

export const protextedPath = {
    home: '/',
    login: '/login',
    profile: '/profile'
}
export const AppRouter = () => {

    return (
        <Suspense fallback={<div>Loading.....</div>}>
            <HashRouter>
                <Switch>
                    <Route exact path={protextedPath.home} component={() => <Redirect to={protextedPath.login} />} />
                    <Route path={protextedPath.login} component={LoginPage} />
                    <Route path={protextedPath.profile} component={Profile} />
                </Switch>
            </HashRouter>
        </Suspense>
    );
}