import classes from "./Table.module.css";
import Card from "../UI/Card";

function Table({ headers, data, title }) {
  const headerTable = (
    <thead className={classes.header}>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
  const bodyTable = (
    <tbody className={classes.body}>
      {data.map((transaction, i) => (
        <tr key={i}>
          {transaction.map((value, iv) => (
            <td key={iv}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
  return (
    <table className={classes.table}>
      {headerTable}
      {bodyTable}
    </table>
  );
}

export default Table;
