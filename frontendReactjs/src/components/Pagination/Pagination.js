import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import "./Pagination.css";

const PaginationProducts = ({ products, setPage, category }) => {
  const [current, setCurrent] = React.useState(1);
  let setSize = false;
  const onChangeLogic = (current, size) => {
    !setSize && setCurrent(current);
    setPage(current);
  };
  useEffect(() => {
    setCurrent(1);
  }, [category]);
  return (
    <div className="pagination">
      <Pagination
        pageSize={20}
        showSizeChanger={false}
        total={products.length}
        current={current}
        onChange={onChangeLogic}
      />
    </div>
  );
};

export default PaginationProducts;
