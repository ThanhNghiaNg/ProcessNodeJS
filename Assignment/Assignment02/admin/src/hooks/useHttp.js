const { useState } = require("react");

const useHttp = () => {
  const [error, setError] = useState("");
  const token = localStorage.getItem("USER_ID");
  const sendRequest = async (configs, callback) => {
    
    try {
      const respone = await fetch(configs.url, {
        method: configs.method ? configs.method : "GET",
        headers: configs.headers
          ? configs.headers
          : {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
        body: configs.body ? JSON.stringify(configs.body) : null,
      });
      const data = await respone.json();
      if (respone.status !== 200) {
        setError(data.message);
      }
      callback(data);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    error,
    setError,
    sendRequest,
  };
};

export default useHttp;
