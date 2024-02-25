import React from "react";
import style from "./BooleanFilter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BooleanFilter({ icon, label, className = "", active, onClick }) {
  return (
    <div>
      <div className={`${style.booleanFilter} ${active ? style.active : ""}`} onClick={onClick}>
        <div className={style.iconContainer}>
          <FontAwesomeIcon icon={icon} className={className} />
        </div>
        <div className={style.filterLabel}>{label}</div>
      </div>
    </div>
  );
}

export default BooleanFilter;
