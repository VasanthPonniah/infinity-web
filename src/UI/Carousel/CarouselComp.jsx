import { Carousel } from "antd";
import React from "react";
import classes from "./CarouselComp.module.css";

const CarouselComp = () => {
  return (
    <Carousel autoplay style={{ margin: "2rem 12rem", width: "100%" }}>
      <div>
        <img
          className={classes.image}
          src="https://www.newsexperts.in/wp-content/uploads/2021/08/DQ1.jpg"
          alt="Advertisement !"
        />
      </div>
      <div>
        <img
          className={classes.image}
          src="https://www.toptrendsguide.com/wp-content/uploads/2020/05/Ralph-Lauren.jpg"
          alt="Advertisement!"
        />
      </div>
      <div>
        <img
          className={classes.image}
          src="https://www.menzmag.com/wp-content/uploads/2015/04/Tommy_Hilfiger.jpg"
          alt="Advertisement!"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComp;
