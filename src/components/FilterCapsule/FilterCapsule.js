import React from "react";
import style from "./FilterCapsule.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FilterCapsule({ icon, label, className = "" }) {
  return (
    <div className={style.filterCapsule}>
      <div className={style.iconContainer}>
        <FontAwesomeIcon icon={icon} className={className} />
      </div>
      <div className={style.filterLabel}>{label}</div>
    </div>
  );
}

export default FilterCapsule;
