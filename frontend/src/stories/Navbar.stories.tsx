import React from "react";

import { Story } from "@storybook/react";

import { Navbar } from "@components/navbar";

export default {
  title: "Navbar",
  component: Navbar,
};

export const Main: Story<{}> = ({ ...props }) => <Navbar {...props} />;
