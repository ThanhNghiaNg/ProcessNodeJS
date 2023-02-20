import classes from "./TransactionList.module.css";
import classesTransaction from "../DashBoard/Transactions.module.css";
import Card from "../UI/Card";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
import Table from "../Table/Table";
import { convertDateToStr } from "../../utils/global";

function TransactionList() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const { sendRequest } = useHttp();
  const headers = [
    <input type={"checkbox"}></input>,
    "ID",
    "User",
    "Hotel",
    "Room",
    "Date",
    "Price",
    "Payment method",
    "Status",
  ];
  const dynamicClass = {
    Booked: classesTransaction.booked,
    Checkin: classesTransaction.checkin,
    Checkout: classesTransaction.checkout,
  };
  useEffect(() => {
    sendRequest({ url: `${serverURL}/admin/transactions` }, (data) => {
      console.log(data);
      setData(
        data.map((transaction) => {
          return [
            <input type={"checkbox"}></input>,
            transaction._id,
            transaction.user.username,
            transaction.hotel.name,
            transaction.rooms.join(", "),
            `${convertDateToStr(
              new Date(transaction.dateStart)
            )} - ${convertDateToStr(new Date(transaction.dateEnd))}`,
            transaction.price,
            transaction.payment,
            <span className={dynamicClass[transaction.status]}>
              {transaction.status}
            </span>,
          ];
        })
      );
    });
  }, []);
  return (
    <Card>
      <h3 className="text-secondary">Transaction List</h3>
      {data[0] && <Table headers={headers} data={data} />}
    </Card>
  );
}

export default TransactionList;
