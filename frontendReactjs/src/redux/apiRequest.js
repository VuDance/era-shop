import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate, state) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3030/api/login", user);

    if (res.data.errCode === 2 || res.data.errCode === 1) {
      dispatch(loginFailed(res.data.message));
    } else {
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (e) {
    console.log(e);
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:3030/api/register", user);

    if (res.data.errCode === -1) {
      dispatch(registerFailed(res.data.message));
    } else {
      dispatch(registerSuccess(res.data));
      navigate("/login");
    }
  } catch (e) {
    console.log(e);
  }
};
