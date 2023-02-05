import OrderForm from "../components/OrderForm/OrderForm";
import OrderList from "../components/OrderList/OrderList";
const Home = (props) => {
  return (
    <div className="row container-fluid">
      <OrderForm className="col-5" />
      <OrderList className="col" />
    </div>
  );
};

export default Home;
