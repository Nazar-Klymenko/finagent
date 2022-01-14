import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SignUp from "@modules/auth/sign-up";

export default SignUp;
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
