import React from "react";
import { deleteSpecificDocumentAPI } from "@api/mainAPI";
import styled from "styled-components/macro";

interface Props {
  isTaken: boolean;
  attachments: any;
  id: string;
}
type File = {
  fileName: string;
  fileType: string;
  idx: number;
};

const Attachments: React.FC<Props> = ({ isTaken, attachments, id }) => {
  const baseUrl = process.env.REACT_APP_API_SERVER_URL;

  const deleteDocument = async (file: string) => {
    try {
      const fileName = { fileName: file };

      deleteSpecificDocumentAPI(fileName, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AttachmentsContainer>
      {attachments[0].map((file: File, idx: number) => (
        <FileLink key={idx}>
          <a
            href={`${baseUrl}/user/application/attachments/${id}/${file.fileName}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FileBox>
              <span className="name">{file.fileName}</span>
              <span className="type">{file.fileType}</span>
            </FileBox>
          </a>

          {isTaken && (
            <DeleteIcon
              onClick={() => {
                deleteDocument(file.fileName);
              }}
            >
              x
            </DeleteIcon>
          )}
        </FileLink>
      ))}
    </AttachmentsContainer>
  );
};

const DeleteIcon = styled.div`
  cursor: pointer;
  color: white;
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 2%;
  right: 10%;
  padding: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.red};
  opacity: 0;
  &:hover {
    opacity: 1 !important;
  }
`;

const FileBox = styled.div`
  height: 6rem;
  width: 5rem;
  background: #c4c4c4;
  border-radius: 14px 6px 6px 6px;
  position: relative;
  color: ${({ theme }) => theme.black};
  padding: 8px 12px;
  margin: 8px 28px;

  .type {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .name {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.7rem;
  }
`;

const FileLink = styled.div`
  position: relative;
  &:hover ${DeleteIcon} {
    opacity: 0.7;
  }
`;

const AttachmentsContainer = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.lightestGray};
  min-height: 8rem;
  max-height: fit-content;
  padding: 5px 8px;
  flex-wrap: wrap;
`;

export default Attachments;
