import "./Footer.css";
import Container from "../UI/Container";
import FooterCol from "./FooterCol";

const Footer = (props) => {
  const dataFooter = require("../../data/footer.json");
  let contentFooter = <p>Have no data</p>;
  if (dataFooter.length > 0) {
    contentFooter = dataFooter.map((col, index) => {
      return <FooterCol key={index} item={col} />;
    });
  }
  return <Container className="footer">{contentFooter}</Container>;
};

export default Footer;
