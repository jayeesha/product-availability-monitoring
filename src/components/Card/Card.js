import React from "react";
import style from "./Card.module.css";

function Card({ logoUrl, title, description }) {
  return (
    <div className={style.card}>
      <div className={style.logoContainer}>
        <img src={logoUrl} alt="Logo" className={style.cardLogo} />
      </div>
      <div className={style.cardTitle}>{title}</div>
      <div className={style.cardDescription}>{description}</div>
    </div>
  );
}

export default Card;
