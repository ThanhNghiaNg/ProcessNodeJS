const { useState } = require("react");

const useHttp = () => {
  const [error, setError] = useState("");
  const sendRequest = async (configs, callback) => {
    try {
      const respone = await fetch(configs.url, {
        method: configs.method ? configs.method : "GET",
        headers: configs.headers
          ? configs.headers
          : { "Content-Type": "application/json" },
        body: configs.body ? JSON.stringify(configs.body) : null,
      });
      const data = await respone.json();
      callback(data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  return {
    error,
    sendRequest,
  };
};

export default useHttp;
