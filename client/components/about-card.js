import Link from "next/link";
import React from "react";

const AboutCard = ({ data }) => {
  const { title, text, image, url } = data;
  return (
    <div className="single-about">
      <div className="img-box">
        <img src={image} alt={title} />
      </div>
      <div className="text-box hvr-bounce-to-bottom">
        <Link href={url}>
          <a>
            <h3>{title}</h3>
          </a>
        </Link>
        <p>{text}</p>
        <Link href={url}>
          <a className="read-more fas fa-angle-right"></a>
        </Link>
      </div>
    </div>
  );
};

export default AboutCard;
