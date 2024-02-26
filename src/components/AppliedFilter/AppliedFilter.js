import React from "react";
import style from "./AppliedFilter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AppliedFilter({ icon, label, handleFilterRemoval }) {
  return (
    <div>
      <div className={style.appliedFilter}>
        <div className={style.filterLabel}>{label}</div>
        <div className={style.iconContainer} onClick={() => handleFilterRemoval(label)}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </div>
  );
}

export default AppliedFilter;
