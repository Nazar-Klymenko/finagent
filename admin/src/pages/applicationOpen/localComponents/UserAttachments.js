import React from "react";
import styled from "styled-components/macro";
const UserDocuments = ({ attachments, id }) => {
  const baseUrl = process.env.REACT_APP_API_SERVER_URL;

  return (
    <AttachmentsContainer>
      {attachments[0].map((file, idx) => (
        <FileLink key={idx}>
          <a
            href={`${baseUrl}/user/application/attachments/${id}/${file.fileName}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FileBox baseUrl={baseUrl} id={id} fileName={file.fileName} />
            <Name>{file.fileName}</Name>
          </a>
        </FileLink>
      ))}
    </AttachmentsContainer>
  );
};

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

const FileLink = styled.div`
  position: relative;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FileBox = styled.div`
  height: 6rem;
  width: 5rem;
  background-color: #c4c4c4;
  border-radius: 14px 6px 6px 6px;
  position: relative;
  color: ${({ theme }) => theme.black};
  padding: 8px 12px;
  margin: 8px 28px;
  background-image: ${({ baseUrl, id, fileName }) =>
    `url(${baseUrl}/user/application/attachments/${id}/${fileName})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Name = styled.div`
  font-size: 0.7rem;
`;

export default UserDocuments;
