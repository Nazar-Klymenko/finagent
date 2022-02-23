import { useState } from "react";

import { useTranslation } from "next-i18next";

import { Tabs as MuiTabs, Paper, Tab } from "@mui/material/";

const Tabs = (): JSX.Element => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <MuiTabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      scrollButtons="auto"
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      {links.map((link, idx) => (
        <Tab key={idx} label={t(link.label)}></Tab>
      ))}
    </MuiTabs>
  );
};

export { Tabs };

const links = [
  {
    href: "/dashboard/insurance",
    label: "Dashboard.SideMenu.insurances",
    activePaths: ["/dashboard/insurance"],
  },
  {
    href: "/dashboard/loans",
    label: "Dashboard.SideMenu.loans",
    activePaths: ["/dashboard/loans"],
  },
  {
    href: "/dashboard/history",
    label: "Dashboard.SideMenu.history",
    activePaths: ["/dashboard/history"],
  },
];
