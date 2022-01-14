import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useAuth } from "@context/authContext";

import { BackArrow } from "@components/buttons";

const Home: NextPage = (props) => {
  return (
    <Test>
      <Typography variant="h3" component={"h3"} align="center">
        Test with no wrap
      </Typography>
    </Test>
  );
};

const Test = styled("div")`
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export default Home;
