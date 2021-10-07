import React, { useRef, useState, forwardRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { InputContainer, InputStyled } from "./LocalStyles";

import { ArrowDown } from "@components/svgs";
import { Label, InputErrorMessage } from "./LocalStyles";
import useClickOutside from "@hooks/useClickOutside";

interface Props {
  name: string;
  labelName: string;
  defaultValue: string;
  error: boolean;
  helperText: string;
  optionArray: [
    {
      value: string;
      label: string;
    }
  ];
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
    const { t } = useTranslation();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const [placeholderOverride, setPlaceholderOverride] = useState("");

    useClickOutside(isOpen, setIsOpen, wrapperRef);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };

    const handleMouseDown = (e: any) => {
      // setValue(e.target.attr("data-value");
      // setPlaceholderOverride(e.target.attr("data-label");
    };

    const handleMouseUp = () => {
      setIsOpen(false);
    };

    const options = optionArray.map((option, idx) => (
      <li
        key={option.value}
        onMouseDown={(e) => {
          handleMouseDown(e);
        }}
        onMouseUp={handleMouseUp}
        className="options__each"
        data-value={option.value}
        data-label={option.label}
      >
        <span>{t(option.label)}</span>
      </li>
    ));

    return (
      <SelectInputContainer as="div" error={error}>
        <Label>{labelName}</Label>

        <div ref={wrapperRef} className="wrap">
          <InputStyled
            error={error}
            ref={ref}
            onFocus={handleOpen}
            readOnly
            type="text"
            placeholder={placeholder}
            value={value}
            name={name}
          />
          <span className="override">{t(placeholderOverride)}</span>
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
          {t(helperText)}
        </InputErrorMessage>
      </SelectInputContainer>
    );
  }
);

const SelectInputContainer = styled(InputContainer)<Styled>`
  position: relative;
  margin-bottom: 0.6rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  .wrap {
    position: relative;
  }
  .override {
    position: absolute;
    left: 0;
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
`;

export default SelectInput;
