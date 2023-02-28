import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PaginationProducts from "../Pagination/Pagination";
import {
  getAllProduct,
  getDatabyCategory,
  getDataCategoryWithPage,
  getProductsWithSortDecrease,
  getProductsWithSortIncrease,
  getProductWithPage,
} from "../../service/productsService";
import { Link } from "react-router-dom";

const ProductItem = ({ category, sort, filter, view }) => {
  const [products, setProducts] = useState([]);
  const [productOfPage, setProductOfPage] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const divRef = useRef(null);

  const scrollToTop = () => {
    divRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  //get product by category
  const getDataCategory = async (category, page) => {
    const res = await getDatabyCategory(category);
    setProducts(res.data.product);
    const res2 = await getDataCategoryWithPage(category, page);
    setProductOfPage(res2.data.product);
  };
  useEffect(() => {
    if (category === "all") {
      alldata();
      dataOfPage();
    }
    if (category.length > 0 && category !== "all") {
      getDataCategory(category, 1);
    }
  }, [category]);
  //get data of page
  const dataOfPage = async () => {
    const res = await getProductWithPage(page);
    setProductOfPage(res.data.product);
  };
  useEffect(() => {
    setLoading(true);
    scrollToTop();
    if (sort.length > 0) {
      sortItem(sort, page);
    } else if (category.length > 0 && category !== "all") {
      getDataCategory(category, page);
    } else if (category === "all") {
      alldata();
      dataOfPage();
    } else dataOfPage();
    setLoading(false);
  }, [page]);

  //get all data
  const alldata = async () => {
    const res = await getAllProduct();
    setProducts(res.data.product);
  };
  useEffect(() => {
    setLoading(true);
    alldata();
    setLoading(false);
  }, []);

  //search
  const search = (data) => {
    if (data.length < 1) {
      return setFilterProducts(products);
    } else {
      const dataSearch = products.filter((t) =>
        t.name.toLowerCase().includes(data)
      );
      return setFilterProducts(dataSearch);
    }
  };
  useEffect(() => {
    setLoading(true);
    search(filter);
    setLoading(false);
  }, [filter]);

  //sort
  useEffect(() => {
    setLoading(true);
    sortItem(sort, page);
    setLoading(false);
  }, [sort]);

  const sortItem = async (data, page) => {
    if (data === "option") {
      const res = await getProductWithPage(page);
      return setProductOfPage(res.data.product);
    }
    if (data === "false") {
      const res = await getProductsWithSortDecrease(page);
      return setProductOfPage(res.data.product);
    }
    if (data === "true") {
      const res = await getProductsWithSortIncrease(page);
      return setProductOfPage(res.data.product);
    }
  };
  return (
    <>
      <div className="wrapper-container">
        <div className="products-item" ref={divRef}>
          {filter.length > 0 ? (
            <>
              {filterProducts.length > 0 ? (
                <>
                  {filterProducts.map((t) => (
                    <Link
                      to={`/detail-${t.id}`}
                      key={t.id}
                      className={`card ${view ? "card-style1" : "card-style2"}`}
                    >
                      <div>
                        <img
                          className="card-img-top"
                          src={t.image1}
                          alt="Card image cap"
                        />
                      </div>
                      <div className="card-body">
                        <h6 className="card-title">
                          {t.name.length > 18 ? t.name.slice(0, 18) : t.name}...
                        </h6>
                        <p className="card-text text-secondary">
                          {t.desc.length > 30 ? t.desc.slice(0, 30) : t.desc}...
                        </p>
                        <h4 style={{ color: "red" }}>{t.price + " " + "đ"}</h4>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                "Không có sản phẩm nào"
              )}
            </>
          ) : (
            <>
              {productOfPage.map((t) => (
                <Link
                  to={`/detail-${t.id}`}
                  key={t.id}
                  className={`card ${view ? "card-style1" : "card-style2"}`}
                >
                  <div>
                    <img
                      className="card-img-top"
                      src={t.image1}
                      alt="Card image cap"
                    />
                  </div>
                  <div className="card-body">
                    <>
                      <h6
                        style={{ height: 20, color: "black" }}
                        className="card-title text-black"
                      >
                        {t.name.length > 18 ? t.name.slice(0, 18) : t.name}...
                      </h6>
                      <p
                        className="card-text text-black"
                        style={{ height: 30 }}
                      >
                        {t.desc.length > 30 ? t.desc.slice(0, 30) : t.desc}...
                      </p>
                    </>
                    <span className="price-product">
                      <h4 style={{ color: "red" }}>
                        {t.price - t.price * (t.discount / 100) + " " + "đ"}
                        <span style={{ fontSize: 15 }}>
                          {" " + "-" + t.discount + "%"}
                        </span>
                      </h4>
                      <h5
                        style={{
                          color: "black",
                          textDecoration: "line-through",
                        }}
                      >
                        {t.price + " " + "đ"}
                      </h5>
                    </span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
        {filter.length === 0 && (
          <PaginationProducts
            category={category}
            products={products}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default ProductItem;
