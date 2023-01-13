import React, { useState } from "react";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";

const Home = () => {
  const [category, setCategory] = useState("");

  return (
    <div>
      <Header />
      <Banner />
      <div className="home-container">
        <Sidebar setCategory={setCategory} />
        <Products category={category} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
