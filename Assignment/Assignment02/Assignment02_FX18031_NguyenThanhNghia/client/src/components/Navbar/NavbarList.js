import "./NavbarList.css";
import NavbarItem
 from "./NavbarItem";
const NavbarItems = (props) => {
  let navbaItemsContent = <p>Have no data</p>;
  if (props.data.length > 0) {
    navbaItemsContent = props.data.map((item) => {
      return (
        <NavbarItem key={item.type+item.icon} item={item}/>
      );
    });
  }
  return <div className="navbar-list">{navbaItemsContent}</div>;
};

export default NavbarItems;
