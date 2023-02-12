import "./NavbarItem.css";

const NavbarItem = (props) => {
  return (
    <a className={`navbar-item ${props.item.active ? "active" : ""}`} href="#">
      <span>
        <i className={`fa ${props.item.icon}`} aria-hidden="true"></i>
      </span>
      <label>{props.item.type}</label>
    </a>
  );
};

export default NavbarItem;
