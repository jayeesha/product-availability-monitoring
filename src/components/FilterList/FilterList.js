import React, { useState, useEffect, useRef } from "react";
import style from "./FilterList.module.css";
import FilterCapsule from "../FilterCapsule/FilterCapsule";
import { faDesktop, faExchange, faPlus, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Arrow from "../Arrow/Arrow";

function FilterList() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const updateArrows = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollWidth > container.clientWidth + container.scrollLeft);
    };

    if (container) {
      updateArrows();
      container.addEventListener("scroll", updateArrows);
      window.addEventListener("resize", updateArrows);
      return () => {
        container.removeEventListener("scroll", updateArrows);
        window.removeEventListener("resize", updateArrows);
      };
    }
  }, []);

  const handleLeftArrowClick = () => {
    containerRef.current.scrollLeft -= 100;
  };

  const handleRightArrowClick = () => {
    containerRef.current.scrollLeft += 100;
  };

  return (
    <div className={style.filterList} ref={containerRef}>
      {showLeftArrow && (
        <div onClick={handleLeftArrowClick}>
          <Arrow direction={"left"} icon={faAngleLeft} />
        </div>
      )}
      <FilterCapsule icon={faDesktop} label={"Monitoring"} />
      <FilterCapsule icon={faExchange} label={"Extract Data"} className={"fa-rotate-90"} />
      <FilterCapsule icon={faPlus} label={"Filter by Site"} />
      <FilterCapsule icon={faPlus} label={"Filter by Category"} />
      {showRightArrow && (
        <div onClick={handleRightArrowClick}>
          <Arrow direction={"right"} icon={faAngleRight} />
        </div>
      )}
    </div>
  );
}

export default FilterList;
