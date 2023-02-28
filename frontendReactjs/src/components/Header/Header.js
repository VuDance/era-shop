import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import {
  ShoppingOutlined,
  CaretDownFilled,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import userNoLoginImg from "../../assets/userNoLogin.webp";
import { useDispatch, useSelector } from "react-redux";
import { convertImageBase64 } from "../../common/commonFuntion";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { emtyNoti } from "../../redux/Reducer/notificationSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [colorBg, setColorBg] = useState("transparent");
  const [textColor, setTextColor] = useState("black");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setAvatarFc = async (data) => {
    const avatarImg = convertImageBase64(data);
    setAvatar(avatarImg);
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emtyNoti());
    window.location.reload();
  };
  const listenScrollEvent = (event) => {
    if (window.scrollY < 50) {
      setColorBg("transparent");
      setTextColor("black");
    } else if (window.scrollY > 70) {
      setColorBg("#57255a");
      setTextColor("white");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    if (user) {
      setAvatarFc(user.userNoPassword);
    } else setAvatar(userNoLoginImg);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div
      className="header"
      style={{ backgroundColor: `${colorBg}`, color: `${textColor}` }}
    >
      <div className="logo">ERA-SHOP</div>
      <div className="navbar">
        <ul className="navbar-container">
          <li className="active" onClick={() => navigate("/")}>
            Trang chủ
          </li>
          <li>Bài tập</li>
          <li>Tin tức</li>
          <li>Phản ánh trực tiếp</li>
          <li>Giới thiệu</li>
          <li>Liên hệ</li>
        </ul>
      </div>
      <div className="user">
        <Link to="/user-cart">
          <div className="cart">
            <ShoppingOutlined style={{ color: "#fff" }} className="icon" />
          </div>
        </Link>
        <div className="notification">
          <BellOutlined className="icon" />
        </div>
        <div className="userImg">
          <img src={avatar}></img>
        </div>
        <div className="userName">
          <span>
            {user &&
              (
                user.userNoPassword.firstName +
                " " +
                user.userNoPassword.lastName
              ).slice(0, 15)}
          </span>
          <div className="userOption">
            <CaretDownFilled className="iconOption" />
            <div className="userOption-content">
              {user ? (
                <>
                  <Link to="/infor" className="userOption-content-item">
                    <UserOutlined />
                    <p style={{ margin: 0 }}>Thông tin cá nhân</p>
                  </Link>
                  <Link className="userOption-content-item" to="/#">
                    <LogoutOutlined />
                    <p style={{ margin: 0 }} onClick={handleLogout}>
                      Đăng xuất
                    </p>
                  </Link>
                </>
              ) : (
                <>
                  <Link className="userOption-content-item" to="/login">
                    <LogoutOutlined />
                    <p style={{ margin: 0 }} onClick={handleLogout}>
                      Đăng nhập
                    </p>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
