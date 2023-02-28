import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { loadNoti } from "../../redux/Reducer/notificationSlice";
import { getNoti } from "../../service/notificationService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login.currentUser);
  const mess = useSelector((state) => state.auth.login.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { email: email, password: password };
    loginUser(newUser, dispatch, navigate);
    if (user !== null) {
      notifi(user.userNoPassword.id);
    }
  };
  const notifi = async (id) => {
    const data = await getNoti(id);
    dispatch(loadNoti(data.data.data));
  };

  return (
    <body>
      <div className="container" style={{ alignItems: "center" }}>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div
              className="card border-0 shadow rounded-3"
              style={{ marginTop: 80 }}
            >
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>
                  <div style={{ color: "red", height: 30 }} className="mb-2">
                    {user === null ? mess : ""}
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <hr className="my-4" />
                  <span style={{ width: "100%", textAlign: "center" }}>
                    New to ERA Shop ? <Link to="/register">Sign up</Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
