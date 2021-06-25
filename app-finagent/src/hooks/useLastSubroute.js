import { useHistory } from "react-router-dom";

export default function useLastSubroute() {
  const history = useHistory();

  let currentLocation = history.location.pathname;
  let urlParted = currentLocation.split("/");
  let lastSubroute = urlParted.pop() || urlParted.pop();

  return +lastSubroute;
}
