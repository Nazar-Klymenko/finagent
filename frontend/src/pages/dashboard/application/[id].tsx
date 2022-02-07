import { useEffect } from "react";

import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";
import withAuth from "@helpers/withAuth";

import { getAllAplications } from "@api/applications";

import { useAuth } from "@context/authContext";

import Application from "@components/application/Application";
import { SideNav, Tabs } from "@components/dashboard";
import { PageContainer } from "@components/layout";

const OpenApplication: NextPage = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();
  const { id } = router.query;

  return (
    <PageContainer title="Dashboard.title" dashboard>
      <DashboardInner>
        {md ? <Tabs /> : <SideNav />}
        <Application id={id} />
      </DashboardInner>
    </PageContainer>
  );
};

const DashboardInner = styled("div")`
  display: flex;
  min-height: 100%;
  flex: 1;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;

export default withAuth(OpenApplication);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths({ locales, query }: any) {
  return {
    paths: locales
      .map((locale: any) => {
        return { params: { id: "null" }, locale };
      })
      .flat(),
    fallback: "blocking",
  };
}
