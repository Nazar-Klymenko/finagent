import React, { useCallback } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

import { IconButton } from "@mui/material";

const BackArrow: React.FC = () => {
  const router = useRouter();

  const returnFn = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <IconButton onClick={returnFn}>
      <ArrowBackIosNewRoundedIcon width="16" height="10" />
    </IconButton>
  );
};

export default BackArrow;
