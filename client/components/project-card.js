import React from "react";
import Link from "next/link";

const ProjectCard = ({ data }) => {
  const { image, title, category, url } = data;
  return (
    <div className="single-recent-project">
      <div className="img-box">
        <img src={image} alt="Awesome Image" />
      </div>
      <div className="text-box">
        <Link href={url}>
          <a className="more">
            <i className="fas fa-plus"></i>
          </a>
        </Link>
        <div className="inner hvr-bounce-to-bottom">
          <span>{category}</span>
          <Link href={url}>
            <a>
              <h3>{title}</h3>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
