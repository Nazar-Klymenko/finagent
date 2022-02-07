import { useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import withAuth from "@helpers/withAuth";

import { getAllAplications } from "@api/applications";

import { useAuth } from "@context/authContext";

import SideNav from "@components/dashboard/SideNav";
import { PageContainer } from "@components/layout";

const Dashboard: NextPage = () => {
  return (
    <PageContainer title="Dashboard">
      <SideNav></SideNav>
      Dashboard
    </PageContainer>
  );
};

export default withAuth(Dashboard);
