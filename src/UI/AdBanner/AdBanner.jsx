import React from "react";
import classes from "./AdBanner.module.css";
import { Button } from "antd";

const AdBanner = () => {
  return (
    <div className={classes.adBanner}>
      <img
        src="https://img.pikbest.com/origin/09/30/65/27hpIkbEsTzdI.jpg!sw800"
        alt="Ad Banner"
        className={classes.adImage}
      />
      <Button className={classes.adButton}>Explore Now</Button>
    </div>
  );
};

export default AdBanner;
