import React from "react";
import styled from "styled-components/macro";
import Thumbnails from "@components/Thumbnails";

type Props = {
  attachments: any;
  id: string;
  type: "attachments" | "documents";
};

const Attachments: React.FC<Props> = ({ attachments, id, type }) => {
  return (
    <AttachmentsStyled>
      <Thumbnails id={id} type={type} files={attachments[0]} />
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

export default Attachments;
