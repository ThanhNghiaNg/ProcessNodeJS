import classes from "./DashBoard.module.css";
import InfoBoard from "./InfoBoard";
import Transactions from "./Transactions";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { serverURL } from "../../utils/global";

function DashBoard(props) {
  const { sendRequest } = useHttp();
  const [data, setData] = useState(null);
  useEffect(() => {
    sendRequest({ url: `${serverURL}/admin/overall` }, (data) => {
      console.log(data)
      setData(data);
    });
  }, []);
  return (
    <>
      {data && (
        <InfoBoard
          headers={["users", "orders", "earnings", "balance"]}
          values={[
            data.numberUser,
            data.numberTransactions,
            data.earnings,
            data.avgEarnings,
          ]}
          icons={[
            <i className={`fa-solid fa-user bg-danger ${classes.icon}`}></i>,
            <i
              className={`fa-solid fa-cart-shopping bg-warning ${classes.icon}`}
            ></i>,
            <i
              className={`fa-solid fa-circle-dollar-to-slot bg-success ${classes.icon}`}
            ></i>,
            <i className={`fa-solid fa-wallet bg-info ${classes.icon}`}></i>,
          ]}
        />
      )}
      {data && <Transactions transactions={data.latestTransaction}/>}
    </>
  );
}

export default DashBoard;
