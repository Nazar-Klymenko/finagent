import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title || "FinAgent";
  }, [title]);
};
export default useTitle;
