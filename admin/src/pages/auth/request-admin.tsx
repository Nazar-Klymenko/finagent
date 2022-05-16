import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useAuth } from "@context/authContext";

import { Button } from "@components/buttons";
import { PageContainer } from "@components/layout";

const Approval: NextPage = (props) => {
  const { currentUser } = useAuth(),
    { isLoggedIn, isSendingRequest } = currentUser;
  return (
    <PageContainer title="Request Admin">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" component={"h3"} gutterBottom>
          Request admin privileges
        </Typography>
        <Button
          form=""
          color="primary"
          size="large"
          sx={{ maxWidth: "max-content" }}
        >
          Request
        </Button>
      </Box>
    </PageContainer>
  );
};

export default Approval;
