import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import productData from "../../data/Assessment_1_2.json";
import style from "./ProductList.module.css";
import FilterList from "../FilterList/FilterList";

function ProductList() {
  const products = productData.data.oneClickAutomations.items;
  const [monitorFilter, setMonitorFilter] = useState(false);
  const [scrapeFilter, setScrapeFilter] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState([]);
  const [productItems, setProductItems] = useState(products);
  const categories = [...new Set(products.flatMap((item) => item.categories.map((category) => category.slug)))];
  const sites = [...new Set(products.flatMap((item) => item.sites.map((site) => site.slug)))];

  // useEffect(() => {
  //   setProductItems(products);
  // }, []);

  useEffect(() => {
    const categoryFilter = appliedFilters.some((filter) => categories.some((category) => category === filter));
    const siteFilter = appliedFilters.some((filter) => sites.some((site) => site === filter));

    const filteredProducts = products.filter((product) => {
      const categoriesExist = product.categories.length > 0;
      const sitesExist = product.sites.length > 0;
      const isMonitor = monitorFilter && product.slug.includes("monitor");
      const isScrape = scrapeFilter && (product.slug.includes("scrape") || product.slug.includes("find"));
      const categoryMatches =
        appliedFilters.length > 0 &&
        categoriesExist &&
        product.categories.some((category) => appliedFilters.includes(category.slug));
      const siteMatches =
        appliedFilters.length > 0 && sitesExist && product.sites.some((site) => appliedFilters.includes(site.slug));

      if (!scrapeFilter && !monitorFilter && !categoryFilter && !siteFilter) {
        // All filters disabled
        return true;
      } else if (isMonitor && isScrape && categoryFilter && siteFilter) {
        // Monitor, Extract, Site and Category filter applied
        if (siteMatches && categoryMatches) {
          return true;
        }
      } else if (isMonitor && isScrape && categoryFilter && !siteFilter) {
        // Monitor, Extract and Category filter applied
        if (categoryMatches) {
          return true;
        }
      } else if (isMonitor && isScrape && siteFilter && !categoryFilter) {
        // Monitor, Extract and Site filter applied
        if (siteMatches) {
          return true;
        }
      } else if (isMonitor && isScrape && !siteFilter && !categoryFilter) {
        // Monitor and Extract filter applied
        return true;
      } else if (siteFilter && categoryFilter && !(isMonitor && isScrape)) {
        // Site and category filter applied
        if (siteMatches && categoryMatches) {
          return true;
        }
      } else if (isMonitor && siteFilter && !isScrape && !categoryFilter) {
        // Monitor and Site filter applied
        if (siteMatches) {
          return true;
        }
      } else if (isScrape && siteFilter && !isMonitor && !categoryFilter) {
        // Extract and site filter applied
        if (siteMatches) {
          return true;
        }
      } else if (isMonitor && categoryFilter && !isScrape && !siteFilter) {
        // Monitor and Category filter applied
        if (categoryMatches) {
          return true;
        }
      } else if (isScrape && categoryFilter && !isMonitor && !siteFilter) {
        // Extract and Category filter applied
        if (categoryMatches) {
          return true;
        }
      } else if (isMonitor && !isScrape && !siteFilter && !categoryFilter) {
        // only Monitoring filter applied
        return true;
      } else if (isScrape && !isMonitor && !siteFilter && !categoryFilter) {
        // only Extract data filter applied
        return true;
      } else if (siteFilter && !monitorFilter && !scrapeFilter && !categoryFilter) {
        // only site filter applied
        if (siteMatches) {
          return true;
        }
      } else if (categoryFilter && !monitorFilter && !scrapeFilter && !siteFilter) {
        // only category filter applied
        if (categoryMatches) {
          return true;
        }
      }
      return false;
    });
    setProductItems(filteredProducts);
  }, [monitorFilter, scrapeFilter, appliedFilters]);

  const onClickMonitoring = () => {
    setMonitorFilter(!monitorFilter);
  };

  const onClickExtractData = () => {
    setScrapeFilter(!scrapeFilter);
  };

  const handleFilterAddition = (newFilter) => {
    if (!appliedFilters.includes(newFilter)) {
      setAppliedFilters([...appliedFilters, newFilter]);
    }
  };

  const handleFilterRemoval = (removeFilter) => {
    if (appliedFilters.includes(removeFilter)) {
      const updatedFilters = appliedFilters.filter((filter) => filter !== removeFilter);
      setAppliedFilters(updatedFilters);
    }
  };

  return (
    <div>
      <FilterList
        monitorFilter={monitorFilter}
        scrapeFilter={scrapeFilter}
        onClickMonitoring={onClickMonitoring}
        onClickExtractData={onClickExtractData}
        appliedFilters={appliedFilters}
        handleFilterAddition={handleFilterAddition}
        handleFilterRemoval={handleFilterRemoval}
      />
      <div className={style.productList}>
        {productItems.map((product) => (
          <Card
            key={product.id}
            logoUrl={product.sites[0]?.logoSmall2x}
            title={product.title}
            description={product.shortDescription}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
