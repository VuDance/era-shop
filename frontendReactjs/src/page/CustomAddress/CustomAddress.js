import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAddress, removeAddress } from "../../redux/Reducer/addressSlice";
import { getAddress } from "../../service/addressService";
import "./customAddress.css";

const CustomAddress = () => {
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ward, setWard] = useState([]);
  const [cityValue, setCityValue] = useState("");
  const [districtsValue, setDistrictsValue] = useState("");
  const [nameReceive, setNameReceive] = useState("");
  const [address1Value, setAddress1Value] = useState("");
  const [address2Value, setAddress2Value] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [filter, setFilter] = useState([]);
  const [filter2, setFilter2] = useState([]);
  const [addressOrder, setAddressOrder] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address.address);
  const getDistricsData = async (cityName) => {
    let data = await city.find((x) => x.name === cityName);
    setDistricts(data.districts);
    // getWard(data.districts);
  };
  const getAddressData = async () => {
    const res = await getAddress();
    setCity(res.data);
  };
  const getWard = (districtsName) => {
    let data = districts.find((x) => x.name === districtsName);
    setWard(data.wards);
    // console.log(data);
  };
  const handleCity = (e) => {
    setCityValue(e.target.value);
    getDistricsData(e.target.value);
  };
  const handleDistrict = (e) => {
    setDistrictsValue(e.target.value);
    getWard(e.target.value);
  };
  const handleAddress1 = (value) => {
    setAddress1Value(value);
    if (value.length === 0) {
      setFilter([]);
    } else {
      let filterValue = value.split(" ");

      if (filterValue.at(-1).length === 0) {
        return;
      } else {
        const data = ward.filter((x) =>
          x.name.toLowerCase().includes(filterValue.at(-1))
        );
        setFilter(data);
      }
    }
  };
  const handleAddress2 = (value) => {
    setAddress2Value(value);
    if (value.length === 0) {
      setFilter2([]);
    } else {
      let filterValue = value.split(" ");

      if (filterValue.at(-1).length === 0) {
        return;
      } else {
        const data = ward.filter((x) =>
          x.name.toLowerCase().includes(filterValue.at(-1))
        );
        setFilter2(data);
      }
    }
  };
  const handleSetAddress1Value = (e) => {
    const value = address1Value.split(" ");
    value[value.length - 1] = e;
    setAddress1Value(value.toString());
    setFilter([]);
  };
  const handleSetAddress2Value = (e) => {
    const value = address2Value.split(" ");
    value[value.length - 1] = e;
    setAddress2Value(value.toString());
    setFilter2([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = [
      nameReceive,
      cityValue,
      districtsValue,
      address1Value,
      address2Value,
      phone,
      email,
      note,
    ];
    if (
      nameReceive.length === 0 ||
      cityValue.length === 0 ||
      districtsValue.length === 0 ||
      address1Value.length === 0 ||
      address2Value.length === 0 ||
      phone.length === 0 ||
      email.length === 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      let res = "";
      for (var i = 0; i < data.length; i++) {
        res = res + data[i] + ";";
      }
      // dispatch(removeAddress());
      dispatch(loadAddress(res));
      navigate("/order-summary");
    }
  };
  const getCurrentAddress = (address) => {
    const data = address.split(";");
    setNameReceive(data[0]);
    setPhone(data[5]);
    setEmail(data[6]);
    setNote(data[7]);
  };
  useEffect(() => {
    getAddressData();
    getCurrentAddress(address);
  }, []);

  return (
    <div className="address_wrapper">
      <form className="form-address">
        <h3>Thông tin thanh toán</h3>
        <div className="form-input-address">
          <label htmlFor="name-deliver">Họ tên người nhận / Full name :</label>
          <input
            placeholder="Họ tên của bạn"
            value={nameReceive}
            id="name-deliver"
            onChange={(e) => setNameReceive(e.target.value)}
          />
        </div>
        <div className="address-option">
          <div className="form-input-address">
            <label htmlFor="citySelect">Tỉnh / Thành phố / City :</label>
            <select
              id="citySelect"
              value={cityValue}
              onChange={(e) => handleCity(e)}
            >
              <option>----chon----</option>
              {city.map((i) => (
                <option>{i.name}</option>
              ))}
            </select>
          </div>
          <div className="form-input-address">
            <label htmlFor="districtsSelect">Quận / Huyện / Districts:</label>
            <select
              id="districtsSelect"
              value={districtsValue}
              onChange={(e) => handleDistrict(e)}
            >
              <option>----chon----</option>
              {districts.map((i) => (
                <option>{i.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-input-address">
          <label htmlFor="address1Value">
            Địa chỉ dòng 1 / Address line 1 :
          </label>
          <input
            required
            id="address1Value"
            value={address1Value}
            placeholder="Nhập địa chỉ dòng 1"
            onChange={(e) => handleAddress1(e.target.value)}
          />
          <div className="detail-address">
            {filter.length > 0 && (
              <>
                {filter.map((i) => (
                  <div
                    style={{ padding: 5, cursor: "pointer" }}
                    onClick={() => handleSetAddress1Value(i.name)}
                  >
                    {i.name}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="form-input-address">
          <label htmlFor="address2Value">
            Địa chỉ dòng 2 / Address line 2 :
          </label>
          <input
            required
            id="address2Value"
            value={address2Value}
            placeholder="Nhập địa chỉ dòng 2"
            onChange={(e) => {
              handleAddress2(e.target.value);
            }}
          />
          <div className="detail-address">
            {filter2.length > 0 && (
              <>
                {filter2.map((i) => (
                  <div
                    style={{ padding: 5, cursor: "pointer" }}
                    onClick={() => handleSetAddress2Value(i.name)}
                  >
                    {i.name}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="address-option">
          <div className="form-input-address">
            <label htmlFor="phone">Điện thoại liên hệ / Phone number : </label>
            <input
              required
              value={phone}
              type="text"
              id="phone"
              placeholder="Số điện thoại"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-input-address">
            <label htmlFor="mail">Email liên hệ / Email :</label>
            <input
              required
              type="email"
              value={email}
              id="mail"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="noteDelivery">
          <label htmlFor="note">
            Ghi chú giao hàng / Delivery instructions :{" "}
          </label>
          <textarea
            id="note"
            value={note}
            placeholder="Ghi chú về đơn hàng, ví dụ thời gian hay địa chỉ chi tiết hơn"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button className="sendbtn" onClick={(e) => handleSubmit(e)}>
          Giao đến địa chỉ này / Deliver to this address
        </button>
      </form>
    </div>
  );
};

export default CustomAddress;
