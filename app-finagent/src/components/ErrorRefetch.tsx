import React, { FC } from "react";
import styled from "styled-components";
import RefreshIcon from "@material-ui/icons/Refresh";

interface Props {
  callback?: () => void;
  text: string;
}

const ErrorRefetch: FC<Props> = ({ text, callback }) => {
  return (
    <ErrorRefetchStyled onClick={callback}>
      <RefreshIcon />
      {text}
    </ErrorRefetchStyled>
  );
};

export default ErrorRefetch;

const ErrorRefetchStyled = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 3rem;
`;
