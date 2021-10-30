import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";

import Paper from "@mui/material/Paper";
import formatBytes from "@helpers/formatBytes";

import { Label, InputErrorMessage } from "./LocalStyles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "#eee",
//     textAlign: "center",
//     cursor: "pointer",
//     color: "#333",
//     padding: "10px",
//     marginTop: "20px",
//   },
//   icon: {
//     marginTop: "16px",
//     color: "#888888",
//     fontSize: "42px",
//   },
// }));

const FileInput = ({
  control,
  name,
  labelName,
  showFiles,
  error,
  helperText,
}) => {
  // const styles = useStyles();

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
                // className={styles.root}
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
