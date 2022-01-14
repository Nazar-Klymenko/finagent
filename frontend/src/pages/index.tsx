import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Typography from "@mui/material/Typography";

import { useAuth } from "@context/authContext";

import { BackArrow } from "@components/buttons";

const Home: NextPage = () => {
  return (
    <>
      <Typography variant="h3"> Test with no wrap</Typography>
    </>
  );
};

export default Home;
