import React, { useState, useEffect, useRef } from "react";
import style from "./FilterList.module.css";
import SelectFilter from "../SelectFilter/SelectFilter";
import { faDesktop, faExchange, faPlus, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import BooleanFilter from "../BooleanFilter/BooleanFilter";
import Arrow from "../Arrow/Arrow";
import data from "../../data/Assessment_1_2.json";

function FilterList({ monitorFilter, scrapeFilter, onClickMonitoring, onClickExtractData }) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef(null);

  const [siteFilterOpen, setSiteFilterOpen] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const items = data.data.oneClickAutomations.items;
  const sites = [...new Set(items.flatMap((item) => item.sites.map((site) => site.title)))];
  const categories = [...new Set(items.flatMap((item) => item.categories.map((cat) => cat.title)))];

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

  const handleSiteFilterOpen = () => {
    setSiteFilterOpen(!siteFilterOpen);
  };

  const handleCategoryFilterOpen = () => {
    setCategoryFilterOpen(!categoryFilterOpen);
  };

  return (
    <div className={style.filterList} ref={containerRef}>
      {showLeftArrow && (
        <div onClick={handleLeftArrowClick}>
          <Arrow direction={"left"} icon={faAngleLeft} />
        </div>
      )}
      <BooleanFilter icon={faDesktop} label={"Monitoring"} onClick={onClickMonitoring} active={monitorFilter} />
      <BooleanFilter
        icon={faExchange}
        label={"Extract Data"}
        className={"fa-rotate-90"}
        onClick={onClickExtractData}
        active={scrapeFilter}
      />
      <SelectFilter
        icon={faPlus}
        label={"Filter by Site"}
        open={siteFilterOpen}
        options={sites}
        onClick={handleSiteFilterOpen}
      />
      <SelectFilter
        icon={faPlus}
        label={"Filter by Category"}
        open={categoryFilterOpen}
        options={categories}
        onClick={handleCategoryFilterOpen}
      />
      {showRightArrow && (
        <div onClick={handleRightArrowClick}>
          <Arrow direction={"right"} icon={faAngleRight} />
        </div>
      )}
    </div>
  );
}

export default FilterList;
