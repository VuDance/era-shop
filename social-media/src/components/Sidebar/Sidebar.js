import React from "react";
import { Menu } from "antd";
import "./Sidebar.css";

const Sidebar = ({ setCategory, setPage }) => {
  return (
    <div className="sidebar">
      <div style={{ fontWeight: 700, color: "#57255a" }}>DANH MỤC SẢN PHẨM</div>
      <Menu mode="vertical" defaultSelectedKeys={["all"]}>
        <Menu.Item
          key="all"
          onClick={() => {
            setCategory("all");
          }}
        >
          Tất cả
        </Menu.Item>
        <Menu.Item
          key="book"
          onClick={() => {
            setCategory("book");
          }}
        >
          Sách
        </Menu.Item>

        <Menu.Item
          key="balo"
          onClick={() => {
            setCategory("balo");
          }}
        >
          Balo
        </Menu.Item>

        <Menu.SubMenu key="toy" title="Đồ chơi">
          <Menu.Item
            key="two"
            onClick={() => {
              setCategory("toy");
            }}
          >
            Đồ chơi 0
          </Menu.Item>
          <Menu.Item
            key="three"
            onClick={() => {
              setCategory("toy1");
            }}
          >
            Đồ chơi 1
          </Menu.Item>

          <Menu.Item
            key="four"
            onClick={() => {
              setCategory("toy2");
            }}
          >
            Đồ chơi 2
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;
