import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InfoBoard from "../components/InfoBoard/InfoBoard";
import Orders from "../components/Orders/Orders";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/global";

function DashBoard(props) {
  const { sendRequest } = useHttp();
  const [data, setData] = useState(null);

  useEffect(() => {
    sendRequest({ url: `${serverUrl}/admin/dashboard` }, (data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <p className="my-3 text-secondary">Dashboard</p>
      {data && (
        <>
          <InfoBoard info={data.info} />
          <Orders orders={data.orders} />
        </>
      )}
    </div>
  );
}

export default DashBoard;
