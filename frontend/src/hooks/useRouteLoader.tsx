import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

const DONE_DURATION = 250;

function useRouteLoader() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<null>(null);

  const onRouteChangeStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onRouteChangeDone = useCallback(() => {
    setLoading(false);
    setTimeoutId(
      //@ts-ignore
      setTimeout(() => {
        setTimeoutId(null);
        setLoading(false);
      }, DONE_DURATION)
    );
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeDone);
    router.events.on("routeChangeError", onRouteChangeDone);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeDone);
      router.events.off("routeChangeError", onRouteChangeDone);
    };
  }, [onRouteChangeDone, onRouteChangeStart, router.events]);

  useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId]
  );
  return { loading };
}

export default useRouteLoader;
