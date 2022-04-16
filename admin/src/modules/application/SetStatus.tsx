import React from "react";

import { css, styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setStatusAPI } from "@api/applications";

import { Form } from "@components/Form";
import { Button } from "@components/buttons";
import { Radio } from "@components/input";

interface Props {
  id: string;
  currentStatus: number;
}
type FormTypes = {
  status: any;
};
const SetStatus: React.FC<Props> = ({
  id,
  currentStatus,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const methods = useForm<FormTypes>({
      defaultValues: {
        status: currentStatus,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,
    }),
    { handleSubmit, watch, formState, reset } = methods;
  const { isDirty } = formState;

  const formSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      //   @ts-ignore
      await setStatusAPI(data, id);

      reset(data);
    } catch (error) {
      alert("error");
    }
  });

  return (
    <Form id="form-status" onSubmit={formSubmit} methods={methods}>
      {isDirty && <VLine />}
      <Radio
        name="status"
        labelName={t("ApplicationOpen.Status.subtitle")}
        options={[
          {
            label: t("ApplicationOpen.Status.preparing"),
            value: "1",
          },
          {
            label: t("ApplicationOpen.Status.selecting"),
            value: "2",
          },
          {
            label: t("ApplicationOpen.Status.offering"),
            value: "3",
          },
          {
            label: t("ApplicationOpen.Status.finalizing"),
            value: "4",
          },
          {
            label: t("ApplicationOpen.Status.finished"),
            value: "5",
          },
        ]}
      />

      <StatusBtnWrap>
        {isDirty && (
          <Button form="form-status">
            {t("ApplicationOpen.AdminButton.update")}
          </Button>
        )}
      </StatusBtnWrap>
    </Form>
  );
};

const VLine = styled("div")`
  background: ${({ theme }) => theme.palette.primary.main};
  width: 3px;
  border-radius: 5px;
  position: absolute;
  left: -8px;
  bottom: 0;
  top: 0;
`;

const StatusBtnWrap = styled("div")`
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
      {/* <Subheader
        subheader={t("ApplicationOpen.Status.title")}
        description={t("ApplicationOpen.Status.subtitle")}
      /> */}
      <span>
        {t("ApplicationOpen.Status.currentStatus")}
        {currentStatus}
      </span>
    </>
  );
};

export { SetStatus, ApplicationStatusesPreview };
