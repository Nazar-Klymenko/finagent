import React from "react";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { Checkmark } from "@components/svgs/Svgs";

type Props = {
  currentStep: string;
};
type Styled = {
  addedClass: any;
};

const ApplicationStatus: React.FC<Props> = ({ currentStep }) => {
  const { t } = useTranslation();
  const stepCounter = parseInt(currentStep);

  const checkClass = (step: number) => {
    if (stepCounter === step) {
      return "current";
    } else if (stepCounter > step) {
      return "finished";
    } else {
      return;
    }
  };

  return (
    <ApplicationStatusStyled>
      <Step addedClass={checkClass(0)}>
        <Number addedClass={checkClass(0)}>1</Number>
        <Subheader addedClass={checkClass(0)}>
          {t("ApplicationOpen.StatusIndex.status1")}
        </Subheader>
        <CheckmarkWrap addedClass={checkClass(0)}>
          <Checkmark />
        </CheckmarkWrap>
      </Step>
      <Step addedClass={checkClass(1)}>
        <Number addedClass={checkClass(1)}>2</Number>
        <Subheader addedClass={checkClass(1)}>
          {t("ApplicationOpen.StatusIndex.status2")}
        </Subheader>
        <CheckmarkWrap addedClass={checkClass(1)}>
          <Checkmark />
        </CheckmarkWrap>
      </Step>
      <Step addedClass={checkClass(2)}>
        <Number addedClass={checkClass(2)}>3</Number>
        <Subheader addedClass={checkClass(2)}>
          {t("ApplicationOpen.StatusIndex.status3")}
        </Subheader>
        <CheckmarkWrap addedClass={checkClass(2)}>
          <Checkmark />
        </CheckmarkWrap>
      </Step>
      <Step addedClass={checkClass(3)}>
        <Number addedClass={checkClass(3)}>4</Number>
        <Subheader addedClass={checkClass(3)}>
          {t("ApplicationOpen.StatusIndex.status4")}
        </Subheader>
        <CheckmarkWrap addedClass={checkClass(3)}>
          <Checkmark />
        </CheckmarkWrap>
      </Step>
    </ApplicationStatusStyled>
  );
};
const ApplicationStatusStyled = styled("div")`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;
const Step = styled("div")<Styled>`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  &:last-of-type {
    border-bottom: none;
  }
`;

const CheckmarkWrap = styled("div")<Styled>`
  opacity: ${({ addedClass }) => (addedClass === "finished" ? 1 : 0)};
`;

const Number = styled("div")<Styled>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.palette.divider};
  color: ${({ theme }) => theme.palette.grey[400]};
  border-radius: 999px;
  width: 2.2rem;
  height: 2.2rem;

  ${({ addedClass }) =>
    addedClass === "current" &&
    `
      border: 2px solid ${({ theme }: any) => theme.palette.primary.main};
      color: ${({ theme }: any) => theme.palette.primary.main};
    `}
  ${({ addedClass }) =>
    addedClass === "finished" &&
    `
      border: 2px solid ${({ theme }: any) => theme.palette.primary.main};
      background: ${({ theme }: any) => theme.palette.primary.main};
      color: white;
      border: 2px solid ${({ theme }: any) => theme.palette.primary.main};
    `}

    @media screen and (max-width:${({ theme }) =>
    theme.breakpoints.values.sm}) {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const Subheader = styled("div")<Styled>`
  color: ${({ theme }) => theme.palette.grey[400]};
  flex: 1;
  padding-left: 1rem;

  ${({ addedClass }) =>
    addedClass === "current" &&
    `
      color: ${({ theme }: any) => theme.palette.common.black};
    `}
  ${({ addedClass }) =>
    addedClass === "finished" &&
    `
      color: ${({ theme }: any) => theme.palette.grey[300]};
    `}

    @media screen and (max-width:${({ theme }) =>
    theme.breakpoints.values.sm}) {
    font-size: 14px;
  }
`;
export default ApplicationStatus;
