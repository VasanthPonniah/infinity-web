import React from "react";
import { Input } from "antd";
import classes from "./Searchbar.module.css";
import { SearchOutlined } from "@ant-design/icons";
const Search = Input;

const Searchbar = (props) => {
  const onSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <Search
      placeholder="Search Products here"
      allowClear
      enterButton="Search"
      size="large"
      suffix={<SearchOutlined />}
      className={classes.search}
      onChange={onSearch}
    />
  );
};

export default Searchbar;
