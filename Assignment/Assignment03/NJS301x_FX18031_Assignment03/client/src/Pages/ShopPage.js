import Container from "../component/UI/Container";
import BannerFrame from "../component/Banner/BannerFrame";
import ProductList from "../component/ProductList/ProductList";
import Sidebar from "../component/Sidebar/Sidebar";
import FilterBar from "../component/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";

const ShopPage = (props) => {
  const [products, setProducts] = useState([]);
  const { sendRequest } = useHttp();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (products.length === 0) {
      sendRequest({ url: `${serverUrl}/products` }, (data) => {
        setProducts(data);
      });
    }
  }, []);
  return (
    <Container>
      <BannerFrame pageName="Shop" />
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <FilterBar></FilterBar>
          <ProductList
            numCols="5"
            showTitle={false}
            itemToDetail={true}
            data={products}
          />
        </div>
      </div>
    </Container>
  );
};

export default ShopPage;
