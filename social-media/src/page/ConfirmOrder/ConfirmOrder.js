import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../service/orderService";
import { RightCircleOutlined } from "@ant-design/icons";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import Napas from "../../components/Payment/Napas";
import { addNoti } from "../../redux/Reducer/notificationSlice";
import { uploadNoti } from "../../service/notificationService";

const shipCostMax = 30000;
const shipCostMin = 15000;
const ConfirmOrder = () => {
  const [inforOrder, setInforUser] = useState({});
  const [addressOrder, setAddressOrder] = useState([]);
  const [payment, setPayment] = useState([]);

  const order = useSelector((state) => state.order);
  const address = useSelector((state) => state.address.address);
  const cart = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const priceCheckOut = (cart) => {
    const sum = cart.reduce(function (result, item) {
      return result + item.priceTotal * item.qty;
    }, 0);
    return sum;
  };
  const getInforOrder = async () => {
    const data = order;
    setInforUser(data);
    splitAddress(address);
    setPayment(data.payment);
  };
  const splitAddress = (address) => {
    const data = address.split(";");
    setAddressOrder(data);
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    await createOrder(order);
    const data = {
      userId: user.userNoPassword.id,
      notification: `Đơn hàng #${order.uniqueId} đã được đặt thành công`,
    };
    await uploadNoti(data);
    dispatch(addNoti(data));
  };
  useEffect(() => {
    getInforOrder();
  }, []);
  return (
    <div className="confirm-order-wrapper">
      <div className="confirm-order-container">
        <div className="confirm-order-desc">
          <div>
            <h3 style={{ fontWeight: 700 }}>Xác nhận đơn hàng</h3>
            <p style={{ fontWeight: 700 }}>
              Kiểm tra lại đơn hàng trước khi đặt
            </p>
            <p style={{ fontWeight: 700 }}>Địa chỉ giao hàng : </p>
            <div className="confirm-order-address">
              <p>
                <RightCircleOutlined /> {addressOrder[0]}
              </p>
              <p>
                <RightCircleOutlined /> {addressOrder[3]}
              </p>
              <p>
                <RightCircleOutlined /> {addressOrder[4]}
              </p>
              <p>
                <RightCircleOutlined /> <span>{addressOrder[2]}</span>
              </p>
              <p>
                <RightCircleOutlined /> {addressOrder[1]}
              </p>
              <p>
                <RightCircleOutlined /> Điện thoại liên hệ : {addressOrder[5]}
              </p>
              <p>
                <RightCircleOutlined /> Ghi chú : {addressOrder[7]}
              </p>
            </div>
            <Link to="/set-address" className="confirm-order">
              Đổi địa chỉ giao hàng / Change shipping address
            </Link>
          </div>
          <div className="form-order">
            <h4>
              Tóm tắt đơn hàng /<br></br> Order Summary
            </h4>
            <p className="form-order-desc">
              <p> Số sản phẩm {`(${cart.length})`} :</p>{" "}
              <p>{priceCheckOut(cart)} đ</p>
            </p>
            <p className="form-order-desc">
              <p>Phí vận chuyển : </p>
              <p>{inforOrder.totalPrice ? shipCostMin : shipCostMax} đ</p>
            </p>

            <p className="form-order-desc">
              <p>Tổng cộng :</p> <p>{inforOrder.totalPrice} đ</p>
            </p>
          </div>
        </div>
        <div className="form-order-cart">
          <div className="form-order-cart-wrapper">
            <div>
              {" "}
              <h3>Các sản phẩm của giỏ hàng</h3>
              {cart.map((i) => (
                <div className="order-cart-item">
                  <div>
                    <img src={i.image} style={{ width: 100 }} />
                  </div>
                  <div>
                    <div>{i.name}</div>
                    <p style={{ display: "flex", gap: 20 }}>
                      <div>Số lượng: {i.qty}</div>
                      {"-"}
                      <div style={{ fontWeight: 700, color: "red" }}>
                        {i.priceTotal * i.qty} đ
                      </div>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h5 style={{ fontWeight: 700 }}>Phương thức vận chuyển</h5>
              <h6>
                {addressOrder[2] === "Thành phố Hồ Chí Minh"
                  ? "Vận chuyển nội thành TP.HCM"
                  : "Vận chuyển ngoại thành TP.HCM"}
              </h6>
              <h6 style={{ opacity: 0.6 }}>
                {addressOrder[2] === "Thành phố Hồ Chí Minh"
                  ? "Giao hàng từ 2-3 ngày"
                  : "Giao hàng từ 6-7 ngày"}
              </h6>
              <h5
                style={{
                  fontWeight: 700,
                }}
              >
                Phương thức thanh toán
              </h5>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  checked={payment === "Thanh toán nội bộ (ATM)"}
                  type="radio"
                  id="atm"
                  name="payment"
                  value="Thanh toán nội bộ (ATM)"
                  onChange={(e) => setPayment(e.target.value)}
                ></input>
                <label htmlFor="atm">{"Thanh toán nội bộ (ATM)"}</label>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  checked={payment === "Ví MOMO"}
                  type="radio"
                  name="payment"
                  value="Ví MOMO"
                  id="momo"
                  onChange={(e) => setPayment(e.target.value)}
                ></input>
                <label htmlFor="momo">{"Ví MOMO"}</label>
              </div>
            </div>
          </div>
        </div>
        {/* <button className="confirm-order" onClick={(e) => handleConfirm(e)}>
          Đặt hàng / Place your order
        </button> */}
        <Napas handleConfirm={handleConfirm} payment={payment}></Napas>
      </div>
    </div>
  );
};

export default ConfirmOrder;
