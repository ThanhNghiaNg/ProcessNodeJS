import classes from "./InfoBoard.module.css";
import React from "react";
import { addStyleCurrency } from "../../utils/global";
import Card from "../UI/Card";

function InfoBoard({ info }) {
  console.log(info);
  return (
    <div className={classes.info}>
      <Card className={classes.info__item}>
        <div className={classes.info__item__value}>
          <h4>{info.clients}</h4>
          <p className="text-secondary">Clients</p>
        </div>
        <div className={classes.info__item__icon}>
          <i class="fa-solid fa-user-plus text-secondary"></i>
        </div>
      </Card>
      <Card className={classes.info__item}>
        <div className={classes.info__item__value}>
          <h4>{addStyleCurrency(info.monthEarning)}<sup>VNĐ</sup></h4>
          <p className="text-secondary">Earnings of Month</p>
        </div>
        <div className={classes.info__item__icon}>
          <i className="fa-solid fa-dollar-sign text-secondary"></i>
        </div>
      </Card>
      <Card className={classes.info__item}>
        <div className={classes.info__item__value}>
          <h4>{info.numOrders}</h4>
          <p className="text-secondary">New Order</p>
        </div>
        <div className={classes.info__item__icon}>
          <i className="fa-solid fa-file-circle-plus text-secondary"></i>
        </div>
      </Card>
    </div>
  );
}

export default InfoBoard;
