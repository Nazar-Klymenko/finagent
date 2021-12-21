import styled, { css } from "styled-components/macro";

interface Props {
  error?: boolean;
}

export const InputContainer = styled.div<{ width: "s" | "m" | "l" }>`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${({ width }) =>
    width === "s" &&
    css`
      max-width: 150px;
    `}
`;

export const Label = styled.label`
  /* font-size: 0.9rem; */
  max-width: 680px;
  display: flex;
  width: 100%;
`;

export const InputErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  margin: 6px 0px 6px;
  min-height: 0.75rem;
  height: 0.75rem;
`;

export const Optional = styled.div`
  font-size: 0.9rem;
  display: flex;
  flex: 1;
  color: ${({ theme }) => theme.gray};
  justify-content: flex-end;
  /* align-items: flex-end; */
`;
