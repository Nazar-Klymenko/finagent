import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";

import Head from "next/head";
import { Mail, Point, Phone } from "@components/svgs";

const Contact = () => {
  const { t } = useTranslation();
  return null;
};
export default Contact;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});
