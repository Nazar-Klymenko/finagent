import Image from "next/image";

import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import _ from "lodash";

import formatBytes from "@helpers/formatBytes";

const ImagePreview = ({
  file,
  removeCb,
}: {
  file: any;
  removeCb: any;
}): JSX.Element => {
  return (
    <ImagePreviewContainer>
      <ImageWrap>
        <Image
          src={file.preview}
          alt={file.name}
          height={100}
          width={120}
          objectFit="cover"
        />
      </ImageWrap>
      <ImageNameContainer>
        <ImageName
          sx={{ typography: { sm: "body1", xs: "body2" } }}
          variant="body1"
        >
          {_.truncate(file.name, {
            length: 18,
            omission: "..." + file.name.substr(file.name.lastIndexOf(".") + 1),
          })}
        </ImageName>
        <Typography variant="body2">{formatBytes(file.size)}</Typography>
      </ImageNameContainer>

      <IconButton sx={{ mx: "0.5rem" }} onClick={removeCb(file)}>
        <DeleteIcon />
      </IconButton>
    </ImagePreviewContainer>
  );
};

export { ImagePreview };

const ImagePreviewContainer = styled("div")`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  width: 100%;
  align-items: center;
  margin-top: 12px;
  overflow: hidden;
`;
const ImageWrap = styled("div")`
  min-height: 100px;
  min-width: 120px;
  max-height: 100px;
  max-width: 120px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-height: 80px;
    min-width: 100px;
    max-height: 80px;
    max-width: 100px;
  }
`;
const ImageNameContainer = styled("div")`
  flex: 1;
  padding: 0 1rem;
  max-width: 100%;
`;
const ImageName = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
