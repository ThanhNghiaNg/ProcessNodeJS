import classes from "./History.module.css";
import useHttp from "../../hooks/useHttp";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../utils/constant";
import Order from "./Order";

function History(props) {
  const { isLoading, sendRequest } = useHttp();
  const [history, setHistory] = useState([]);
  useEffect(() => {
    sendRequest({ url: `${serverUrl}/history` }, (data) => {
      console.log(data);
      setHistory(data);
    });
  }, []);
  let tableBodyContent;
  if (history.length > 0) {
    tableBodyContent = history.map((order, idx) => {
      return <Order order={order} key={idx} />;
    });
  }
  if (!isLoading && history.length === 0) {
    tableBodyContent = (
      <p className="text-center fs-2 fs-italic">You have no order history!</p>
    );
  }
  return (
    <table className={classes.history}>
      <thead>
        <tr>
          <th>id order</th>
          <th>id user</th>
          <th>name</th>
          <th>phone</th>
          <th>address</th>
          <th>total</th>
          <th>delivery</th>
          <th>status</th>
          <th>detail</th>
        </tr>
      </thead>
      <tbody>{tableBodyContent}</tbody>
    </table>
  );
}

export default History;
