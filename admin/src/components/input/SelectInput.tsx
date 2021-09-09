import React, { useRef, useState, forwardRef } from "react";
import styled, { css } from "styled-components";
import { ArrowDown } from "@components/svgs";
import useClickOutside from "@hooks/useClickOutside";

import { Label, InputErrorMessage } from "./SharedStyles";

interface Props {
  name: string;
  labelName: string;
  defaultValue: string;
  error: boolean;
  helperText: string;
  optionArray: [];
  placeholder: string;
  ref: React.Ref<HTMLInputElement>;
}
interface Styled {
  error: boolean;
}
const SelectInput: React.FC<Props> = forwardRef(
  (
    {
      name,
      labelName,
      defaultValue,
      error,
      helperText,
      optionArray,
      placeholder,
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);

    useClickOutside(isOpen, setIsOpen, wrapperRef);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };

    const handleMouseDown = (e: any) => {
      setValue(e.target.innerText);
    };

    const handleMouseUp = () => {
      setIsOpen(false);
    };

    const options = optionArray.map((option, idx) => (
      <li
        key={idx}
        onMouseDown={(e) => {
          handleMouseDown(e);
        }}
        onMouseUp={handleMouseUp}
        className="options__each"
      >
        <span>{option}</span>
      </li>
    ));

    return (
      <SelectInputContainer error={error}>
        <Label>{labelName}</Label>

        <div ref={wrapperRef} className="wrap">
          <input
            ref={ref}
            onFocus={handleOpen}
            readOnly
            className={`input ${error ? "input--error" : ""}`}
            type="text"
            placeholder={placeholder}
            value={value}
            name={name}
          />
          <ul className={`options ${isOpen ? "" : "options--hidden"}`}>
            {options}
          </ul>
          <div className={`icon ${isOpen ? "icon--open" : ""}`}>
            <ArrowDown
              rotation={`${isOpen ? 180 : 0}`}
              fill="#c4c4c4"
              width="16"
              height="10"
            />
          </div>
        </div>
        <InputErrorMessage>
          <span className="invis-star">*</span>
          {helperText}
        </InputErrorMessage>
      </SelectInputContainer>
    );
  }
);

const SelectInputContainer = styled.div<Styled>`
  position: relative;
  margin-bottom: 0.6rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  .label {
    font-size: 0.9rem;
  }
  .wrap {
    position: relative;
  }
  .input {
    cursor: pointer;
    caret-color: transparent;
    width: 100%;
    padding: 5px 8px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border-radius: 5px;
    &:focus {
      border: 1px solid ${({ theme }) => theme.blue};
      box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.blue};
    }
    &--error {
      box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.red};
      border: 1px solid ${({ theme }) => theme.red};
    }
  }
  .options {
    cursor: pointer;
    position: absolute;
    margin-top: 8px;
    left: 0;
    width: 100%;
    border-radius: 5px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    max-height: 8rem;
    overflow-y: scroll;
    z-index: 10;
    &__each {
      padding: 6px 8px;
      list-style: none;
      position: relative;
      display: flex;
      align-items: center;
      background: white;
      z-index: 10;
      span {
        position: relative;
      }
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        background: ${({ theme }) => theme.lightBlue};
        opacity: 0;
        z-index: 0;
      }
      &:hover {
        &::before {
          opacity: 1;
        }
      }
    }
    &::-webkit-scrollbar {
      width: 0.6em;
      padding: 0px 2px;
      background: white;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: ${({ theme }) => theme.lightGray};
    }
    &--hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
  .icon {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0px 10px;
    position: absolute;
    right: 0;
    top: 0;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 6px;
      height: calc(100% - 12px);
      width: 1px;
      background: ${({ theme }) => theme.lightGray};
    }
  }

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

export default SelectInput;
