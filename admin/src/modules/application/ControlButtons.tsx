import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { styled } from "@mui/material/styles";
import useSWR, { useSWRConfig } from "swr";

import {
  archiveApplicationAPI,
  assignAplicationAPI,
  returnApplicationAPI,
} from "@api/applications";

import { Button } from "@components/buttons";

interface Props {
  id: string;
  data: any;
  mutate: any;
}
const ControlButtons = ({ id, data, mutate }: Props): JSX.Element => {
  const [taken, setTaken] = useState(!!data?.employee);

  useEffect(() => {
    setTaken(!!data?.employee);
  }, [data]);

  const archiveApplication = async () => {
    await archiveApplicationAPI(id);
  };
  const returnApplication = async () => {
    await returnApplicationAPI(id);
    // const admin = (data.eployee = null);
    mutate();
  };

  const assignApplication = async () => {
    try {
      await assignAplicationAPI(id);
      mutate();
    } catch {
      alert("error");
    }
  };
  return (
    <ButtonsContainer>
      {taken ? (
        <>
          <Button
            color="secondary"
            size="small"
            onClick={returnApplication}
            endIcon={<KeyboardReturnIcon />}
          >
            Return
          </Button>
          <Button color="secondary" size="small" endIcon={<ArchiveIcon />}>
            Archive
          </Button>
        </>
      ) : (
        <Button
          color="secondary"
          size="small"
          onClick={assignApplication}
          endIcon={<AddIcon />}
        >
          Take
        </Button>
      )}
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled("div")`
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
`;

export { ControlButtons };
