import "./DataRangeCom.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import React from "react";
import { DateRange } from "react-date-range";

const DataRangeCom = (props) => {
  let dateRangeContent = <div></div>;
  if (props.onShow) {
    dateRangeContent = (
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          props.onUpdateRange([
            item.selection.startDate.toLocaleString(...props.options),
            item.selection.endDate.toLocaleString(...props.options),
            [item.selection],
          ]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={props.ranges}
      />
    );
  }
  const classes = `date-range-com ${props.className}`
  return <div className={classes}>{dateRangeContent}</div>;
};

export default DataRangeCom;
