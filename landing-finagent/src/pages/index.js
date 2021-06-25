import Landing from "@pages/landing/Landing";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LandingPage = () => <Landing />;

export default LandingPage;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});
