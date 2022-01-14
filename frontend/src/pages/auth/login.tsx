import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LogIn from "@modules/auth/sign-up";

export default LogIn;
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
