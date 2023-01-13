import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartOrdered } from "../../service/cartService";
import { getOrder, updateOrder } from "../../service/orderService";

const MyOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [cart, setCart] = useState([]);
  const user = useSelector((state) => state.auth.login.currentUser);
  const getData = async (id) => {
    const data = await getOrder(id);
    setOrderList(data.data.data);
    console.log(data.data.data);
  };
  const getCart = async (id) => {
    const data = await getCartOrdered(id);
    setCart(data.data.cart);
  };
  const handleCancleOrder = async (e, uniqueId) => {
    e.preventDefault();
    const data = { uniqueId: uniqueId, paid: false, wait: false };
    await updateOrder(data);
    window.location.reload();
  };
  useEffect(() => {
    getData(user.userNoPassword.id);
    getCart(user.userNoPassword.id);
  }, []);
  return (
    <div>
      {orderList.map((i) => (
        <div className="order-item">
          <table className="table-order">
            <tr>
              <th>
                {i.wait && (
                  <p style={{ color: "orange", margin: 0 }}>Đang chờ</p>
                )}
                {i.paid && (
                  <p style={{ color: "green", margin: 0 }}>Đã thanh toán</p>
                )}
                {i.paid == 0 && (
                  <p style={{ color: "red", margin: 0 }}>Đã hủy</p>
                )}
                {i.transport && (
                  <p style={{ color: "green", margin: 0 }}>Đang vận chuyển</p>
                )}
              </th>
            </tr>
            {cart
              .filter((e) => e.belong === i.uniqueId)
              .map((a) => (
                <>
                  <tr className="cart-item" style={{ height: 100 }}>
                    <td style={{ display: "flex" }}>
                      <img src={a.image} />
                      <div>
                        <p>{a.name}</p>
                        <p>x{a.qty}</p>
                      </div>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontWeight: 700,
                        width: 200,
                      }}
                    >
                      {a.priceTotal}
                    </td>
                  </tr>
                </>
              ))}
            <tr
              style={{
                borderTop: 1,
                width: "100%",
              }}
            >
              {i.paid != 0 ? (
                <td style={{ fontWeight: 700 }}>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "#b1488e",
                      padding: 5,
                      color: "white",
                      borderRadius: 3,
                    }}
                    onClick={(e) => handleCancleOrder(e, i.uniqueId)}
                  >
                    Hủy đơn hàng
                  </button>
                </td>
              ) : (
                <></>
              )}
              <td
                style={{
                  display: "flex",
                  textAlign: "center",
                  color: "red",
                  fontWeight: 700,
                  gap: 10,
                }}
              >
                <p>Tổng cộng :</p>
                <p>{i.totalPrice}</p>
              </td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
