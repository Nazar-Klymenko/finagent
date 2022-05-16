import React, { useEffect, useState } from "react";
import _ from "lodash";

const useLayoutTranslation = (locale: string) => {
  const [trObject, trObjectSet] = useState({});

  useEffect(() => {
    const loadNamespace = async (locale: string) => {
      const resources = await fetch(`/locales/${locale}/layout.json`).then(
        (res) => res.json()
      );
      trObjectSet(resources);
    };
    loadNamespace(locale);
  }, [locale]);

  function _t(key: string) {
    return _.get(trObject, key);
  }
  return { _t, trObject };
};

export default useLayoutTranslation;
