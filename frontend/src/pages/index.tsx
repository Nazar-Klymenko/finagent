import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAuth } from "@context/authContext";

import { BackArrow } from "@components/buttons";

const Home: NextPage = () => {
  const { loginFacebook } = useAuth();

  return (
    <>
      <div onClick={loginFacebook}>Test</div>

      <BackArrow></BackArrow>
    </>
  );
};

export default Home;
