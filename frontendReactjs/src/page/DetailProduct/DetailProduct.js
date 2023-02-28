import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDatabyCategory,
  getDeatilProduct,
} from "../../service/productsService";
import "./DetailProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../service/cartService";
import { CheckOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import Slide from "./Slide";
import { notification } from "antd";
import { loadData } from "../../redux/Reducer/cartSlice";

const DetailProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [value, setValue] = useState(1);
  const [attriArr, setAttriArr] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async (id) => {
    const res = await getDeatilProduct(id);
    setData(res.data.product);
    setAttriArr(res.data.product.attribue.split(", "));
    handleGetRandom(res.data.product);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData(id);
  }, []);
  const user = useSelector((state) => state.auth.login.currentUser);
  const openNotification = () => {
    notification.open({
      message: "Thêm vào giỏ",
      description: "Thêm thành công ",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const handleAddCart = () => {
    const cart = {
      name: data.name,
      image: data.image1,
      qty: value,
      ordered: false,
      priceTotal: data.price,
      userId: user.userNoPassword.id,
    };
    addCart(cart);
    openNotification();
  };
  const handleGetRandom = async (item) => {
    let category = item.category;
    const res = await getDatabyCategory(category);
    const shuffled = await res.data.product.sort(() => 0.5 - Math.random());
    let selected = await shuffled.slice(0, 10);
    setRandomProducts(selected);
  };
  const handleBuyNow = (e) => {
    e.preventDefault();
    const cart = {
      name: data.name,
      image: data.image1,
      qty: value,
      ordered: false,
      priceTotal: data.price,
      belong: null,
      userId: user.userNoPassword.id,
    };
    dispatch(loadData([cart]));
    addCart(cart);
    navigate("/set-address");
  };
  return (
    <div className="detail-product">
      <Header></Header>
      <div className="slider">
        <Slide data={data} />
      </div>
      <div className="product-desc">
        <h3>{data.name}</h3>
        {data.inventory === 0 && (
          <h4 style={{ color: "red" }}>HẾT HÀNG / OUT OF STOCK</h4>
        )}
        <h4 style={{ color: "red" }}>
          {data.price - data.price * (data.discount / 100) + " " + "đ"}
          <span style={{ fontSize: 15 }}>
            {" " + "-" + data.discount + "%"}
          </span>
        </h4>
        <h5
          style={{
            color: "black",
            textDecoration: "line-through",
          }}
        >
          {data.price + " " + "đ"}
        </h5>
        <ul style={{ padding: 0 }}>
          {attriArr.map((i) => (
            <li key={i.id} style={{ display: "flex", alignItems: "center" }}>
              <CheckOutlined />
              <span style={{ marginLeft: 5 }}>{i}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 10 }}>
          <p>Số lượng : </p>
          <div className="quantity-input">
            <button disabled={value === 1} onClick={() => setValue(value - 1)}>
              <MinusOutlined />
            </button>
            <input
              className="quantity-input-num"
              type="text"
              value={value}
              readOnly
            />
            <button
              disabled={data.inventory === 0}
              onClick={() => setValue(value + 1)}
            >
              <PlusOutlined />
            </button>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <button
            disabled={!user || data.inventory === 0}
            className="buyNow"
            onClick={(e) => handleBuyNow(e)}
          >
            Mua ngay
          </button>
          <button
            disabled={!user || data.inventory === 0}
            onClick={handleAddCart}
            className="addCart"
          >
            Thêm vào giỏ hàng
          </button>
          {!user && (
            <Link to="/login" className="login-now">
              Đăng nhập ngay để mua
            </Link>
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: 50,
          marginBottom: 50,
          paddingLeft: 50,
        }}
      >
        <h4>MÔ TẢ SẢN PHẨM</h4>
        <p>{data.desc}</p>
      </div>
      <h4 style={{ paddingLeft: 50 }}>SẢN PHẨM KHÁC</h4>
      <div className="random-product">
        <div className="random-items">
          {randomProducts.map((t) => (
            <a
              href={`/detail-${t.id}`}
              key={t.id}
              className={`card card-style1`}
            >
              <div>
                <img
                  className="card-img-top"
                  src={t.image1}
                  alt="Card image cap"
                />
              </div>
              <div className="card-body">
                <>
                  <h6 className="card-title text-black" style={{ height: 20 }}>
                    {t.name.length > 18 ? t.name.slice(0, 18) + "..." : t.name}
                  </h6>
                  <p className="card-text text-black" style={{ height: 30 }}>
                    {t.desc.length > 30 ? t.desc.slice(0, 30) + "..." : t.desc}
                  </p>
                </>
                <span className="price-product">
                  <h4 style={{ color: "red" }}>
                    {t.price - t.price * (t.discount / 100) + " " + "đ"}
                    <span style={{ fontSize: 15 }}>
                      {" " + "-" + t.discount + "%"}
                    </span>
                  </h4>
                  <h5
                    style={{
                      color: "black",
                      textDecoration: "line-through",
                    }}
                  >
                    {t.price + " " + "đ"}
                  </h5>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
