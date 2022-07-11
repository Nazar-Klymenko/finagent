import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Slider as MuiSlider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import i18next from "i18next";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

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
  options: { value: number; label: string }[];
  rows?: number;
  defaultValue?: string | undefined;
}

const Slider: React.FC<Props> = ({
  name,
  labelName,
  options,
  optional,
  defaultValue,
}: Props): JSX.Element => {
  const { t } = i18next;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  //TODO: add custom text function as prop
  function valuetext(value: number) {
    return `${value}`;
  }
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
          <SliderStyled
            onChange={field.onChange}
            value={field.value}
            id={name}
            marks={options}
            min={Number(options[0].value)}
            max={Number(options[options?.length - 1].value)}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
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

const SliderStyled = styled(MuiSlider)`
  max-width: 80%;
  margin: 0 auto;
  .MuiSlider-mark {
    visibility: hidden !important;
  }
`;

export default Slider;
