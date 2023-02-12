import RegisterForm from "../../components/RegisterForm/RegisterForm";
import DetailBody from "../../components/DetailBody/DetailBody";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";

const Detail = () => {
  const [data, setData] = useState(null);
  const { sendRequest: getHotel } = useHttp();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    getHotel({ url: `${serverURL}/hotel/${id}` }, (data) => {
      setData(data);
    });
  }, [id]);
  return (
    <div>
      {data && <DetailBody data = {data}/>}
      <RegisterForm />
    </div>
  );
};

export default Detail;
