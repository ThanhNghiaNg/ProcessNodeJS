import classes from "./Button.module.css";

function Button(props) {
  const btnClasses = `${classes.button} ${props.className}`;
  return (
    <button
      className={btnClasses}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </button>
  );
}

export default Button;
