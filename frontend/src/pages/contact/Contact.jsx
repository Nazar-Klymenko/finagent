import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useTitle from "@hooks/useTitle";

import { Input, Textarea } from "@components/input";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import { Mail, Point, Phone } from "@components/svgs";
import { ContentWrap } from "@components/content";
import { Header } from "@components/typography";

const Contact = () => {
  const { t } = useTranslation();
  useTitle("Contact | FinAgent");
  return (
    <ContentWrap fullWidth blank direction="column">
      <Header bottomGutter>{t("Contact.title")}</Header>
      <MainContainer>
        <FormSide>
          <ContactSubtitle>{t("Contact.subtitleForm")}</ContactSubtitle>
          <Form id="form">
            <Input
              labelName={t("Contact.Form.fullName")}
              // placeholder="Your full name"
            />
            <Input
              labelName={t("Contact.Form.email")}
              // placeholder="Your email"
            />
            <Textarea
              labelName={t("Contact.Form.message")}
              rows="8"
              // placeholder="Enter your message..."
            />
            <ButtonPlace>
              <CTA
                text={t("Contact.Form.submit")}
                form="form"
                color="primary"
              />
            </ButtonPlace>
          </Form>
        </FormSide>
        <InfoSide>
          <ContactSubtitle>{t("Contact.subtitleInfo")}</ContactSubtitle>
          <InfoWrap>
            <ContactInfo>
              <InfoIcon>
                <Mail />
              </InfoIcon>
              <Info>
                <span>finagent@gmail.com</span>
              </Info>
            </ContactInfo>
            <ContactInfo>
              <InfoIcon>
                <Point />
              </InfoIcon>
              <Info>
                <span>Ul. Kazimierza W. 8/1</span>
                <span>31-139 Krakow, Poland</span>
              </Info>
            </ContactInfo>
            <ContactInfo>
              <InfoIcon>
                <Phone />
              </InfoIcon>
              <Info>
                <a href="tel:+48 678 907 654">+48 678 907 654</a>
                <a href="tel:+48 678 907 654">+48 678 907 654</a>
              </Info>
            </ContactInfo>
          </InfoWrap>
        </InfoSide>
      </MainContainer>
    </ContentWrap>
  );
};
export default Contact;

const ContactSubtitle = styled.h3`
  text-align: left;
  padding-bottom: 1.5rem;
`;
const MainContainer = styled.div`
  display: flex;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    flex-direction: column-reverse;
  }
`;
const FormSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${({ theme }) => theme.lightGray};
  padding-right: 3.5rem;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding-right: 0rem;
    border-right: none;
  }
`;

const ButtonPlace = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InfoSide = styled.div`
  flex: 1;
  padding-left: 3.5rem;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding-left: 0rem;
  }
`;
const InfoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const ContactInfo = styled.div`
  display: flex;
  align-items: center;
`;
const InfoIcon = styled.div`
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.blue};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Info = styled.div`
  margin: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  a {
    color: ${({ theme }) => theme.black};
  }
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    margin: 1.5rem 1rem;
  }
`;
