import { Rate } from "antd";
import React from "react";
import classes from "./ProductList.module.css";
import { useNavigate } from "react-router-dom";

const ProductList = (props) => {
  const navigate = useNavigate();

  if (!props.data.length) {
    return <p style={{ textAlign: "center" }}>No data found</p>;
  }
  return (
    <>
      <div className={classes.productContainer}>
        {(props.filteredProducts.length
          ? props.filteredProducts
          : props.data
        ).map((prod) => {
          return (
            <div
              key={prod.id}
              className={classes.product}
              onClick={() => navigate(`/products/${prod._id}`)}
            >
              <img
                src={prod.image_url}
                alt={prod.title}
                className={classes.img}
              />
              <h2 className={classes.title}>{prod.title}</h2>
              <p>{prod.description}</p>
              <Rate disabled allowHalf defaultValue={prod.reviews} />
              <p className={classes.price}>${prod.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
