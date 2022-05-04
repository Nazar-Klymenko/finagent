import { useEffect, useState } from "react";

import Image from "next/image";

import { styled } from "@mui/material/styles";
import { getDownloadURL, ref } from "firebase/storage";

import { auth, storage } from "@services/firebase";

interface Props {
  data: any;
  type: "adminAttachments" | "userAttachments";
}

const Attachments = ({ data, type }: Props): JSX.Element => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    const listItem = async () => {
      const _files =
        type === "adminAttachments"
          ? data.admin_attachments
          : data.user_attachments;
      _files.forEach(async (a: any) => {
        console.log(a);
        const storageRef = ref(
          storage, //@ts-ignore
          `files/${auth.currentUser.uid}/${data._id}/${type}/${a.filename}`
        );
        await getDownloadURL(storageRef).then((x: any) => {
          setFiles((files: any) => [...files, x]);
        });
      });
    };
    listItem();
  }, [data, type]);

  console.log(files);
  return (
    <FileBoxContainer>
      {files.map((file: any, idx: number) => {
        return (
          //   <Image key={idx} src={file} height={80} width={80} alt=""></Image>
          <a href={file} key={idx} target="_blank" rel="noreferrer">
            <FileImages src={file} alt="" />
          </a>
        );
      })}
    </FileBoxContainer>
  );
};
const FileImages = styled("img")`
  height: 80px;
  width: auto;
  /* border: 1px solid ${({ theme }) => theme.palette.divider}; */
  margin: 16px;
`;
const FileBoxContainer = styled("section")`
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

export { Attachments };
