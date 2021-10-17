import React, { useEffect, useState, FC } from "react";
import styled from "styled-components/macro";
import Thumbnails from "@components/Thumbnails";
import { getUserAttachmentsAPI } from "@api/applications";
import useFetch from "@hooks/useFetch";
import useFetchFiles from "@hooks/useFetchFiles";
import Skeleton from "@material-ui/lab/Skeleton";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

type Props = {
  attachments: any;
  id: string;
  type: "attachments" | "documents";
};

const Attachments: FC<Props> = ({ attachments, id, type }) => {
  const [images, setImages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, error, loading } = useFetchFiles(
    getUserAttachmentsAPI(id, type),
    attachments[0]
  );

  return (
    <>
      {loading && <Skeleton animation="wave" height="144px" width="100%" />}
      {!loading && (
        <AttachmentsStyled>
          {error && <h1>Error</h1>}

          {data &&
            data.map((image: any, idx: any) => (
              <a href={image} download={attachments[0][idx].filename}>
                <Document file={image}>
                  <Page height={100} pageNumber={1} />
                </Document>
                {/* <Thumbnail key={idx} src={image} alt="" /> */}
              </a>
            ))}

          {/* <Thumbnails id={id} type={type} files={attachments[0]} /> */}
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

const Thumbnail = styled.img`
  display: inline-flex;
  object-fit: cover;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  background: white;
  margin: 8px;
  width: 120px;
  height: 120px;
  padding: 4px;
  transition: 0.1s ease-in-out;
  &:hover {
    opacity: 0.85;
  }
`;

export default Attachments;
