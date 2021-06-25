import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

import useTitle from "@hooks/useTitle";

import { Input, Textarea } from "@components/input";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import { Mail, Point, Phone } from "@components/svgs";

const Contact = () => {
  const { t } = useTranslation();
  useTitle("Contact | FinAgent");
  return (
    <ContactStyled>
      <ContactTitle>{t("Contact.title")}</ContactTitle>
      <MainContainer>
        <FormSide>
          <ContactSubtitle>{t("Contact.subtitleForm")}</ContactSubtitle>
          <FormWrap>
            <ContactForm>
              <Form id="form">
                <Input
                  labelName={t("Contact.Form.fullName")}
                  placeholder="Your full name"
                />
                <Input
                  labelName={t("Contact.Form.email")}
                  placeholder="Your email"
                />
                <Textarea
                  labelName={t("Contact.Form.message")}
                  rows="8"
                  placeholder="Enter your message..."
                />
                <ButtonPlace>
                  <CTA text={t("Contact.Form.submit")} form="form" />
                </ButtonPlace>
              </Form>
            </ContactForm>
          </FormWrap>
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
    </ContactStyled>
  );
};
export default Contact;

const ContactStyled = styled.div`
  flex: 1;
  height: 100%;
  background-color: $White;
  padding: 1rem;
`;
const ContactTitle = styled.h1`
  margin-top: 3rem;
  width: 100%;
  text-align: center;
`;
const ContactSubtitle = styled.h3`
  text-align: center;
`;
const MainContainer = styled.div`
  display: flex;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    flex-direction: column-reverse;
  }
`;
const FormSide = styled.div`
  padding: 1rem 1rem;
  flex: 1;
`;
const FormWrap = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 70px;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding: unset;
  }
`;
const ContactForm = styled.div`
  width: 80%;
  margin-bottom: 2rem;
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    width: 100%;
  }
`;
const ButtonPlace = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InfoSide = styled.div`
  flex: 1;
  padding: 1rem 1rem;
`;
const InfoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding: unset;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const ContactInfo = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    width: 45%;
  }
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    width: 90%;
  }
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
