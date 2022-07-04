import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Dashboard } from "@modules/dashboard/Dashboard";

import withAuth from "@helpers/withAuth";

export default withAuth(Dashboard);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths({ locales }: any) {
  const pages = ["insurance", "loan", "archive"];

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
