import { useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth } from "@context/authContext";

import { Loader } from "@components/Loader";

const withAuth = (Component: NextPage) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { currentUser } = useAuth();
    const {
      isLoggedIn,
      isSendingRequest,
      isActive,
      isApproved,
      isAdmin,
      isAwaitingApproval,
      isRejected,
    } = currentUser;

    if (isSendingRequest) {
      return <Loader />;
    }

    if (!isSendingRequest) {
      if (isLoggedIn) {
        if (isRejected) {
          router.push("/auth/not-allowed");
          return null;
        }
        if (!isActive) {
          router.push("/auth/activate-email");
          return null;
        }
        if (!isAdmin && !isAwaitingApproval) {
          router.push("/auth/request-admin");
          return null;
        }
        if (isActive && !isApproved) {
          router.push("/auth/approval");
          return null;
        }

        return <Component {...props} />;
      } else {
        router.push("/auth/login");
        return null;
      }
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
