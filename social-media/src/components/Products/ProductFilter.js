import React, { useState } from "react";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Select } from "antd";

const ProductFilter = ({ sort, setSort, setFilter, setView, category }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const [search, setSearch] = useState("");
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="products-filter">
      <div className="products-search">
        <SearchOutlined className="icon" style={{ color: "#b1488e" }} />
        <input
          className="input-search"
          type="text"
          value={search}
          placeholder="Tìm kiếm sản phẩm"
          onChange={(e) => {
            setFilter(e.target.value);
            setSearch(e.target.value);
          }}
        />
        {transcript.length > 1 && (
          <div className="voice-text">
            <p>{transcript}</p>
            <button
              style={{ width: 30, height: 30 }}
              onClick={() => {
                setSearch(transcript);
                setFilter(transcript);
                resetTranscript();
              }}
            >
              OK
            </button>
          </div>
        )}
        <AudioOutlined
          onClick={SpeechRecognition.startListening}
          className="icon-voice"
        />
      </div>
      <div className="products-sort">
        <label htmlFor="sort" style={{ color: "#b1488e", fontWeight: 500 }}>
          Sắp xếp/Sort by :
        </label>
        <Select
          defaultValue="----------Lựa chọn----------"
          style={{ width: 220 }}
          value={sort}
          onChange={(e) => setSort(e)}
          options={[
            {
              value: "option",
              label: "----------Lựa chọn----------",
            },
            {
              value: "true",
              label: "Giá từ thấp đến cao",
            },
            {
              value: "false",
              label: "Giá từ cao xuống thấp",
            },
          ]}
        />
        {/* <select
          className="input-sort"
          name="sort"
          id="sort"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="option">-------Lựa chọn---------- </option>
          <option value="true">Giá từ thấp đến cao </option>
          <option value="false">Giá từ cao xuống thấp</option>
        </select> */}
      </div>
      <div className="view-style">
        <span style={{ color: "#b1488e", fontWeight: 500 }}>
          Xem theo/View:{" "}
        </span>
        <div>
          <AppstoreOutlined className="icon" onClick={() => setView(true)} />
          <UnorderedListOutlined
            className="icon"
            onClick={() => setView(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
