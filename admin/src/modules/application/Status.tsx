import React from "react";

import { useTranslation } from "next-i18next";

import CheckIcon from "@mui/icons-material/Check";
import { css, styled } from "@mui/material/styles";

type Props = {
  currentStep: string;
};
type Styled = {
  addedClass: any;
};

const Status: React.FC<Props> = ({ currentStep }) => {
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
      {[...Array(4)].map((x, idx) => (
        <Step key={idx} addedClass={checkClass(idx)}>
          <Number addedClass={checkClass(idx)}>{idx + 1}</Number>
          <Subheader addedClass={checkClass(idx)}>
            {t(`ApplicationOpen.StatusIndex.status${idx + 1}`)}
          </Subheader>
          <CheckmarkWrap addedClass={checkClass(idx)}>
            <CheckIcon color="primary" />
          </CheckmarkWrap>
        </Step>
      ))}
    </ApplicationStatusStyled>
  );
};

export { Status };

const ApplicationStatusStyled = styled("div")`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  margin: 16px 0;
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

  ${({ addedClass, theme }) =>
    addedClass === "current" &&
    css`
      border: 2px solid ${theme.palette.primary.main};
      color: ${theme.palette.primary.main};
    `}
  ${({ addedClass, theme }) =>
    addedClass === "finished" &&
    css`
      border: 2px solid ${theme.palette.primary.main};
      background: ${theme.palette.primary.main};
      color: white;
      border: 2px solid ${theme.palette.primary.main};
    `}


  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const Subheader = styled("div")<Styled>`
  color: ${({ theme }) => theme.palette.grey[500]};
  flex: 1;
  padding-left: 1rem;

  ${({ addedClass, theme }) =>
    addedClass === "current" &&
    css`
      color: ${theme.palette.common.black};
    `}
  ${({ addedClass, theme }) =>
    addedClass === "finished" &&
    css`
      color: ${theme.palette.grey[400]};
    `}

    ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 14px;
  }
`;
