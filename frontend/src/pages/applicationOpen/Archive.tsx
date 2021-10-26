import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { CTA } from "@components/buttons";
import { archiveApplicationAPI } from "@api/applicationAPI";
import { useTranslation } from "react-i18next";

type Props = {
  id: string;
};

const Archive: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation();

  async function archiveApplication() {
    try {
      await archiveApplicationAPI(id);
      alert("the application has been archived");
    } catch (error) {
      alert("couldn't archive application");
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
