import React from "react";
import styled from "styled-components/macro";

type Props = {
  attachments: any;
  id: string;
};

const Attachments: React.FC<Props> = ({ attachments, id }) => {
  console.log(attachments);
  return (
    <AttachmentsStyled>
      {attachments[0].map((file: any) => (
        <a
          href={file.link}
          rel="noopener noreferrer"
          target="_blank"
          key={file._id}
        >
          <FileBox>
            <img src={file.link} alt=""></img>
          </FileBox>
        </a>
      ))}
    </AttachmentsStyled>
  );
};

const AttachmentsStyled = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.lightGray};
  min-height: 8rem;
  max-height: fit-content;
  padding: 5px 8px;
  flex-wrap: wrap;
`;

const FileBox = styled.div`
  height: 6rem;
  width: 5rem;
  background: #c4c4c4;
  border-radius: 14px 6px 6px 6px;
  position: relative;
  color: ${({ theme }) => theme.black};
  padding: 8px 12px;
  margin: 8px 30px;

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

export default Attachments;
