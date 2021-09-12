import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

import Paper from "@material-ui/core/Paper";
import formatBytes from "@helpers/formatBytes";

import { Label, InputErrorMessage } from "./LocalStyles";

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

const FileInput = ({
  control,
  name,
  labelName,
  showFiles,
  error,
  helperText,
}) => {
  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ onChange, onBlur, value }) => (
        <>
          <Label>{labelName}</Label>
          <Dropzone onDrop={onChange}>
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
                  onBlur={onBlur}
                />
                <p>Dodaj zdjęcia dokumentów tutaj</p>
              </Paper>
            )}
          </Dropzone>
          {showFiles && (
            <List>
              {value.map((f, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText
                    primary={f.name}
                    secondary={formatBytes(f.size)}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <InputErrorMessage>
            <span className="invis-star">*</span>
            {helperText}
          </InputErrorMessage>
        </>
      )}
    />
  );
};

export default FileInput;
