import Container from "../component/UI/Container";
import Banner from "../component/Banner/Banner";
import CategoryList from "../component/CategoryList/CategoryList";
import ProductList from "../component/ProductList/ProductList";
import MoreInfo from "../component/MoreInfo/MoreInfo";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";

const HomePage = (props) => {
  const { sendRequest } = useHttp();
  const [imagePaths, setImagePaths] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    sendRequest({ url: `${serverUrl}/images-home` }, (data) => {
      setImagePaths(data);
    });
    sendRequest({ url: `${serverUrl}/products-home` }, (data) => {
      setProducts(data);
    });
  }, []);
  return (
    <Container>
      {imagePaths && <Banner bannerSrc={imagePaths.bannerPath} />}
      {imagePaths && (
        <CategoryList categoriesSrc={imagePaths.categoriesPaths} />
      )}
      <ProductList showTitle={true} showAll={true} data={products} />
      <MoreInfo />
    </Container>
  );
};

export default HomePage;
