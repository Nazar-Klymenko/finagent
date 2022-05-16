import React, { useEffect, useRef } from "react";

import { useTranslation } from "next-i18next";

import { Typography } from "@mui/material";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
  InputContainer,
  InputErrorMessage,
  Label,
  Optional,
} from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  optional?: boolean;
  defaultValue?: string | undefined;
}

const MuiPhoneInput = ({
  name,
  defaultValue,
  labelName,
  optional,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const ref = useRef();

  useEffect(() => {
    const handleFocus = () => {
      //@ts-ignore
      ref.current.numberInputRef.focus();
    };

    if (_.get(errors, [name])) {
      handleFocus();
    }
  }, [errors, name]);

  return (
    <InputContainer>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <PhoneInput
            //@ts-ignore
            ref={ref}
            inputProps={{ name: name }}
            onChange={field.onChange}
            value={field.value}
            isValid={!_.get(errors, name)}
            defaultErrorMessage=""
            onlyCountries={["pl", "ua", "by", "ru"]}
            country="pl"
            specialLabel=""
            priority={{ pl: 0 }}
            inputStyle={{
              width: "100%",
              transition: "none",
            }}
          />
        )}
      />
      <InputErrorMessage>
        <Typography variant="caption">
          {t(_.get(errors, `${name}.message`))}
        </Typography>
      </InputErrorMessage>
    </InputContainer>
  );
};

export default MuiPhoneInput;
