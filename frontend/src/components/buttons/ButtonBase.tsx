import React, { useState } from "react";

import styled, { css } from "styled-components/macro";

interface ButtonProps {
  form: string;
  large?: boolean;
  onClick?: () => void;
  color: "primary" | "secondary";
  isBlocked?: boolean;
  className: string;
  text: string;
  noRipple?: boolean;
}
interface ButtonStyledTypes {
  large: boolean;
  color: "primary" | "secondary";
  isBlocked: boolean;
}

export const MainButton: React.FC<ButtonProps> = ({
  form,
  large = false,
  onClick,
  color,
  className,
  text,
  isBlocked = false,
  noRipple = false,
}) => {
  const [isRippling, setIsRippling] = useState(false);
  const [coords, setCoords] = useState({ x: 1, y: 1 });

  function createRipple(e: any) {
    setIsRippling(true);
    const rect = e.target.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  function finishRipple() {
    setIsRippling(false);
  }

  return (
    <ButtonStyled
      form={form}
      onClick={onClick}
      large={large}
      isBlocked={isBlocked}
      onMouseDown={(e) => createRipple(e)}
      onMouseUp={finishRipple}
      onMouseLeave={finishRipple}
      color={color}
      className={className}
    >
      {text}
      {!noRipple && isRippling && (
        <Ripple x={coords.x} y={coords.y} color={color} large={large} />
      )}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<ButtonStyledTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  min-width: 84px;
  border: none;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  transition: 0.15s ease-in-out;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  padding: 8px;
  ${({ isBlocked }) =>
    isBlocked &&
    css`
      pointer-events: none !important;
      background-color: ${({ theme }) => theme.buttons.blockedBg} !important;
      box-shadow: none !important;
      color: gray !important;
    `};
`;

interface RippleProps {
  x: number;
  y: number;
  color: "primary" | "secondary";
  large: boolean;
}

export const Ripple: React.FC<RippleProps> = ({ x, y, color, large }) => {
  return <RippleStyled x={x} y={y} color={color} large={large} />;
};

const RippleStyled = styled.span<RippleProps>`
  position: absolute;
  background: ${({ color, theme }) =>
    color === "primary" ? "white" : theme.gray};
  pointer-events: none;
  border-radius: 50%;
  animation: ${({ large }) => (large ? "animateLarge " : "animateSmall")} 1.5s
    linear forwards;
  opacity: 0;
  width: 20px;
  height: 20px;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  @keyframes animateSmall {
    0% {
      transform: scale(1);
      opacity: 0.25;
    }
    25% {
      transform: scale(12);
      opacity: 0.3;
    }
    50% {
      transform: scale(25);
      opacity: 0.4;
    }
    100% {
      transform: scale(40);
      opacity: 0.5;
    }
  }
  @keyframes animateLarge {
    0% {
      transform: scale(1);
      opacity: 0.25;
    }
    25% {
      transform: scale(30);
      opacity: 0.3;
    }
    50% {
      transform: scale(70);
      opacity: 0.4;
    }
    100% {
      transform: scale(100);
      opacity: 0.5;
    }
  }
`;

export default Ripple;
