import { useState } from "react";

import { useTranslation } from "next-i18next";

import { Link, Tabs as MuiTabs, Paper, Tab } from "@mui/material/";

const Tabs = ({
  links,
  orientation = "horizontal",
  ...other
}: any): JSX.Element => {
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
      orientation={orientation}
      {...other}
    >
      {links.map((link: any, idx: number) => (
        // <Link key={idx} href={link.href} passHref>
        <Tab
          key={idx}
          label={t(link.label)}
          component={Link}
          href={link.href}
        ></Tab>
        // </Link>
      ))}
    </MuiTabs>
  );
};

export { Tabs };
