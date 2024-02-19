import React from "react";
import AdBanner from "../../UI/AdBanner/AdBanner";
import CarouselComp from "../../UI/Carousel/CarouselComp";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.home}>
      <AdBanner />
      <CarouselComp />
    </div>
  );
};

export default Home;
