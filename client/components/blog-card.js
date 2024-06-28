import React from "react";
import Link from "next/link";

const BlogCard = ({ data }) => {
  const { title, text, image, author, date, commentCount, url } = data;
  return (
    <div className="single-blog-post">
      <div className="text-box hvr-bounce-to-bottom">
        <Link href={url}>
          <a>
            <h3>{title}</h3>
          </a>
        </Link>
        <p>{text}</p>
      </div>
      <div className="img-box">
        <img src={image} alt={title} />
        <div className="meta-info">
          <Link href={url}>
            <a>
              <i className="fas fa-user"></i> by {author}
            </a>
          </Link>
          <Link href={url}>
            <a>
              <i className="fas fa-calendar"></i> {date}
            </a>
          </Link>
          <Link href={url}>
            <a>
              <i className="fas fa-comments"></i> {commentCount}
            </a>
          </Link>
        </div>
        <Link href={url}>
          <a className="read-more fas fa-angle-right"></a>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
