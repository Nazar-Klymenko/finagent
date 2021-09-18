import { useCallback, useEffect } from "react";

// interface Props {
//   state: boolean;
//   callback: (arg0: boolean) => void;
//   ref: React.Ref<HTMLElement>;
// }

const useClickOutside = (
  state: boolean,
  callback: (arg0: boolean) => void,
  ref: React.Ref<HTMLElement>
) => {
  const handleClickOutside = useCallback(
    (e: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      callback(false);
    },
    [ref, callback]
  );

  useEffect(() => {
    if (state) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state, callback, handleClickOutside]);
};
export default useClickOutside;
