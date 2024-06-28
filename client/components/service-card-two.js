import Link from "next/link";
import React from "react";

const ServiceCardTwo = ({ data }) => {
  const { image, title, count, price, text, url } = data;
  return (
    <div className="single-service-three">
      <div className="img-box">
        <img src={image} alt={title} />
      </div>
      <div className="text-box hvr-bounce-to-bottom">
        <Link href={url}>
          <a>
            <h3>{title}</h3>
          </a>
        </Link>
        <div className="meta-info">
          <p>
            {count} cards from <span>${price}</span>
          </p>
        </div>
        <p>{text}</p>
        <Link href={url}>
          <a className="read-more fas fa-angle-right"></a>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCardTwo;
