import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(false);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const respone = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!respone.ok) {
        throw new Error("Cannot fetching data!");
      }
      const data = await respone.json();
      applyData(data);
    } catch (err) {
      console.log(`--ERROR: ${err}`);
      setError(err.message);
    }
  }, []);

  return {
    error,
    sendRequest,
  };
};

export default useHttp;
