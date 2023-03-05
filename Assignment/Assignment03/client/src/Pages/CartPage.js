import Container from "../component/UI/Container";
import BannerFrame from "../component/Banner/BannerFrame";
import Cart from "../component/Cart/Cart";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";

const CartPage = (props) => {
  const [cart, setCart] = useState([]);
  const { sendRequest } = useHttp();
  const [onLoad, setonLoad] = useState(false);
  useEffect(() => {
    sendRequest({ url: `${serverUrl}/cart` }, (data) => {
      setCart(data.items);
    });
  }, [onLoad]);
  const onLoadHandler = ()=>{
    setonLoad(prev=>!prev)
  }
  return (
    <Container>
      <BannerFrame pageName="Cart" />
      <Cart cart={cart} onLoad={onLoadHandler}/>
    </Container>
  );
};

export default CartPage;
