import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const ChangingPage = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    padding-bottom: 0.5rem;
  }
`;

export const StatusError = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.red};
`;

export const ButtonPosition = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DangerZoneStyled = styled.div`
  border: 1px solid red;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #ffcece;
  .danger-title {
    color: red;
  }
  .danger-action {
    color: red;
    cursor: pointer;
  }
`;
