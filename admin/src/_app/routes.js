import { Redirect, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "../components/CustomRoutes";
import ApplicationOpen from "../pages/applicationOpen";
import { Applications } from "../pages/applications";
import Archive from "../pages/archive";
import BufferPage from "../pages/bufferPage";
import ClientOpen from "../pages/clientOpen";
import Clients from "../pages/clients";
import Error404 from "../pages/error404";
import ForgotPassword from "../pages/forgotPassword";
import { History } from "../pages/history";
import Login from "../pages/login";
import MyApplications from "../pages/myApplications";
import { AcceptOperators, AllOperators } from "../pages/operators";
import Settings from "../pages/settings/Settings";
import SignUp from "../pages/signUp";
import Tickets from "../pages/tickets/Tickets";
import Welcome from "../pages/welcome";

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
    <PrivateRoute path="/tickets/all/:page" component={Tickets} />
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
