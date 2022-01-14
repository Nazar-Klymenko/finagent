import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ForgotPassword from "@modules/auth/sign-up";

export default ForgotPassword;
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
