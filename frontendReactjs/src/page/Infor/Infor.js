import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertImageBase64 } from "../../common/commonFuntion";
import Header from "../../components/Header/Header";
import userNoLoginImg from "../../assets/userNoLogin.webp";
import "./Infor.css";
import { getUserInfor, updateUser } from "../../service/userService";
import { loginSuccess, logout } from "../../redux/authSlice";
import { CameraOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { emtyNoti } from "../../redux/Reducer/notificationSlice";
import MyOrder from "../../components/MyOrder/MyOrder";

const Infor = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const notification = useSelector((state) => state.notification.notication);
  const [avatar, setAvatar] = useState("");
  const [active, setActive] = useState(1);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageChange, setImageChange] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setAvatarFc = async (data) => {
    const avatarImg = convertImageBase64(data);
    setAvatar(avatarImg);
    setImageChange(avatarImg);
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
  };
  const handleChangeImg = async (file) => {
    setFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImageChange(objectUrl);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let avatar = {};
    let newUser = {};
    if (file === null) {
      avatar = null;
      newUser = {
        firstName,
        lastName,
        email: user.userNoPassword.email,
        avatar: avatar,
      };
    } else {
      avatar = await getBase64(file);
      newUser = {
        firstName,
        lastName,
        email: user.userNoPassword.email,
        avatar: avatar,
      };
    }

    await updateUser(newUser);
    // console.log(user.userNoPassword.id);
    const data = await getUserInfor(user.userNoPassword.id);
    dispatch(loginSuccess(data.data));
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emtyNoti());
    navigate("/");
  };
  useEffect(() => {
    if (user) {
      setAvatarFc(user.userNoPassword);
      setFirstname(user.userNoPassword.firstName);
      setLastName(user.userNoPassword.lastName);
    } else setImageChange(userNoLoginImg);
  }, []);
  return (
    <div>
      <Header />
      <div className="infor-user-wrapper">
        <div className="infor-user-form">
          <div className="sidebar-infor">
            <div className="avatar-user">
              <img src={imageChange} />
              <div style={{ fontWeight: 700, color: "white" }}>
                {user.userNoPassword.firstName +
                  " " +
                  user.userNoPassword.lastName}
              </div>
            </div>
            <div className="sidebar-user-contain">
              <div
                onClick={() => setActive(1)}
                className={active === 1 && "activeChose"}
              >
                Thông tin cá nhân
              </div>
              <div
                onClick={() => {
                  setActive(2);
                }}
                className={active === 2 && "activeChose"}
              >
                Thông báo
              </div>
              <div
                onClick={() => {
                  setActive(3);
                }}
                className={active === 3 && "activeChose"}
              >
                Đơn hàng của tôi
              </div>
              <div onClick={handleLogout}>Đăng xuất</div>
            </div>
          </div>
          <div className="infor-user-contain">
            {active === 1 && (
              <>
                <h3>Thông tin cá nhân</h3>
                <div className="custom-avatar">
                  <label htmlFor="file">
                    <img src={imageChange} />
                    <CameraOutlined className="icon-cam" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleChangeImg(e.target.files[0])}
                  ></input>
                </div>
                <div className="infor-custom-user">
                  <div>
                    <label htmlFor="firstname">First name :</label>
                    <input
                      id="firstname"
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstName}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="lastname">Last name :</label>
                    <input
                      id="lastname"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    ></input>
                  </div>
                  <div>
                    <label>Email :</label>
                    <input
                      value={user.userNoPassword.email}
                      style={{
                        pointerEvents: "none",
                        backgroundColor: "silver",
                      }}
                    ></input>
                  </div>
                  <div>
                    <label>Password :</label>
                    <input
                      type="password"
                      value={12345}
                      style={{
                        pointerEvents: "none",
                        backgroundColor: "silver",
                      }}
                    ></input>
                  </div>
                </div>
                <div className="btn-update">
                  <button onClick={(e) => handleUpdate(e)}>Cập nhật</button>
                </div>
              </>
            )}
            {active === 2 && (
              <>
                <div className="notification">
                  <h3>Thông báo</h3>
                  <div className="list-notification">
                    <ul>
                      {notification.map((i) => (
                        <li>{i.notification}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
            {active == 3 && <MyOrder />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infor;
