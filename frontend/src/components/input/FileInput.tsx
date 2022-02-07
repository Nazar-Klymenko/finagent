import React, { useCallback, useState, useEffect } from "react";

import { useTranslation } from "next-i18next";
import Image from "next/image";

import { IconButton, Typography } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import _ from "lodash";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  InputContainer,
  InputErrorMessage,
  Label,
  Optional,
} from "./LocalStyles";
import formatBytes from "@helpers/formatBytes";

interface Props extends InputProps {
  placeholder?: string;
  optional?: boolean;
  autoComplete?: string;
  defaultValue?: File | null | undefined;
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
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <InputContainer>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Dropzone
            defaultValue={defaultValue}
            onChange={onChange}
            value={value}
            name={name}
            setValue={setValue}
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

export default FileInput;

const Dropzone = ({
  defaultValue,
  value,
  onChange,
  setValue,
  name,
}: any): JSX.Element => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<any>(defaultValue || []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      let newFiles = [
        ...files,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ];
      setFiles(newFiles);
      onChange(newFiles);
    },
    [files, onChange]
  );

  useEffect(() => {
    setValue(name, files);
  }, [name, files, setValue]);

  // useEffect(() => {
  //   return () =>
  //     files?.forEach((file: any) => URL.revokeObjectURL(file.preview));
  // }, [files]);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragReject } =
    useDropzone({
      onDrop,
      accept: "image/jpeg, image/png",
    });

  const removeFile = (file: File) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    onChange(newFiles);
    //@ts-ignore
    URL.revokeObjectURL(file.preview);
  };

  return (
    <section>
      <Base {...getRootProps({ isFocused, isDragActive, isDragReject })}>
        <input name={name} {...getInputProps()} />
        <FileUploadIcon sx={{ mx: "auto" }} />
        <Typography variant="body2" align="center">
          {t("Form.Inputs.dropzone")}{" "}
          <a href="#">{t("Form.Inputs.dropzoneBrowse")}</a>
        </Typography>
      </Base>
      <Aside>
        {files?.length > 0 &&
          files.map((file: any, idx: number) => (
            <ImagePreview key={idx}>
              <ImageWrap>
                <Image
                  src={file.preview}
                  alt={file.name}
                  height={100}
                  width={120}
                  objectFit="cover"
                />
              </ImageWrap>
              <ImageNameContainer>
                <ImageName
                  sx={{ typography: { sm: "body1", xs: "body2" } }}
                  variant="body1"
                >
                  {_.truncate(file.name, {
                    length: 18,
                    omission:
                      "..." + file.name.substr(file.name.lastIndexOf(".") + 1),
                  })}
                </ImageName>
                <Typography variant="body2">
                  {formatBytes(file.size)}
                </Typography>
              </ImageNameContainer>

              <IconButton sx={{ mx: "0.5rem" }} onClick={removeFile(file)}>
                <DeleteIcon />
              </IconButton>
            </ImagePreview>
          ))}
      </Aside>
    </section>
  );
};

const Aside = styled("aside")`
  display: flex;
  flex-wrap: wrap;
`;
const ImagePreview = styled("div")`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  width: 100%;
  align-items: center;
  margin-top: 12px;
  overflow: hidden;
`;
const ImageWrap = styled("div")`
  min-height: 100px;
  min-width: 120px;
  max-height: 100px;
  max-width: 120px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-height: 80px;
    min-width: 100px;
    max-height: 80px;
    max-width: 100px;
  }
`;
const ImageNameContainer = styled("div")`
  flex: 1;
  padding: 0 1rem;
  max-width: 100%;
`;
const ImageName = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Base = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "isFocused" && prop !== "isDragActive" && prop !== "isDragReject",
})<{
  isFocused?: boolean;
  isDragActive: boolean;
  isDragReject: boolean;
}>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  place-content: center center;
  padding: 16.5px 14px;
  border-radius: 4px;
  background-color: #fafafa;
  color: #bdbdbd;
  border: 1px dashed ${({ theme }) => theme.palette.grey[500]};
  height: 102px;
  &:hover {
    border: 1px dashed ${({ theme }) => theme.palette.grey[900]};
  }

  ${({ isDragActive }) =>
    isDragActive &&
    css`
      border: 1px dashed #2196f3 !important;
    `}
  ${({ isDragReject }) =>
    isDragReject &&
    css`
      border: 1px dashed red !important;
    `}
`;
