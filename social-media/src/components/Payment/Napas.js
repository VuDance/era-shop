import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./Payment.css";
import Success from "./Success";

const Napas = ({ handleConfirm, payment }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (e) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setComplete(true);
    }, 2000);
    await handleConfirm(e);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" className="confirm-btn-napas" onClick={showModal}>
        Đặt hàng / Place your order
      </Button>
      {complete && (
        <Modal
          className="modal-payment-success"
          open={complete}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          closable={false}
        >
          <Success />
        </Modal>
      )}
      <Modal
        className={
          payment === "Ví MOMO" ? "modal-payment-momo" : "modal-payment-napas"
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};

export default Napas;
