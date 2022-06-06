import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Typography } from "@mui/material";

import withAuth from "@helpers/withAuth";

const Notifications: NextPage = () => {
  return (
    <Typography variant="h4" textAlign="center">
      Notifications
    </Typography>
  );
};

export default withAuth(Notifications);
