import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Empty from "src/_devOnly/testPages/Empty";
import Staging from "src/_devOnly/testPages/Staging";

import { PrivateRoute, QuestRoute } from "@components/CustomRoutes";

import Contact from "@pages/Contact";
import Error404 from "@pages/Error404";
import VerifyEmailPage from "@pages/VerifyEmailPage";
import ForgotPassword from "@pages/authActions/ForgotPassword";
import Dashboard from "@pages/dashboard/Dashboard";
import Help from "@pages/help/Help";
import Login from "@pages/login/Login";
import Notifications from "@pages/notifications/Notifications";
import NotificationsOpen from "@pages/notifications/NotificationsOpen";
import {
  Page1_Insurance_Border,
  Page2_Insurance_Border,
  Page3_Insurance_Border,
  Summary_Insurance_Border,
} from "@pages/questionnaires/insurance-border";
import {
  Page1_Insurance_Estate,
  Page2_Insurance_Estate,
  Summary_Insurance_Estate,
} from "@pages/questionnaires/insurance-estate";
import {
  Page1_Insurance_Health,
  Page2_Insurance_Health,
  Summary_Insurance_Health,
} from "@pages/questionnaires/insurance-health";
import {
  Page1_Insurance_Specialist,
  Page2_Insurance_Specialist,
  Summary_Insurance_Specialist,
} from "@pages/questionnaires/insurance-specialist";
import {
  Page1_Insurance_Car,
  Page2_Insurance_Car,
  Page3_Insurance_Car,
  Page4_Insurance_Car,
  Page5_Insurance_Car,
  Summary_Insurance_Car,
} from "@pages/questionnaires/insurance-transport";
import {
  Page1_Insurance_Travel,
  Page2_Insurance_Travel,
  Summary_Insurance_Travel,
} from "@pages/questionnaires/insurance-travel";
import {
  Page1_Cash,
  Page2_Cash,
  Page3_Cash,
  Summary_Cash,
} from "@pages/questionnaires/loan-cash";
import {
  Page1_Mortgage,
  Page2_Mortgage,
  Summary_Mortgage,
} from "@pages/questionnaires/loan-mortgage";
import Services from "@pages/services/Services";
import Settings from "@pages/settings/Settings";
import SignUp from "@pages/signUp/SignUp";

const Routes = () => (
  <Switch>
    <Route
      path="/"
      exact
      render={(props) => <Redirect to="/dashboard/insurances/ready/1" />}
    />

    <Route path="/empty" exact component={Empty} />
    <Route path="/staging" exact component={Staging} />

    <PrivateRoute path="/dashboard" component={Dashboard} />
    <Route path="/services" exact component={Services} />
    <Route path="/contact" exact component={Contact} />
    <Route path="/help" exact component={Help} />
    <PrivateRoute path="/notifications" exact component={Notifications} />
    <PrivateRoute path="/notifications/:id" component={NotificationsOpen} />
    <PrivateRoute path="/settings" component={Settings} />
    <Route path="/auth/login" exact component={Login} />
    <Route path="/auth/signup" exact component={SignUp} />
    <Route path="/auth/forgot-password" exact component={ForgotPassword} />
    <Route path="/verify-email" exact component={VerifyEmailPage} />

    <QuestRoute
      path="/quest/transport/1"
      exact
      component={Page1_Insurance_Car}
    />
    <QuestRoute
      path="/quest/transport/2"
      exact
      component={Page2_Insurance_Car}
    />
    <QuestRoute
      path="/quest/transport/3"
      exact
      component={Page3_Insurance_Car}
    />
    <QuestRoute
      path="/quest/transport/4"
      exact
      component={Page4_Insurance_Car}
    />
    <QuestRoute
      path="/quest/transport/5"
      exact
      component={Page5_Insurance_Car}
    />
    <QuestRoute
      path="/quest/transport/summary"
      exact
      component={Summary_Insurance_Car}
    />

    <QuestRoute
      path="/quest/transport-border/1"
      exact
      component={Page1_Insurance_Border}
    />
    <QuestRoute
      path="/quest/transport-border/2"
      exact
      component={Page2_Insurance_Border}
    />
    <QuestRoute
      path="/quest/transport-border/3"
      exact
      component={Page3_Insurance_Border}
    />
    <QuestRoute
      path="/quest/transport-border/summary"
      exact
      component={Summary_Insurance_Border}
    />

    <QuestRoute
      path="/quest/reimbursement/1"
      exact
      component={Page1_Insurance_Health}
    />
    <QuestRoute
      path="/quest/reimbursement/2"
      exact
      component={Page2_Insurance_Health}
    />
    <QuestRoute
      path="/quest/reimbursement/summary"
      exact
      component={Summary_Insurance_Health}
    />

    <QuestRoute
      path="/quest/diagnostic/1"
      exact
      component={Page1_Insurance_Specialist}
    />
    <QuestRoute
      path="/quest/diagnostic/2"
      exact
      component={Page2_Insurance_Specialist}
    />
    <QuestRoute
      path="/quest/diagnostic/summary"
      exact
      component={Summary_Insurance_Specialist}
    />

    <QuestRoute
      path="/quest/travel/1"
      exact
      component={Page1_Insurance_Travel}
    />
    <QuestRoute
      path="/quest/travel/2"
      exact
      component={Page2_Insurance_Travel}
    />
    <QuestRoute
      path="/quest/travel/summary"
      exact
      component={Summary_Insurance_Travel}
    />

    <QuestRoute
      path="/quest/estate/1"
      exact
      component={Page1_Insurance_Estate}
    />
    <QuestRoute
      path="/quest/estate/2"
      exact
      component={Page2_Insurance_Estate}
    />
    <QuestRoute
      path="/quest/estate/summary"
      exact
      component={Summary_Insurance_Estate}
    />

    <QuestRoute path="/quest/cashloan/1" exact component={Page1_Cash} />
    <QuestRoute path="/quest/cashloan/2" exact component={Page2_Cash} />
    <QuestRoute path="/quest/cashloan/3" exact component={Page3_Cash} />
    <QuestRoute path="/quest/cashloan/summary" exact component={Summary_Cash} />

    <QuestRoute path="/quest/mortgage/1" exact component={Page1_Mortgage} />
    <QuestRoute path="/quest/mortgage/2" exact component={Page2_Mortgage} />
    <QuestRoute
      path="/quest/mortgage/summary"
      exact
      component={Summary_Mortgage}
    />
    <Route component={Error404} />
  </Switch>
);
export default Routes;
