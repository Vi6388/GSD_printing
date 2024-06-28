import React from "react";
import Link from "next/link";

const ServiceCard = ({ data }) => {
  const { image, url, title, count, price, content } = data;
  return (
    <div className="single-service-three">
      <div className="img-box">
        <img src={image} alt="Awesome Image" />
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
        <p>{content}</p>
        <Link href={url}>
          <a className="read-more fas fa-angle-right"></a>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
