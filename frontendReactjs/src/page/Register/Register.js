import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [file, setFile] = useState({});
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.register);
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const avatar = await getBase64(file);
      const newUser = {
        firstName,
        lastName,
        email: email,
        password: password,
        avatar: avatar,
      };
      return registerUser(newUser, dispatch, navigate);
    }
    const newUser = { firstName, lastName, email: email, password: password };
    return registerUser(newUser, dispatch, navigate);
  };

  return (
    <div className="container">
      <div className="row py-5 mt-5 align-items-center">
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <img
            src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg"
            alt=""
            className="img-fluid mb-3 d-none d-md-block"
          />
          <h1>Create an Account</h1>
        </div>

        <div className="col-md-7 col-lg-6 ml-auto">
          <form action="/login" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-group col-lg-6 mb-4">
                <input
                  id="firstName"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control bg-white border-left-0 border-md"
                />
              </div>
              <div className="input-group col-lg-6 mb-4">
                <input
                  id="lastName"
                  type="text"
                  name="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="form-control bg-white border-left-0 border-md"
                />
              </div>
              <div className="input-group col-lg-12 mb-4">
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="form-control bg-white border-left-0 border-md"
                />
              </div>

              <div
                className="input-group col-lg-6 mb-4"
                style={{ position: "relative" }}
              >
                <input
                  id="password"
                  type={`${eye1 ? "text" : "password"}`}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-control bg-white border-left-0 border-md"
                />
                {eye1 ? (
                  <EyeOutlined
                    onClick={() => setEye1(!eye1)}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 10,
                      zIndex: 10,
                    }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setEye1(!eye1)}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 10,
                      zIndex: 10,
                    }}
                  />
                )}
              </div>
              <div
                className="input-group col-lg-6 mb-4"
                style={{ position: "relative" }}
              >
                <input
                  id="passwordConfirmation"
                  type={`${eye2 ? "text" : "password"}`}
                  name="passwordConfirmation"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Confirm Password"
                  className={`form-control bg-white border-left-0 ${
                    password !== passwordConfirm && "notSame"
                  }`}
                />
                {eye2 ? (
                  <EyeOutlined
                    onClick={() => setEye2(!eye2)}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 10,
                      zIndex: 10,
                    }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setEye2(!eye2)}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 10,
                      zIndex: 10,
                    }}
                  />
                )}
              </div>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <div style={{ color: "red", height: 30 }} className="mb-2">
                {user.message}
              </div>
              <button
                type="submit"
                className={`form-group col-lg-12 mx-auto mb-0 btn btn-primary btn-login text-uppercase fw-bold ${
                  password !== passwordConfirm ||
                  firstName.length === 0 ||
                  lastName.length === 0 ||
                  email.length === 0 ||
                  password.length === 0
                    ? "disable"
                    : ""
                }`}
              >
                <span className="font-weight-bold">Create your account</span>
              </button>
              <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                <div className="border-bottom w-100 ml-5"></div>
                <span className="px-2 small text-muted font-weight-bold text-muted"></span>
                <div className="border-bottom w-100 mr-5"></div>
              </div>
              <div className="text-center w-100">
                <p className="text-muted font-weight-bold">
                  Already Registered? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
