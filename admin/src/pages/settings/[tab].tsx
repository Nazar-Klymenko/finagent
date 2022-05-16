import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Settings } from "@modules/settings/Settings";

import withAuth from "@helpers/withAuth";

export default withAuth(Settings);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths({ locales }: any) {
  const pages = ["personal", "password", "delete"];

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
