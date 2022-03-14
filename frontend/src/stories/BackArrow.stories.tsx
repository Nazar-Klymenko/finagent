import React from "react";

import { Story } from "@storybook/react";

import { BackArrow } from "@components/buttons";

export default {
  title: "buttons/BackArrow",
  component: BackArrow,
};

export const Main: Story<{}> = ({ ...props }) => <BackArrow {...props} />;
