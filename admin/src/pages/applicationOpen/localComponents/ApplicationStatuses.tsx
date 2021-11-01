import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import Form from "@components/Form";
import { Radio } from "@components/input";
import { CTA } from "@components/buttons";

import { sendStatusAPI } from "@api/mainAPI";

import Subheader from "@components/Subheader";
import Section from "./Section";

import { useDispatch } from "react-redux";
import { setSnackbar } from "@redux/alert/actions";
interface Props {
  id: string;
  currentStatus: number;
}

const ApplicationStatuses: React.FC<Props> = ({ id, currentStatus }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { reset, register, handleSubmit, formState } = useForm({
    defaultValues: {
      status: currentStatus,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });
  const { isDirty } = formState;

  const formSubmit = async (data: any) => {
    try {
      await sendStatusAPI(data, id);

      dispatch(setSnackbar("success", "Status Changed successfully"));
      reset(data);
    } catch (error) {
      dispatch(setSnackbar("error", "Couldn't change status"));
    }
  };

  return (
    <Section isDirty={isDirty}>
      <Subheader
        subheader={t("ApplicationOpen.Status.title")}
        description={t("ApplicationOpen.Status.subtitle")}
      />
      <Form id="form-status" onSubmit={handleSubmit(formSubmit)}>
        <Radio
          ref={register}
          labelName={t("ApplicationOpen.Status.preparing")}
          name="status"
          id="1"
        />
        <Radio
          ref={register}
          labelName={t("ApplicationOpen.Status.selecting")}
          name="status"
          id="2"
        />
        <Radio
          ref={register}
          labelName={t("ApplicationOpen.Status.offering")}
          name="status"
          id="3"
        />
        <Radio
          ref={register}
          labelName={t("ApplicationOpen.Status.finalizing")}
          name="status"
          id="4"
        />
        <Radio
          ref={register}
          labelName={t("ApplicationOpen.Status.finished")}
          name="status"
          id="5"
        />
        <StatusBtnWrap>
          <CTA
            isBlocked={!isDirty}
            text={t("ApplicationOpen.AdminButton.update")}
            form="form-status"
          />
        </StatusBtnWrap>
      </Form>
    </Section>
  );
};

const StatusBtnWrap = styled.div`
  padding: 12px 0px;
`;

interface SecondProps {
  currentStatus: number;
}

const ApplicationStatusesPreview: React.FC<SecondProps> = ({
  currentStatus,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Subheader
        subheader={t("ApplicationOpen.Status.title")}
        description={t("ApplicationOpen.Status.subtitle")}
      />
      <span>
        {t("ApplicationOpen.Status.currentStatus")}
        {currentStatus}
      </span>
    </>
  );
};

export { ApplicationStatuses, ApplicationStatusesPreview };
