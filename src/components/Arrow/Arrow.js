import React from "react";
import style from "./Arrow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Arrow({ icon, direction }) {
  const arrowClass = direction === "left" ? style.leftArrow : style.rightArrow;
  return (
    <div className={arrowClass}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

export default Arrow;
