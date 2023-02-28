import React, { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductItem from "./ProductItem";
import "./Products.css";

const Products = ({ category }) => {
  const [view, setView] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  useEffect(() => {
    setSort("----------Lựa chọn----------");
  }, [category]);
  return (
    <div className="products">
      <ProductFilter
        setSort={setSort}
        setFilter={setFilter}
        setView={setView}
        category={category}
        sort={sort}
      />
      <ProductItem
        category={category}
        sort={sort}
        filter={filter}
        view={view}
      />
    </div>
  );
};

export default Products;
