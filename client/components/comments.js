import React from "react";
import { BlogCommentData } from "@/data";

const Comments = () => {
  const { sectionContent, posts } = BlogCommentData;
  return (
    <div className="comment-box">
      <div className="sec-title">
        <span>{sectionContent.title}</span>
        <h3>{sectionContent.text}</h3>
      </div>
      {posts.map(({ image, title, date, time, content }, index) => (
        <div className="single-comment-box" key={index}>
          <div className="img-box">
            <img src={image} alt="Awesome Image" />
          </div>
          <div className="text-box">
            <h3>{title}</h3>
            <span className="date-box">
              {date}
              <span className="sep">-</span>
              {time}
            </span>
            <p>{content}</p>
            <a href="#" className="reply">
              Reply
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
