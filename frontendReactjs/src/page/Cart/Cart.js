import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  loadData,
  removeItem,
} from "../../redux/Reducer/cartSlice";
import { getCart, orderCart, removeCart } from "../../service/cartService";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const idUser = useSelector((state) => state.auth.login.currentUser);
  const cart = useSelector((state) => state.cart.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async (id) => {
    const res = await getCart(id);
    setData(cart);
    dispatch(loadData(res.data.cart));
  };

  const handleIncreaseQty = (item) => {
    dispatch(increaseQty(item));
  };
  const handleDecreaseQty = (item) => {
    dispatch(decreaseQty(item));
  };
  const handleRemove = async (item) => {
    await removeCart(item.id);
    dispatch(removeItem(item));
  };
  const priceCheckOut = (cart) => {
    const sum = cart.reduce(function (result, item) {
      return result + item.priceTotal * item.qty;
    }, 0);
    return sum;
  };
  const handleUploadCart = async (e) => {
    let next = 0;
    e.preventDefault();
    const data = [...cart];
    for (var i = 0; i < data.length; i++) {
      await orderCart(cart[i]);
      if (i === data.length - 1) {
        next = 1;
      }
    }
    if (next === 1) {
      navigate("/set-address");
    }
  };
  useEffect(() => {
    if (idUser) {
      getData(idUser.userNoPassword.id);
    }
  }, []);

  return (
    <div className="cart-wrapper">
      <div>
        <table>
          {idUser ? (
            <>
              <h4>{`GIỎ HÀNG (${cart.length} sản phẩm) `}</h4>
              <tr>
                <th>Sản phẩm / Product name</th>
                <th style={{ paddingLeft: 100, paddingRight: 100 }}>
                  Giá / Price
                </th>
                <th>Số lượng / Qty</th>
              </tr>
              {cart.map((i) => (
                <tr key={i.id} className="cart-item">
                  <td style={{ display: "flex" }}>
                    <img src={i.image} />
                    <div>
                      <p>{i.name}</p>
                      <p onClick={() => handleRemove(i)}>xoa</p>
                    </div>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: 700,
                    }}
                  >
                    {i.priceTotal}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 10 }}>
                      <div className="quantity-input">
                        <button
                          disabled={i.qty === 1}
                          onClick={() => handleDecreaseQty(i)}
                        >
                          <MinusOutlined />
                        </button>
                        <input
                          className="quantity-input-num"
                          type="text"
                          value={i.qty}
                          readOnly
                        />
                        <button onClick={() => handleIncreaseQty(i)}>
                          <PlusOutlined />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              <div></div>
            </>
          ) : (
            "no User"
          )}
        </table>
      </div>
      <div className="CheckOut">
        <div style={{ display: "flex", height: "70%", paddingLeft: 30 }}>
          <p style={{ fontWeight: 700, marginRight: 10 }}>
            {`Tạm tính (${cart.length} sản phẩm) : `}{" "}
          </p>
          <p style={{ fontWeight: 700, color: "red" }}>
            {priceCheckOut(cart)} d
          </p>
        </div>
        <button className="checkoutBtn" onClick={(e) => handleUploadCart(e)}>
          Đặt hàng / Check out
        </button>
      </div>
    </div>
  );
};

export default Cart;
