import React, { useState, useEffect, useRef } from "react";
import style from "./FilterList.module.css";
import SelectFilter from "../SelectFilter/SelectFilter";
import { faDesktop, faExchange, faPlus, faAngleLeft, faAngleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import BooleanFilter from "../BooleanFilter/BooleanFilter";
import Arrow from "../Arrow/Arrow";
import AppliedFilter from "../AppliedFilter/AppliedFilter";

function FilterList({
  monitorFilter,
  scrapeFilter,
  onClickMonitoring,
  onClickExtractData,
  appliedFilters,
  handleFilterAddition,
  handleFilterRemoval,
}) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef(null);

  const [siteFilterOpen, setSiteFilterOpen] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);

  const categories = [
    { title: "Competitive Intelligence", slug: "competitive-intelligence" },
    { title: "SEO", slug: "seo" },
  ];
  const sites = [
    { title: "LinkedIn", slug: "linkedin" },
    { title: "ProductHunt", slug: "producthunt" },
    { title: "Google", slug: "google" },
    { title: "Amazon", slug: "amazon" },
    { title: "Booking", slug: "booking" },
    { title: "FDA", slug: "fda" },
    { title: "Google Maps", slug: "google-maps" },
    { title: "Pinterest", slug: "pinterest" },
    { title: "Trip Advisor", slug: "trip-advisor" },
    { title: "Twitter", slug: "twitter" },
    { title: "Upwork", slug: "upwork" },
    { title: "Craigslist", slug: "craigslist" },
    { title: "Meetup", slug: "meetup" },
  ];

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
  }, [appliedFilters]);

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

  const handleSiteFilterClose = () => {
    setSiteFilterOpen(false);
  };

  const handleCategoryFilterClose = () => {
    setCategoryFilterOpen(false);
  };

  return (
    <div>
      <div className={style.filterList} ref={containerRef}>
        {showLeftArrow && (
          <div onClick={() => handleLeftArrowClick()}>
            <Arrow direction={"left"} icon={faAngleLeft} />
          </div>
        )}
        <div className={style.filterContent}>
          <BooleanFilter icon={faDesktop} label={"Monitoring"} onClick={onClickMonitoring} active={monitorFilter} />
          <BooleanFilter
            icon={faExchange}
            label={"Extract Data"}
            className={"fa-rotate-90"}
            onClick={onClickExtractData}
            active={scrapeFilter}
          />
          {appliedFilters.length > 0 &&
            appliedFilters.map((filter) => (
              <AppliedFilter icon={faClose} label={filter} handleFilterRemoval={handleFilterRemoval} />
            ))}
          <SelectFilter
            icon={faPlus}
            label={"Filter by Site"}
            open={siteFilterOpen}
            options={sites}
            onClick={handleSiteFilterOpen}
            onClose={handleSiteFilterClose}
            handleFilterAddition={handleFilterAddition}
          />
          <SelectFilter
            icon={faPlus}
            label={"Filter by Category"}
            open={categoryFilterOpen}
            options={categories}
            onClick={handleCategoryFilterOpen}
            onClose={handleCategoryFilterClose}
            handleFilterAddition={handleFilterAddition}
          />
        </div>
        {showRightArrow && (
          <div onClick={() => handleRightArrowClick()}>
            <Arrow direction={"right"} icon={faAngleRight} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterList;
