import React from "react";

import { Story } from "@storybook/react";

import { FacebookButton } from "@components/buttons";

export default {
  title: "buttons/FacebookButton",
  component: FacebookButton,
};

export const Main: Story<{}> = ({ ...props }) => (
  <FacebookButton {...props}>Facebook</FacebookButton>
);
