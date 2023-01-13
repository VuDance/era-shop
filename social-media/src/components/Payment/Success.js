import React from "react";
import { Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAddress } from "../../redux/Reducer/addressSlice";
import { removeCart } from "../../redux/Reducer/cartSlice";
import { removeOrder } from "../../redux/Reducer/orderSlice";

const Success = () => {
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = async () => {
    dispatch(removeCart());
    dispatch(removeOrder());
    dispatch(removeAddress());

    navigate("/");
  };
  return (
    <Result
      status="success"
      title="ĐẶT HÀNG THÀNH CÔNG"
      subTitle={`Đơn hàng #${order.uniqueId} đã được đặt thành công`}
      extra={[
        <Button key="buy" onClick={handleClose}>
          Go to home
        </Button>,
      ]}
    />
  );
};

export default Success;
