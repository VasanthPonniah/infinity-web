import React from "react";
import { Alert } from "antd";
import classes from "./ViewCartAler.module.css";
import { CaretRightFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ViewCartAlert = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ position: "fixed", bottom: "100px", width: "100%", zIndex: 999 }}
    >
      <Alert
        className={classes.viewAlert}
        description={
          <span
            style={{
              color: "red",
            }}
          >
            View cart <CaretRightFilled onClick={() => navigate("/cart")} />
          </span>
        }
        style={{ fontSize: "25px", textAlign: "center", width: "90%" }}
        type="success"
        closable
      ></Alert>
    </div>
  );
};

export default ViewCartAlert;
