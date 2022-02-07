import React from "react";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";

import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { submitTicket } from "@api/applications";

import Form from "@components/Form";
import { Button } from "@components/buttons";
import { Input, Textarea } from "@components/input";
import { PageContainer } from "@components/layout";

type FormData = {
  fullName: string;
  email: string;
  message: string;
};

const Contact: NextPage = () => {
  const { t } = useTranslation();

  const methods = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  const formSubmit = handleSubmit(async (data) => {
    try {
      await submitTicket(data);
      // dispatch(setSnackbar("success", "Submitted succesfully"));
      alert("success");
      reset({ fullName: "", email: "", message: "" });
    } catch (error) {
      alert("error");
      // dispatch(setSnackbar("error", "Error submitting"));
    }
  });

  return (
    <PageContainer title="Pages.contact">
      <Typography variant="h3" gutterBottom>
        {t("Contact.title")}
      </Typography>
      <MainContainer>
        <FormSide>
          <ContactSubtitle>{t("Contact.subtitleForm")}</ContactSubtitle>
          <Form methods={methods} id="form" onSubmit={formSubmit}>
            <Input labelName={t("Contact.Form.fullName")} name="fullName" />
            <Input labelName={t("Contact.Form.email")} name="email" />
            <Textarea
              labelName={t("Contact.Form.message")}
              rows={8}
              name="message"
            />
            <ButtonPlace>
              <Button form="form" color="primary">
                {t("Contact.Form.submit")}
              </Button>
            </ButtonPlace>
          </Form>
        </FormSide>
        <InfoSide>
          <ContactSubtitle>{t("Contact.subtitleInfo")}</ContactSubtitle>
          <InfoWrap>
            <ContactInfo>
              <InfoIcon>
                <EmailIcon />
              </InfoIcon>
              <Info>
                <span>contact@finagent.eu</span>
              </Info>
            </ContactInfo>
            <ContactInfo>
              <InfoIcon>
                <LocationOnIcon color="inherit" />
              </InfoIcon>
              <Info>
                <span>Kochanowskiego 19/4</span>
                <span>31-127 Kraków</span>
              </Info>
            </ContactInfo>
            <ContactInfo>
              <InfoIcon>
                <PhoneIcon />
              </InfoIcon>
              <Info>
                <a href="tel:+48531937973">+48 531 937 973</a>
                <a href="tel:+48574233922">+48 574 233 922</a>
              </Info>
            </ContactInfo>
          </InfoWrap>
        </InfoSide>
      </MainContainer>
    </PageContainer>
  );
};

export default Contact;

const schema = yup.object().shape({
  fullName: yup.string().required("lala"),
  email: yup.string().required("lala"),
  message: yup.string().required("lala"),
});

const ContactSubtitle = styled("h3")`
  text-align: left;
  padding-bottom: 1.5rem;
`;
const MainContainer = styled("div")`
  display: flex;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column-reverse;
  }
`;
const FormSide = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${({ theme }) => theme.palette.divider};
  padding-right: 3.5rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding-right: 0rem;
    border-right: none;
  }
`;

const ButtonPlace = styled("div")`
  display: flex;
  justify-content: flex-end;
`;
const InfoSide = styled("div")`
  flex: 1;
  padding-left: 3.5rem;
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding-left: 0rem;
  }
`;
const InfoWrap = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const ContactInfo = styled("div")`
  display: flex;
  align-items: center;
`;
const InfoIcon = styled("div")`
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const Info = styled("div")`
  margin: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  a {
    color: ${({ theme }) => theme.palette.common.black};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin: 1.5rem 1rem;
  }
`;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
