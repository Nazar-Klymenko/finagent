import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const root = {
  backgroundColor: "#eee",
  textAlign: "center",
  cursor: "pointer",
  color: "#333",
  padding: "10px",
  marginTop: "20px",
};

const FileTest = ({
  control,
  name,
  labelName,
  showFiles,
  error,
  helperText,
}) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png,image/jpeg,application/pdf",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  function remove(fileIdx) {
    const newFiles = [...files];
    newFiles.splice(fileIdx, 1);
    setFiles(newFiles);
  }

  const thumbs = files.map((file, idx) => (
    <Thumb
      onClick={() => {
        remove(idx);
      }}
      key={file.name}
    >
      <ThumbInner>
        {file.type === "application/pdf" ? (
          <Document file={file}>
            <Page height="100" pageNumber={1} />
          </Document>
        ) : (
          <img src={file.preview} alt="" />
        )}
      </ThumbInner>
    </Thumb>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <>
      <div style={root} {...getRootProps({ className: "dropzone" })}>
        <input name={name} {...getInputProps()} />
        <p>Dodaj pliki tutaj</p>
      </div>
      <ThumbContainer>{thumbs}</ThumbContainer>

      <InputErrorMessage>
        <span className="invis-star">*</span>
        {helperText}
      </InputErrorMessage>
    </>
  );
};

export default FileTest;

const ThumbContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
`;
const ThumbInner = styled.div`
  display: flex;
  min-width: 0px;
  overflow: hidden;
  img {
    display: block;
    width: auto;
    height: 100%;
  }
`;

const InputErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  margin: 6px 0px 0px;
  .invis-star {
    opacity: 0;
    pointer-events: none;
  }
`;
