import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import useLayoutTranslation from "@hooks/useLayoutTranslation";

const AuthButtons = (): JSX.Element => {
  const { locale } = useRouter();
  //@ts-ignore
  const { _t } = useLayoutTranslation(locale);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Link href="/auth/login" passHref>
        <Button size="small" component="a" variant="outlined" disableRipple>
          <Typography variant="button" noWrap>
            {_t("Navbar.logIn")}
          </Typography>
        </Button>
      </Link>

      {!sm && (
        <Link href="/auth/sign-up" passHref>
          <Button
            sx={{ ml: "0.5rem" }}
            size="small"
            component="a"
            variant="contained"
            disableRipple
          >
            {_t("Navbar.signUp")}
          </Button>
        </Link>
      )}
    </>
  );
};
export default AuthButtons;
