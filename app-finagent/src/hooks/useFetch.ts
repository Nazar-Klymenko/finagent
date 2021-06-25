import { useEffect, useState } from "react";

const useFetch = (api: () => object) => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await api();
        setResponse(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [api]);

  return { response, isLoading, isError };
};

export default useFetch;
