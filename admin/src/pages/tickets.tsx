import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useAuth } from "@context/authContext";

import { BackArrow } from "@components/buttons";
import { PageContainer } from "@components/layout";

const Tickets: NextPage = (props) => {
  return (
    <PageContainer title="test">
      <Typography variant="h3" component={"h3"}>
        Tickets
      </Typography>
    </PageContainer>
  );
};

export default Tickets;