import React, { useState } from "react";
import { Select, Slider, Button } from "antd";
import classes from "./Filter.module.css";

const { Option } = Select;

const Filter = ({ onFilter, clearFilters }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedReview, setSelectedReview] = useState(0);

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleReviewChange = (value) => {
    setSelectedReview(value);
  };

  const applyFilters = () => {
    onFilter({
      color: selectedColor || "",
      reviews: selectedReview,
    });
  };

  const clearFilter = () => {
    setSelectedColor("");
    setSelectedReview(0);
    clearFilters();
  };

  return (
    <div style={{ marginBottom: "20px" }} className={classes.container}>
      <h3>Filter By:</h3>
      <div>
        <h4>Color:</h4>
        <Select style={{ width: 120 }} onChange={handleColorChange}>
          <Option value="white">White</Option>
          <Option value="Blue">Blue</Option>
          <Option value="Black">Black</Option>
        </Select>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>Reviews:</h4>
        <Slider
          range
          step={1}
          min={0}
          max={5}
          defaultValue={[0, 5]}
          onChange={handleReviewChange}
        />
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "2rem" }}>
        <Button type="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button type="primary" danger onClick={clearFilter}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default Filter;
