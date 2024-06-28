import React from "react";
import { CommentFromData } from "@/data";
const CommentForm = () => {
  const { sectionContent } = CommentFromData;
  return (
    <div className="leave-a-comment">
      <div className="sec-title">
        <span>{sectionContent.subText}</span>
        <h3>{sectionContent.title}</h3>
      </div>
      <form action="#" className="contact-form row">
        <div className="col-md-6">
          <input type="text" placeholder="Your full name" name="name" />
        </div>
        <div className="col-md-6">
          <input type="text" placeholder="Your email address" name="email" />
        </div>
        <div className="col-md-12">
          <textarea
            name="message"
            placeholder="What you are looking for?"
          ></textarea>
          <button type="submit" className="thm-btn yellow-bg">
            Submit Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
