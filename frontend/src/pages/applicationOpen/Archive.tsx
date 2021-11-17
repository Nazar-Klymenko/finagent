import React from "react";
import styled from "styled-components/macro";
import { CTA } from "@components/buttons";
import { archiveApplicationAPI } from "@api/applications";
import { useTranslation } from "react-i18next";
import { setSnackbar } from "@redux/alert/actions";
import { useDispatch } from "react-redux";
type Props = {
  id: string;
  callback: () => void;
};

const Archive: React.FC<Props> = ({ id, callback }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  async function archiveApplication() {
    try {
      await archiveApplicationAPI(id);
      dispatch(setSnackbar("success", "SnackBar.success"));
      callback();
    } catch (error) {
      dispatch(setSnackbar("success", "SnackBar.error"));
    }
  }

  return (
    <ButtonWrap>
      <CTA
        form=""
        onClick={archiveApplication}
        text={t("ApplicationOpen.Archive.button")}
        color="secondary"
      />
    </ButtonWrap>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 18px 0px 0px;
`;

export default Archive;
