import {
  getAllLanguageSlugs,
  getAllLanguageSlugsExtended,
  getLanguage,
} from "@lib/i18n";
import { Settings } from "@modules/settings/Settings";

import withAuth from "@helpers/withAuth";

export default withAuth(Settings);

export async function getStaticPaths() {
  const paths = getAllLanguageSlugsExtended();
  const pages = ["personal", "password", "delete"];

  return {
    paths: paths
      .map((locale: any) => {
        return pages?.map((page) => {
          return { params: { lang: locale, tab: page } };
        });
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
//   const pages = ["personal", "password", "delete"];
//   const locales = getAllLanguageSlugs();

//   return {
//     paths: locales
//       .map((locale: any) => {
//         return pages?.map((page) => {
//           return { params: { tab: page }, locale };
//         });
//       })
//       .flat(),
//     fallback: false,
//   };
// }
