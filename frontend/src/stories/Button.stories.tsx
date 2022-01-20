import React from "react";

import { Story } from "@storybook/react";

import { Button } from "@components/buttons";

export default {
  title: "buttons/Button",
  component: Button,
};

export const Main: Story<{}> = ({ ...props }) => (
  <Button {...props}>Button</Button>
);
