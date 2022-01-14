import React, { FC, useCallback, useEffect, useState } from "react";

import { useTranslation } from "next-i18next";
import Image from "next/image";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

import {
  InputContainer,
  InputErrorMessage,
  Label,
  Optional,
} from "./LocalStyles";

interface Props extends InputProps {
  placeholder?: string;
  optional?: boolean;
  autoComplete?: string;
  defaultValue?: string | undefined;
  width?: "s" | "m" | "l";
}

const FileInput = ({
  name,
  labelName,
  autoComplete,
  optional,
  defaultValue,
  width = "l",
  ...other
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <InputContainer width={width}>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        key={name}
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Dropzone onChange={onChange} value={value} />
        )}
      />

      <InputErrorMessage>
        {t(_.get(errors, `${name}.message`))}
      </InputErrorMessage>
    </InputContainer>
  );
};

export default FileInput;

const Dropzone = ({ value, onChange }: any): JSX.Element => {
  const [files, setFiles] = useState(value);

  useEffect(() => {
    setFiles(value);
  }, [value]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  useEffect(
    () => () => {
      files?.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const thumbs =
    files?.length > 0 &&
    files.map((file: any, idx: number) => (
      <div key={file.name}>
        <Image src={file.preview} alt={file.name} height={80} width={64} />
        <Typography>
          {file.name}
          {idx}
        </Typography>
        <Typography
          onClick={() => {
            //@ts-ignore
            setFiles((files) => files.splice(idx, 1));
          }}
        >
          Remove
        </Typography>
      </div>
    ));

  return (
    <section>
      <Base {...getRootProps()}>
        <input
          {...getInputProps({
            onChange: (e) => onChange(e.target.files),
          })}
        />
        <div>Drag and drop your images here.</div>
      </Base>
      <aside>{thumbs}</aside>
    </section>
  );
};

const Base = styled("div")<{ isDragActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background-color: #fafafa;
  color: #bdbdbd;
  /* transition: border 0.3s ease-in-out; */

  border: 1px dashed ${({ theme }) => theme.palette.grey.A100};
  &:hover {
    border: 1px dashed ${({ theme }) => theme.palette.grey.A700};
  }

  ${({ isDragActive }) =>
    isDragActive &&
    `  border-color: #2196f3
`}
`;

// isDragActive,
//     isDragAccept,
//     isDragReject

{
  /* <OutlinedInput
  key={name}
  onChange={field.onChange}
  value={field.value}
  id={name}
  autoComplete={autoComplete}
  error={!!_.get(errors, name)}
  {...other}
/>; */
}
