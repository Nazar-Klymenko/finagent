import { AuthRoute, PrivateRoute } from "../components/CustomRoutes";
import { Route, Switch, Redirect } from "react-router-dom";

import Welcome from "../pages/welcome";

import {
  ApplicationsToggle,
  AllApplications,
  TakenApplications,
} from "../pages/applications";

import ApplicationOpen from "../pages/applicationOpen";
import Clients from "../pages/clients";
import ClientOpen from "../pages/clientOpen";
import MyApplications from "../pages/myApplications";
import { History, HistoryAll, HistoryToggle } from "../pages/history";
import Archive from "../pages/archive";

import {
  OperatorsToggle,
  AllOperators,
  AcceptOperators,
} from "../pages/operators";

import Login from "../pages/login";
import SignUp from "../pages/signUp";
import ForgotPassword from "../pages/forgotPassword";

import Settings from "../pages/settings/Settings";

import BufferPage from "../pages/bufferPage";
import Error404 from "../pages/error404";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Welcome} />

    <Route
      path="/applications"
      exact
      render={(props) => <Redirect to="/applications/all" />}
    />
    <PrivateRoute path="/applications/all" component={AllApplications} />
    <PrivateRoute path="/applications/taken" component={TakenApplications} />
    <PrivateRoute
      path="/applications/:id"
      exact
      component={() => <ApplicationOpen returnTo="/applications/all" />}
    />

    <PrivateRoute exact path="/clients" component={Clients} />
    <PrivateRoute path="/clients/:id" component={ClientOpen} />
    <PrivateRoute exact path="/my-applications" component={MyApplications} />
    <PrivateRoute
      path="/my-applications/:id"
      component={() => <ApplicationOpen returnTo="/my-applications/" />}
    />

    <Route
      path="/history"
      exact
      render={(props) => <Redirect to="/history/operator-only/1" />}
    />
    <Route
      path="/history/operator-only/"
      exact
      render={(props) => <Redirect to="/history/operator-only/1" />}
    />
    <PrivateRoute path="/history/operator-only/:page" component={History} />

    <Route
      path="/history/supervisor-only/"
      exact
      render={(props) => <Redirect to="/history/supervisor-only/1" />}
    />
    <PrivateRoute
      path="/history/supervisor-only/:page"
      component={HistoryAll}
    />

    <PrivateRoute path="/archive" component={Archive} />

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
