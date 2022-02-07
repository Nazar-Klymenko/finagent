import { useEffect } from "react";

import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";

import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";
import withAuth from "@helpers/withAuth";

import { getAllAplications } from "@api/applications";

import { useAuth } from "@context/authContext";

import { Dashboard, SideNav, Tabs } from "@components/dashboard";
import { PageContainer } from "@components/layout";

const DashboardTab: NextPage = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <PageContainer title="Dashboard.title" dashboard>
      <DashboardInner>
        {md ? <Tabs /> : <SideNav />}
        <Dashboard />
      </DashboardInner>
    </PageContainer>
  );
};

export default withAuth(DashboardTab);

const DashboardInner = styled("div")`
  display: flex;
  min-height: 100%;
  flex: 1;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths({ locales }: any) {
  const pages = ["insurances", "loans", "history"];

  return {
    paths: locales
      .map((locale: any) => {
        return pages?.map((page) => {
          return { params: { tab: page }, locale };
        });
      })
      .flat(),
    fallback: false,
  };
}
