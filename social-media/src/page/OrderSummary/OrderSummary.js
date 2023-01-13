import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../service/orderService";
import { v1 } from "uuid";
import { addUniqueId, removeAddress } from "../../redux/Reducer/addressSlice";
import "./OrderSummary.css";
import { addOrder } from "../../redux/Reducer/orderSlice";

const deliverPricemax = 30000;
const deliverPricemin = 15000;

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart.products);
  const user = useSelector(
    (state) => state.auth.login.currentUser.userNoPassword
  );
  const address = useSelector((state) => state.address.address);
  const dispatch = useDispatch();
  const id = v1();
  const [deliverPrice, setDeliverPrice] = useState(0);
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const priceCheckOut = (cart) => {
    const sum = cart.reduce(function (result, item) {
      return result + item.priceTotal * item.qty;
    }, 0);
    return sum;
  };
  const handleCheckout = async (e) => {
    e.preventDefault();
    dispatch(addUniqueId(id));
    const data = {
      uniqueId: id,
      userId: user.id,
      payment: payment,
      address: address,
      totalPrice: priceCheckOut(cart) + deliverPrice,
    };
    dispatch(addOrder(data));
    navigate("/confirm-order");
  };
  const handlePaymenBtn = (e) => {
    setPayment(e.target.value);
  };
  useEffect(() => {
    if (priceCheckOut(cart) > 10000) {
      setDeliverPrice(deliverPricemax);
    } else setDeliverPrice(deliverPricemin);
  }, []);
  return (
    <div className="payment-wrapper">
      <div className="form-payment">
        <div className="payment-container">
          <h3>Phương thức thanh toán</h3>
          <div className="payment-methods">
            <div>
              <input
                type="radio"
                id="atm"
                name="payment"
                value="Thanh toán nội bộ (ATM)"
                onChange={(e) => handlePaymenBtn(e)}
              ></input>
              <label htmlFor="atm">{"Thanh toán nội bộ (ATM)"}</label>
            </div>
            <div>
              <input
                type="radio"
                name="payment"
                value="Ví MOMO"
                id="momo"
                onChange={(e) => handlePaymenBtn(e)}
              ></input>
              <label htmlFor="momo">{"Ví MOMO"}</label>
            </div>
          </div>
          <button
            className="confirm-payment"
            disabled={payment.length === 0}
            onClick={(e) => handleCheckout(e)}
          >
            Xác nhận đơn hàng / Confirm your order
          </button>
        </div>
        <div className="form-summary">
          <h3 style={{ background: "#b1488e", color: "white", padding: 10 }}>
            Tóm tắt đơn hàng /<br></br> Order summary
          </h3>
          <div>
            <span>Sản phẩm {`(${cart.length})`} :</span>
            <span>{priceCheckOut(cart)} đ</span>
          </div>
          <div>
            <span>Phí vận chuyển :</span>
            <span>{deliverPrice} đ</span>
          </div>
          <div>
            <span>Thành tiền :</span>
            <h4 style={{ color: "red", fontWeight: 700 }}>
              {priceCheckOut(cart) + deliverPrice} đ
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
