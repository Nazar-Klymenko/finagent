import styled, { css } from "styled-components/macro";

interface Props {
  error?: boolean;
}

export const InputContainer = styled.div<Props>`
  position: relative;
  margin-bottom: 0.6rem;
`;

export const Label = styled.label`
  /* font-size: 0.9rem; */
`;

export const InputStyled = styled.input<Props>`
  position: relative;
  width: 100%;
  padding: 6.5px 14px;
  appearance: none;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.27);
  box-sizing: border-box;
  border-radius: 5px;
  height: 56px;
  &:focus {
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.blue}!important;
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.blue} !important;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.input.hover};
  }
  ${({ error }) =>
    error &&
    css`
      &:focus {
        box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.red} !important;
        border: 1px solid ${({ theme }) => theme.red} !important;
      }
      &:hover {
        border: 1px solid ${({ theme }) => theme.red};
      }
      border: 1px solid ${({ theme }) => theme.red};
    `}
`;

export const InputErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  margin: 6px 0px 0px;
  .invis-star {
    opacity: 0;
    pointer-events: none;
  }
`;
