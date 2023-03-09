import "./Container.css";

const Container = (props) => {
  const classes = "container-fluid " + props.className;
  return <div className={classes}>{props.children}</div>;
};
export default Container;
