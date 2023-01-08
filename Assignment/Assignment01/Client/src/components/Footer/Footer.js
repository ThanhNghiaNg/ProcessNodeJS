import Container from "../UI/Container";
import classes from "./Footer.module.css";
import React from "react";

const Footer = (props) => {
  // change footer css to fixed when using search page without result
  const footerClasses = props.isFixed
    ? `${classes.footer} ${classes.fixed}`
    : classes.footer;
  return (
    <Container className={footerClasses}>
      <div className={classes.col}>
        <a href="#">FAQ</a>
        <a href="#">Investor Relations</a>
        <a href="#">Ways to Watch</a>
        <a href="#">Corporate Information</a>
        <a href="#">Netflix Originals</a>
      </div>
      <div className={classes.col}>
        <a href="#">Help Center</a>
        <a href="#">Jobs</a>
        <a href="#">Terms of Use</a>
        <a href="#">Contact Us</a>
      </div>
      <div className={classes.col}>
        <a href="#">Account</a>
        <a href="#">Redeem Gift Cards</a>
        <a href="#">Privacy</a>
        <a href="#">Speed Test</a>
      </div>
      <div className={classes.col}>
        <a href="#">Media Center</a>
        <a href="#">Buy Gift Cards</a>
        <a href="#">Cookies Preferences</a>
        <a href="#">Legal Notices</a>
      </div>
    </Container>
  );
};

export default Footer;
