import DetailProduct from "../component/DetailProduct/DetailProduct";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";

const DetailPage = (props) => {
  const params = useParams(); // get params from url
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { isLoading, sendRequest } = useHttp();
  useEffect(() => {
    window.scrollTo(0, 0);
    sendRequest({ url: `${serverUrl}/product/${params.id}` }, (data) => {
      setProduct(data);
    });
    sendRequest(
      { url: `${serverUrl}/product-related/${params.id}` },
      (data) => {
        setRelatedProduct(data);
      }
    );
  }, [params.id]);
  return (
    <div>
      {/* passing params ID to DetailProduct */}
      {product && (
        <DetailProduct
          id={params.id}
          product={product}
          relatedProduct={relatedProduct}
        />
      )}
    </div>
  );
};

export default DetailPage;
