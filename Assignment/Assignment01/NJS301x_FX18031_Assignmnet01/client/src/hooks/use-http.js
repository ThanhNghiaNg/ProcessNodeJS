import { useCallback, useState } from "react";
import { USER_TOKEN01, USER_TOKEN02 } from "../utils/config";
const useHttp = () => {
  const [error, setError] = useState(false);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    const baseHeaders = { Authorization: USER_TOKEN01 }
    try {
      const respone = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers
          ? {...baseHeaders, ...requestConfig.headers}
          : baseHeaders,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!respone.ok) {
        throw new Error("Cannot fetching data!");
      }
      const data = await respone.json();
      // console.log(data)
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
