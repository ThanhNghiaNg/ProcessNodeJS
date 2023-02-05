import { useState } from "react";
import classes from "./OrderForm.module.css";
const OrderForm = (props) => {
  const _classes = `${classes.form} ${props.className}`;
  // new Date(date[1].split('/').reverse().join('/'))
  const [date, setDate] = useState(new Date().toLocaleString().split(","));
  const [supplier, setSupplier] = useState("");
  const [consumer, setConsumer] = useState("");
  const [item, setItem] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState("");
  const [orderType, setOrderType] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const addOrderHandler = (event) => {
    event.preventDefault();
  };
  return (
    <section className={_classes}>
      <form>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Ngày</label>
          <div className="col">
            <input
              type="text"
              placeholder="Ngày"
              className="form-control"
              defaultValue={date[1]}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Người cấp hàng</label>
          <div className="col">
            <select placeholder="Người cấp hàng" className="form-control">
              <option value={"Hạnh"}>Hạnh</option>
              <option value={"Sáu"}>Sáu</option>
              <option value={"Hiền"}>Hiền</option>
              <option value={"Nga"}>Nga</option>
              <option value={"Út Dương"}>Út Dương</option>
              <option value={"Ba"}>Ba</option>
              <option value={"Mẹ"}>Mẹ</option>
              <option value={"Anh Ba"}>Anh Ba</option>
              <option value={"Em"}>Em</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Người nhận hàng</label>
          <div className="col">
            <select className="form-control">
              <option value={"Ba"}>Ba</option>
              <option value={"Mẹ"}>Mẹ</option>
              <option value={"Em"}>Em</option>
              <option value={"Anh Ba"}>Anh Ba</option>
              <option value={"Hoà"}>Hoà</option>
              <option value={"Năm năm"}>Năm năm</option>
              <option value={"Ánh"}>Ánh</option>
              <option value={"ITO"}>ITO</option>
              <option value={"Thoa"}>Thoa</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Mặt hàng</label>
          <div className="col">
            <select className="form-control">
              <option value={"Đường cam"}>Đường cam</option>
              <option value={"Da xanh"}>Da xanh</option>
              <option value={"Thùng"}>Thùng</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Loại</label>
          <div className="col">
            <input
              type="text"
              placeholder="Loại hàng"
              className="form-control"
              defaultValue={1}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Số lượng</label>
          <div className="col">
            <input
              type="number"
              placeholder="Số lượng"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Đơn giá</label>
          <div className="col">
            <input
              type="number"
              placeholder="Đơn giá"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Thành tiền</label>
          <div className="col">
            <input
              type="number"
              placeholder="Thành tiền"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Giờ nhận hàng</label>
          <div className="col">
            <input
              type="text"
              placeholder="Giờ nhận hàng"
              className="form-control"
              defaultValue={date[0]}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Loại giao dịch</label>
          <div className="col">
            <select className="form-control">
              <option value={"Mua"}>Mua</option>
              <option value={"Bán"}>Bán</option>
              <option value={"Trao đổi"}>Trao đổi</option>
              <option value={"Khác"}>Khác</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Trạng thái</label>
          <div className="col">
            <select className="form-control">
              <option value={"Chưa thanh toán"}>Chưa thanh toán</option>
              <option value={"Đã thanh toán"}>Đã thanh toán</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-4 col-form-label">Ghi chú</label>
          <div className="col">
            <input type="text" placeholder="Ghi chú" className="form-control" />
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={addOrderHandler}>
            Thêm
          </button>
        </div>
      </form>
    </section>
  );
};
export default OrderForm;
