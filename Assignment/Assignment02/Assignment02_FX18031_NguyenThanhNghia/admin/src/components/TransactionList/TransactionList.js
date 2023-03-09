import classes from "./Pagenavigation.module.css";
import classesTransaction from "../DashBoard/Transactions.module.css";
import Card from "../UI/Card";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
import Table from "../Table/Table";
import { convertDateToStr } from "../../utils/global";

function TransactionList() {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    maxPage: 1,
    totalResult: 0,
  });
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
    sendRequest(
      { url: `${serverURL}/admin/transactions?page=${pageInfo.page}` },
      (data) => {
        console.log(data);
        setPageInfo({
          page: data.page,
          totalResult: data.totalResult,
          maxPage: data.maxPage,
        });
        setData(
          data.result.map((transaction) => {
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
      }
    );
  }, []);

  const prevPageHandler = () => {
    setPageInfo((prev) => {
      const prevPage = prev.page - 1;
      return { ...prev, page: prevPage >= 1 ? prevPage : prev.page };
    });
  };

  const nextPageHandler = () => {
    setPageInfo((prev) => {
      const nextPage = prev.page + 1;
      return { ...prev, page: nextPage <= prev.maxPage ? nextPage : prev.page };
    });
  };

  return (
    <Card>
      <h3 className="text-secondary">Transaction List</h3>
      {data && (
        <>
          <Table headers={headers} data={data} />
          <div className={classes["page-navigation"]}>
            <span>
              {pageInfo.page}-{pageInfo.maxPage} of {pageInfo.maxPage}
            </span>
            <button onClick={prevPageHandler}>
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={nextPageHandler}>
              {" "}
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </Card>
  );
}

export default TransactionList;
