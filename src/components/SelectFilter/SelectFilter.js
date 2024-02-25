import React, { useRef } from "react";
import style from "./SelectFilter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectFilter({ icon, label, options, open, onClick }) {
  const buttonRef = useRef(null);
  const optionsRef = useRef(null);

  return (
    <div>
      <div className={style.selectFilter} onClick={onClick} ref={buttonRef}>
        <div className={style.iconContainer}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className={style.filterLabel}>{label}</div>
      </div>

      {open && (
        <div ref={optionsRef} className={style.selectOptions}>
          {options.map((option) => (
            <div key={option} className={style.selectOption}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectFilter;
