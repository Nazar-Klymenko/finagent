import {
  getAllLanguageSlugs,
  getAllLanguageSlugsExtended,
  getLanguage,
} from "@lib/i18n";
import Application from "@modules/application/Application";

import withAuth from "@helpers/withAuth";

export default withAuth(Application);

export async function getStaticPaths() {
  const paths = getAllLanguageSlugsExtended();
  return {
    paths: paths
      .map((locale: any) => {
        return { params: { lang: locale, id: "null" } };
      })
      .flat(),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}

// export async function getStaticPaths() {
//   const locales = getAllLanguageSlugs();

//   return {
//     paths: locales
//       .map((locale: any) => {
//         return { params: { id: "null" }, locale };
//       })
//       .flat(),
//     fallback: "blocking",
//   };
// }
