import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../store/AuthContext";
import { serverURL } from "../../utils/global";
import classes from "./Transactions.module.css";

function Transactions() {
  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthContext);
  console.log(authCtx)
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    sendRequest(
      { url: `${serverURL}/transactions/${authCtx.userId}` },
      (data) => {
        console.log(data);
        setTransactions(data);
      }
    );
  }, []);
  const tableTransactions = transactions.map((transaction, idx) => {
    const getLocalStringDate = (strDate) => {
      const options = { year: "numeric", month: "numeric", day: "numeric" };

      return new Date(strDate).toLocaleDateString("vi-VN", options);
    };
    const dateRange = `${getLocalStringDate(
      transaction.dateStart
    )} - ${getLocalStringDate(transaction.dateEnd)}`;
    const dynamicClass = {
      Booked: classes.booked,
      Checkin: classes.checkin,
      Checkout: classes.checkout,
    };
    return (
      <tr>
        <td>{(idx + 1).toString().padStart(2, "0")}</td>
        <td>{transaction.hotel.title}</td>
        <td>{transaction.rooms.join(", ")}</td>
        <td>{dateRange}</td>
        <td>{transaction.price}</td>
        <td>{transaction.payment}</td>
        <td>
          <span className={dynamicClass[transaction.status]}> 
            {transaction.status}
          </span>
        </td>
      </tr>
    );
  });
  return (
    <table className={classes.transactions}>
      <tr>
        <th>#</th>
        <th>Hotel</th>
        <th>Room</th>
        <th>Date</th>
        <th>Price</th>
        <th>Payment Method</th>
        <th>Status</th>
      </tr>
      {tableTransactions}
    </table>
  );
}

export default Transactions;
