import React, { useCallback } from "react";

import { useRouter } from "next/router";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { IconButton, IconButtonProps } from "@mui/material";

const BackArrow = (props: IconButtonProps): JSX.Element => {
  const router = useRouter();

  const returnFn = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <IconButton {...props} onClick={returnFn}>
      <ArrowBackIosNewRoundedIcon width="16" height="10" />
    </IconButton>
  );
};

export default BackArrow;
