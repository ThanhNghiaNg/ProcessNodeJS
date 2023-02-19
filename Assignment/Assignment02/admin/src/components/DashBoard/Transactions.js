import classes from "./Transactions.module.css";
import Card from "../UI/Card";
import Table from "../Table/Table";
import { convertDateToStr } from "../../utils/global";
import { useState } from "react";

function Transactions({ transactions }) {
  const [checkAll, setCheckAll] = useState(false);
  const checkAllHandler = (event) => {
    setCheckAll(event.target.checked);
  };

  const onSelectTransactionHandler = (event) => {
    setCheckAll(false);
  };

  const headers = [
    <input
      type="checkbox"
      onChange={checkAllHandler}
      checked={checkAll}
    ></input>,
    "ID",
    "User",
    "Hotel",
    "Room",
    "Date",
    "Price",
    "Payment Method",
    "Status",
  ];
  const dynamicClass = {
    Booked: classes.booked,
    Checkin: classes.checkin,
    Checkout: classes.checkout,
  };

  const data = transactions.map((transaction) => [
    <input
      type="checkbox"
      id={transaction._id}
      checked={checkAll}
      onChange={onSelectTransactionHandler}
    ></input>,
    transaction._id,
    transaction.user.username,
    transaction.hotel.name,
    transaction.rooms.join(", "),
    `${convertDateToStr(new Date(transaction.dateStart))} - ${convertDateToStr(
      new Date(transaction.dateStart)
    )}`,
    transaction.price,
    transaction.payment,
    <span className={dynamicClass[transaction.status]}>
      {transaction.status}
    </span>,
  ]);
  return (
    <Card className={classes.transactions}>
      <h3 className="text-secondary">Latest Transactions</h3>
      <Table headers={headers} data={data} />;
    </Card>
  );
}

export default Transactions;
