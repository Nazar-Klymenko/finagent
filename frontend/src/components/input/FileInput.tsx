import { FC } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import _ from "lodash";
import Dropzone from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import formatBytes from "@helpers/formatBytes";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  showFiles?: boolean;
  defaultValue?: any;
}

const FileInput: FC<Props> = ({ name, labelName, showFiles, defaultValue }) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <Label>{labelName}</Label>
          <Dropzone onDrop={field.onChange}>
            {({ getRootProps, getInputProps }) => (
              <Paper
                variant="outlined"
                className={styles.root}
                {...getRootProps()}
              >
                <input
                  {...getInputProps()}
                  accept=".png,.jpg,.pdf"
                  name={name}
                  onBlur={field.onBlur}
                />
                <p>Dodaj zdjęcia dokumentów tutaj</p>
              </Paper>
            )}
          </Dropzone>
          {/* {showFiles && (
            <List>
              {field &&
                field!.value!.map(
                  (f: { name: string; size: string }, idx: number) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <InsertDriveFile />
                      </ListItemIcon>
                      <ListItemText
                        primary={f.name}
                        secondary={formatBytes(f.size)}
                      />
                    </ListItem>
                  )
                )}
            </List>
          )} */}
          <InputErrorMessage>
            <span className="invis-star">*</span>
            {t(_.get(errors, `${name}.message`))}
          </InputErrorMessage>
        </>
      )}
    />
  );
};

export default FileInput;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    padding: "10px",
    marginTop: "20px",
  },
  icon: {
    marginTop: "16px",
    color: "#888888",
    fontSize: "42px",
  },
}));
