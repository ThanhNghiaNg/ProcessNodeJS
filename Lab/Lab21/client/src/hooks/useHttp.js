import React, { useState } from "react";

function useHttp() {
  const [error, setError] = useState(null);

  const sendRequest = async (config, callback) => {
    try {
      const respone = await fetch(config.url, {
        method: config.method ? config.method : "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, image/*",
        },
        body: config.body ? JSON.stringify(config.body) : null,
        credentials: "include",
      });
      const data = await respone.json();
      if (respone.status === 200 || respone.status === 201) {
        if (callback) {
          callback(data);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    error,
    setError,
    sendRequest,
  };
}

export default useHttp;
