import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { auth } from "@helpers/firebaseHelper";

const Thumbnails = ({ files, id, type }) => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    const user = auth.currentUser;
    setToken(user && (await user.getIdToken()));
  };

  useEffect(() => {
    getToken();
  }, []);

  let url = `${process.env.REACT_APP_API_SERVER_URL}admin/application/files/${token}/${id}/${type}`;
  return (
    <MainContainer>
      <ThumbContainer>
        {files[0]?.length > 0 &&
          files[0].map((file, idx) => (
            <ThumbWrap>
              <Thumb key={file.filename}>
                <ThumbInner
                  href={`${url}/${file.filename}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {file.type === "application/pdf" ? (
                    <Document file={file}>
                      <Page height="100" pageNumber={1} />
                    </Document>
                  ) : (
                    <img src={`${url}/${file.filename}`} alt="" />
                  )}
                </ThumbInner>
              </Thumb>
              <span className="name">{file.filename}</span>
            </ThumbWrap>
          ))}
      </ThumbContainer>
    </MainContainer>
  );
};

export default Thumbnails;

const MainContainer = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.lightestGray};
  min-height: 8rem;
  max-height: fit-content;
  padding: 5px 8px;
  flex-wrap: wrap;
`;

const ThumbContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;
const ThumbWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .name {
    font-size: 0.7rem;
    max-width: 120px;
    margin: 0 12px;
    word-wrap: break-word;
    text-align: center;
  }
`;

const Thumb = styled.div`
  display: inline-flex;
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
const ThumbInner = styled.a`
  display: flex;
  min-width: 0px;
  overflow: hidden;
  img {
    display: block;
    width: auto;
    height: 100%;
  }
`;
