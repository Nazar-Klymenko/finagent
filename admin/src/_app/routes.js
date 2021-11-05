import { PrivateRoute } from "../components/CustomRoutes";
import { Route, Switch, Redirect } from "react-router-dom";

import Welcome from "../pages/welcome";

import { Applications } from "../pages/applications";

import ApplicationOpen from "../pages/applicationOpen";
import Clients from "../pages/clients";
import ClientOpen from "../pages/clientOpen";
import MyApplications from "../pages/myApplications";
import { History } from "../pages/history";
import Archive from "../pages/archive";

import { AllOperators, AcceptOperators } from "../pages/operators";

import Login from "../pages/login";
import SignUp from "../pages/signUp";
import ForgotPassword from "../pages/forgotPassword";

import Settings from "../pages/settings/Settings";

import BufferPage from "../pages/bufferPage";
import Error404 from "../pages/error404";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Welcome} />
    <PrivateRoute
      path="/applications/open/:id"
      exact
      component={() => <ApplicationOpen returnTo="/applications/all" />}
    />
    <PrivateRoute
      path="/applications/my-applications/:page"
      exact
      component={MyApplications}
    />
    <PrivateRoute
      path="/applications/archived/:page"
      exact
      component={Archive}
    />

    <PrivateRoute path="/applications/:status/:page" component={Applications} />
    <PrivateRoute path="/clients/all/:page" component={Clients} />
    <PrivateRoute path="/clients/open/:id" component={ClientOpen} />
    <PrivateRoute path="/history/:status/:page" component={History} />
    <Route
      path="/operators"
      exact
      render={(props) => <Redirect to="/operators/all" />}
    />
    <PrivateRoute path={`/operators/all`} component={AllOperators} />
    <PrivateRoute
      path={`/operators/accepting`}
      exact
      component={AcceptOperators}
    />
    <PrivateRoute path="/settings" component={Settings} />
    <Route path="/auth/login" exact component={Login} />
    <Route path="/auth/signup" exact component={SignUp} />
    <Route path="/buffer" exact component={BufferPage} />
    {/* <Route path="*" component={Error404} /> */}
  </Switch>
);
export default Routes;
