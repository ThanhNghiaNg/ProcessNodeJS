import "./FooterCol.css";

const FooterCol = (props) => {
  let contentFooterCol = <p></p>;
  if (props.item.col_values.length > 0) {
    contentFooterCol = props.item.col_values.map((field) => {
      return <div key={field}>{field}</div>;
    });
  }
  return <div className="footer-col">{contentFooterCol}</div>;
};

export default FooterCol;
