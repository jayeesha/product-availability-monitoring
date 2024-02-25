import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import productData from "../../data/Assessment_1_2.json";
import style from "./ProductList.module.css";
import FilterList from "../FilterList/FilterList";

function ProductList() {
  const products = productData.data.oneClickAutomations.items;
  const [monitorFilter, setMonitorFilter] = useState(false);
  const [scrapeFilter, setScrapeFilter] = useState(false);
  const [productItems, setProductItems] = useState(products);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      if (monitorFilter && product.slug.includes("monitor")) {
        return true;
      }
      if (scrapeFilter && product.slug.includes("scrape")) {
        return true;
      }
      if (!scrapeFilter && !monitorFilter) {
        return true;
      }
      return false;
    });
    setProductItems(filteredProducts);
  }, [monitorFilter, scrapeFilter]);

  const onClickMonitoring = () => {
    setMonitorFilter(!monitorFilter);
  };

  const onClickExtractData = () => {
    setScrapeFilter(!scrapeFilter);
  };

  return (
    <div>
      <FilterList
        monitorFilter={monitorFilter}
        scrapeFilter={scrapeFilter}
        onClickMonitoring={onClickMonitoring}
        onClickExtractData={onClickExtractData}
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
