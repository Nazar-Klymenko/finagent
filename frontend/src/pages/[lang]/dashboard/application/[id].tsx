import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Application from "@modules/application/Application";

import withAuth from "@helpers/withAuth";

export default withAuth(Application);

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
