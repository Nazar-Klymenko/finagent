import React from "react";
import styled, { css } from "styled-components/macro";
import { MainButton } from "./ButtonBase";

interface Props {
  form: string;
  large?: boolean;
  isLoading?: boolean;
  isBlocked?: boolean;
  onClick?: () => void;
  color: "primary" | "secondary";
  text: string;
}
interface Styled {
  isLoading?: boolean;
}

const CTA: React.FC<Props> = (props) => {
  return (
    <CTAStyled
      isLoading={props.isLoading}
      className="button-styled"
      {...props}
    />
  );
};

const CTAStyled = styled(MainButton)<Styled>`
  user-select: none;
  ${({ color }) =>
    color === "primary" &&
    css`
      background-color: ${({ theme }) => theme.buttons.primaryBg};
      box-shadow: 0px 2px 12px 0px ${({ theme }) => theme.shadowBlue};
      color: white;
      ${({ isLoading }) =>
        isLoading &&
        css`
          pointer-events: none;
          background-color: ${({ theme }) => theme.buttons.primaryBgLoading};
        `}
      &:hover {
        background-color: ${({ theme }) => theme.buttons.primaryBgHover};
        box-shadow: 0px 3px 16px 0px ${({ theme }) => theme.shadowBlue};
      }
    `}

  ${({ color }) =>
    color === "secondary" &&
    css`
      background-color: ${({ theme }) => theme.buttons.secondaryBg};
      box-shadow: 0px 1px 2px 0px ${({ theme }) => theme.gray};
      color: theme.buttons.secondaryColor;
      ${({ isLoading }) =>
        isLoading &&
        css`
          color: gray;
          pointer-events: none;
          background-color: ${({ theme }) => theme.buttons.secondaryBgLoading};
        `}

      &:hover {
        background-color: ${({ theme }) => theme.buttons.secondaryBgHover};
      }
    `}
`;

// const CTAStyled = styled.button<Styled>`
//   width: ${({ large }) => (large ? "10rem" : "7rem")};
//   height: 3rem;
//   font-family: inherit;
//   background-color: ${({ theme }) => theme.blue};
//   box-shadow: 0px 1px 4px 0px rgba(127, 8, 251, 0.25);
//   border-radius: 5px;
//   border: none;
//   color: #ffffff;
//   font-size: 1rem;
//   font-weight: 500;
//   letter-spacing: 0.015em;
//   align-self: ${({ large }) => (large ? "center" : "none")};

//   ${({ isLoading }) =>
//     isLoading &&
//     css`
//       cursor: progress;
//       pointer-events: none;
//       background-color: ${({ theme }) => theme.lightBlue};
//       &:hover {
//         background-color: ${({ theme }) => theme.lightBlue} !important;
//       }
//     `}

//   ${({ isBlocked }) =>
//     isBlocked &&
//     css`
//       cursor: not-allowed;
//       pointer-events: none;
//       background-color: ${({ theme }) => theme.lightBlue};
//       &:hover {
//         background-color: ${({ theme }) => theme.lightBlue} !important;
//       }
//     `}

//   &:hover {
//     box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3),
//       0 1px 3px 1px rgba(66, 133, 244, 0.15);
//     background-color: ${({ theme }) => theme.hoverBlue};
//   }
//   &:focus {
//     box-shadow: 0 0 0 4px #cbd6ee;
//   }
//   @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
//     max-width: 7rem;
//   }
// `;

export default CTA;
