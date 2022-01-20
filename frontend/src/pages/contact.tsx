import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useAuth } from "@context/authContext";

import { PageContainer } from "@components/layout";

const Contact: NextPage = () => {
  return <PageContainer title="Pages.contact">Contact</PageContainer>;
};

export default Contact;
