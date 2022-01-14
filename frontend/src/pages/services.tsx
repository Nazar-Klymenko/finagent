import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Services from "@modules/services/Services";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Services;
