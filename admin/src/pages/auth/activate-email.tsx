import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useAuth } from "@context/authContext";

import { BackArrow } from "@components/buttons";
import { PageContainer } from "@components/layout";

const ActivateEmail: NextPage = (props) => {
  return (
    <PageContainer title="Common.Pages.activate">
      <Typography variant="h4" component={"h3"}>
        Activate email
      </Typography>
    </PageContainer>
  );
};

export default ActivateEmail;
