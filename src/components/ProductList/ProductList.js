import React from "react";
import Card from "../Card/Card";
import productData from "../../data/Assessment_1_2.json";
import style from "./ProductList.module.css";
import FilterList from "../FilterList/FilterList";

function ProductList() {
  const productItems = productData.data.oneClickAutomations.items;

  return (
    <div>
      <FilterList />
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
