import React, { useEffect, useRef } from "react";
import style from "./SelectFilter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectFilter({ icon, label, options, open, onClick, onClose, handleFilterAddition }) {
  const buttonRef = useRef(null);
  const optionsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      buttonRef.current &&
      optionsRef.current &&
      !buttonRef.current.contains(event.target) &&
      !optionsRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      <span className={style.selectFilter} onClick={onClick} ref={buttonRef}>
        <div className={style.iconContainer}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className={style.filterLabel}>{label}</div>
      </span>

      {open && (
        <div ref={optionsRef} className={style.selectOptions}>
          {options.map((option) => (
            <div key={option.slug} className={style.selectOption} onClick={() => handleFilterAddition(option.slug)}>
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectFilter;
