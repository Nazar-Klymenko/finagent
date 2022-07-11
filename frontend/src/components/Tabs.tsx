import { useState } from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Tabs as MuiTabs, Paper, Tab } from "@mui/material/";
import i18next from "i18next";

import { Link } from "@components/Link";

const Tabs = ({
  links,
  orientation = "horizontal",
  ...other
}: any): JSX.Element => {
  const { t } = i18next;
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
        <Tab
          key={idx}
          label={t(link.label)}
          component={Link}
          href={{
            pathname: link.href + "",
          }}
        ></Tab>
      ))}
    </MuiTabs>
  );
};

export { Tabs };
