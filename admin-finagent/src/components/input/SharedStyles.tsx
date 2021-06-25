import styled, { css } from "styled-components/macro";

interface Props {
  error: boolean;
}

export const InputContainer = styled.div<Props>`
  position: relative;
  margin-bottom: 0.6rem;

  @media all and (min-width: ${({ theme }) => theme.widthPhone}) {
    ${({ error }) =>
      error &&
      css`
      &::after {
        position: absolute;
        top: 40%;
        right: -28px;
        content: "!";
        width: 1.4rem;
        height: 1.4rem;
        color: white;
        font-weight: 600;
        background-color: ${({ theme }) => theme.red};
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      
    `}
  }
`;

export const Label = styled.label`
  font-size: 0.9rem;
`;

export const InputStyled = styled.input`
  position: relative;
  width: 100%;
  padding: 5px 8px;
  appearance: none;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  &:focus {
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.blue};
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.blue};
  }
`;

export const InputErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.7rem;

  .invis-star {
    opacity: 0;
    pointer-events: none;
  }
`;
export const InputError = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.7rem;

  .invis-star {
    opacity: 0;
    pointer-events: none;
  }
`;
