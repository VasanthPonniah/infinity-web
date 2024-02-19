import React, { useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import { useLoaderData } from "react-router-dom";
import Searchbar from "../UI/Searchbar/Searchbar";
import Filter from "../UI/Filter/Filter";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const ProductListPage = (props) => {
  const data = useLoaderData();

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(false);
  const [filterValue, setFilterValue] = useState({});

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const clearFilters = () => setFilterValue({});

  const onFilter = (filteredValues) => {
    setFilterValue({
      color: filteredValues?.color,
      reviews: filteredValues.reviews[0] || 0,
    });
  };

  const searchedProducts = data.filter((prod) => {
    return Object.values(prod).join(",").includes(searchValue);
  });

  const filteredProducts = data.filter(
    (prod) =>
      prod?.color?.toLowerCase()?.includes(filterValue?.color?.toLowerCase()) &&
      prod.reviews > filterValue.reviews
  );

  return (
    <>
      <Searchbar onSearch={onSearch} />
      <strong
        style={{ color: "#943333", cursor: "pointer", fontSize: "18px" }}
        onClick={() => {
          clearFilters();
          setFilter((prev) => !prev);
        }}
      >
        Filters{" "}
        <span>
          <FilterOutlined />
        </span>{" "}
        {!filter ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </strong>
      {filter && <Filter onFilter={onFilter} clearFilters={clearFilters} />}
      <ProductList
        data={searchValue ? searchedProducts : data}
        filteredProducts={filteredProducts}
      />
    </>
  );
};
export default ProductListPage;

export async function loader(context) {
  const searchParams = context.request.url.split("?")[1];

  const response = await fetch(`http://localhost:8080/products`);
  if (!response.ok) {
    return null;
  } else {
    const data = await response.json();
    if (searchParams.split("=")[0] === "men") {
      return data.filter((prod) => prod.category === "men");
    }
    if (searchParams.split("=")[0] === "women") {
      return data.filter((prod) => prod.category !== "men");
    }
    return null;
  }
}
