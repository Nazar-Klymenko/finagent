import React, { useEffect, useState, FC } from "react";
import styled from "styled-components/macro";
import Thumbnails from "@components/Thumbnails";
import { getUserAttachmentsAPI } from "@api/applications";
import useFetch from "@hooks/useFetch";
import useFetchFiles from "@hooks/useFetchFiles";
import Skeleton from "@material-ui/lab/Skeleton";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import SaveAltRoundedIcon from "@material-ui/icons/SaveAltRounded";

type Props = {
  attachments: any;
  id: string;
  type: "attachments" | "documents";
};

const Attachments: FC<Props> = ({ attachments, id, type }) => {
  const { data, error, loading } = useFetchFiles(
    getUserAttachmentsAPI(id, type),
    attachments[0]
  );

  return (
    <>
      {loading && <Skeleton animation="wave" height={160} width="100%" />}
      {!loading && (
        <AttachmentsStyled>
          {error && <h1>Error</h1>}

          {data &&
            data.map((image: any, idx: any) => (
              <a
                key={attachments[0][idx].id}
                href={image}
                download={attachments[0][idx].filename}
                target="_blank"
                rel="noopener noreferrer"
                type="application/octet-stream"
              >
                <Thumbnail file={image}>
                  <Page width={160} pageNumber={1} />

                  <ThumbBackground>
                    <ThumbTitle> {attachments[0][idx].filename}</ThumbTitle>
                    <Icon color="inherit" />
                  </ThumbBackground>
                </Thumbnail>
              </a>
            ))}
        </AttachmentsStyled>
      )}
    </>
  );
};

const AttachmentsStyled = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.lightestGray};
  min-height: 128px;
  flex-wrap: wrap;
  padding: 5px 8px;
`;

const Thumbnail = styled(Document)`
  display: inline-flex;
  object-fit: cover;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  color: white;
  margin: 8px;
  width: 160px;
  height: 160px;
  transition: 0.1s ease-in-out;
  position: relative;
  overflow: hidden;
`;
const ThumbBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  &::before {
    content: "";
    opacity: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    background: black;
  }
  &:hover {
    &::before {
      opacity: 0.65;
    }
  }
`;

const ThumbTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 8px;
  color: white;
  font-size: 12px;
  max-height: 58px;
  opacity: 0;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;

  ${Thumbnail}:hover & {
    opacity: 1;
  }
`;

const Icon = styled(SaveAltRoundedIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  ${Thumbnail}:hover & {
    opacity: 1;
  }
`;

export default Attachments;
