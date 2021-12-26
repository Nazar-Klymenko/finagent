import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { submitTicket } from "@api/applications";

import useTitle from "@hooks/useTitle";

import { setSnackbar } from "@redux/alert/actions";

import Form from "@components/Form";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { MuiInput, Textarea } from "@components/input";
import { Mail, Phone, Point } from "@components/svgs";

const schema = yup.object().shape({
  fullName: yup.string().required("lala"),
  email: yup.string().required("lala"),
  message: yup.string().required("lala"),
});

type FormData = {
  fullName: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { t } = useTranslation();
  useTitle("Contact | FinAgent");

  const dispatch = useDispatch();

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
      dispatch(setSnackbar("success", "Submitted succesfully"));
      reset({ fullName: "", email: "", message: "" });
    } catch (error) {
      dispatch(setSnackbar("error", "Error submitting"));
    }
  });

  return (
    <ContentWrap direction="column">
      <Typography variant="h3" gutterBottom>
        {t("Contact.title")}
      </Typography>
      <MainContainer>
        <FormSide>
          <Typography variant="h6">{t("Contact.subtitleForm")}</Typography>
          <Form methods={methods} id="form" onSubmit={formSubmit}>
            <MuiInput labelName={t("Contact.Form.fullName")} name="fullName" />
            <MuiInput labelName={t("Contact.Form.email")} name="email" />
            <Textarea
              labelName={t("Contact.Form.message")}
              rows={8}
              name="message"
            />
            <ButtonPlace>
              <MuiButton
                text={t("Contact.Form.submit")}
                form="form"
                color="primary"
              />
            </ButtonPlace>
          </Form>
        </FormSide>
        <InfoSide>
          <Typography variant="h6">{t("Contact.subtitleInfo")}</Typography>
          <InfoWrap>
            <ContactInfo>
              <InfoIcon>
                <Mail />
              </InfoIcon>
              <Info>
                <span>contact@finagent.eu</span>
              </Info>
            </ContactInfo>
            <ContactInfo>
              <InfoIcon>
                <Point />
              </InfoIcon>
              <Info>
                <span>Kochanowskiego 19/4</span>
                <span>31-127 Kraków</span>
              </Info>
            </ContactInfo>
            <ContactInfo>
              <InfoIcon>
                <Phone />
              </InfoIcon>
              <Info>
                <a href="tel:+48531937973">+48 531 937 973</a>
                <a href="tel:+48574233922">+48 574 233 922</a>
              </Info>
            </ContactInfo>
          </InfoWrap>
        </InfoSide>
      </MainContainer>
    </ContentWrap>
  );
};
export default Contact;

const MainContainer = styled("div")`
  display: flex;
  @media all and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
    flex-direction: column-reverse;
  }
`;
const FormSide = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${({ theme }) => theme.palette.grey[400]};
  padding-right: 3.5rem;
  @media all and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
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
  @media all and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
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
`;
const Info = styled("div")`
  margin: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  a {
    color: ${({ theme }) => theme.palette.common.black};
  }
  @media all and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
    margin: 1.5rem 1rem;
  }
`;
