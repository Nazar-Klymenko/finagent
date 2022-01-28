import { useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth } from "@context/authContext";
import { useData } from "@context/dataContext";

import Loader from "@components/Loader";

const withAuthForm = (Component: NextPage) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { currentUser } = useAuth();
    const { isLoggedIn, isSendingRequest, isActive } = currentUser;

    //@ts-ignore
    const { currentPage, allowSummary } = useData();

    let currentLocation = router.pathname;
    let urlParted = currentLocation.split("/");
    //@ts-ignore
    let pageIndex = parseInt(urlParted.pop() || urlParted.pop());
    // localStorage.setItem("onSignIn", "false");

    if (isSendingRequest) {
      return <Loader />;
    }

    if (!isSendingRequest) {
      if (!isLoggedIn) {
        router.push("/auth/login");
        return null;
      }

      if (!isActive) {
        router.push("/auth/activate-email");
        return null;
      }

      if (pageIndex < currentPage) {
        return <Component {...props} />;
      } else if (pageIndex === currentPage) {
        return <Component {...props} />;
      } else if (allowSummary) {
        return <Component {...props} />;
      } else {
        router.push(`./${currentPage}`);
        return null;
      }
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuthForm;
