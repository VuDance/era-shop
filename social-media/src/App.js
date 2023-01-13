import "./App.css";
import Login from "./page/Login/Login";
import Home from "./page/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Register from "./page/Register/Register";
import DetailProduct from "./page/DetailProduct/DetailProduct";
import Cart from "./page/Cart/Cart";
import CustomAddress from "./page/CustomAddress/CustomAddress";
import OrderSummary from "./page/OrderSummary/OrderSummary";
import ConfirmOrder from "./page/ConfirmOrder/ConfirmOrder";
import Infor from "./page/Infor/Infor";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail-:id" element={<DetailProduct />} />
        <Route path="/user-cart" element={<Cart />} />
        <Route
          path="/set-address"
          element={user ? <CustomAddress /> : <Home />}
        />
        <Route
          path="/order-summary"
          element={user ? <OrderSummary /> : <Home />}
        />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/infor" element={user ? <Infor /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
