import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";

interface Props {
  maxSteps: number;
  currentStep: number;
  label: string;
}

const ProgressBar: React.FC<Props> = ({ maxSteps, currentStep, label }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setProgressWidth((currentStep / maxSteps) * 100);
  }, [maxSteps, currentStep]);

  return (
    <>
      <InfoWrap>
        <Steps>
          {currentStep}/{maxSteps}
        </Steps>
        <Label>{label}</Label>
      </InfoWrap>

      <ProgressBg>
        <ProgressFill progressWidth={progressWidth} />
      </ProgressBg>
    </>
  );
};

const InfoWrap = styled("div")`
  display: flex;
  padding: 12px 0px;
`;

const Steps = styled("div")`
  font-weight: 500;
`;

const Label = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  padding-left: 8px;
`;

const ProgressBg = styled("div")`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.grey[400]};
  display: flex;
  justify-content: flex-start;
`;

const ProgressFill = styled("div")<{ progressWidth: number }>`
  width: ${({ progressWidth }) => progressWidth}%;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 1px 4px 0px ${({ theme }) => theme.palette.secondary.main};
`;

export default ProgressBar;
