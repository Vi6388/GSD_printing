import React from "react";
import { sidebarTextWidgetData } from "@/data";

const BlogSidebar = () => {
  return (
    <div className="sidebar right-sidebar">
      <div className="single-sidebar search-sidebar">
        <form action="#" className="search-from">
          <input type="text" placeholder="Search here..." />
        </form>
      </div>
      <div className="single-sidebar recent-post">
        <div className="title">
          <h3>Recent Posts</h3>
        </div>
        <ul className="post-list">
          <li>
            <a href="#">
              <h4>What file types do you accept for printing cards.</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <h4>
                What are your recommended file sizes for images and photos?
              </h4>
            </a>
          </li>
          <li>
            <a href="#">
              <h4>What is the difference between vector and bitmap images?</h4>
            </a>
          </li>
        </ul>
      </div>
      <div className="single-sidebar tags-sidebar">
        <div className="title">
          <h3>Tags</h3>
        </div>
        <ul className="tags-list">
          <li>
            <a href="#">copying</a>
          </li>
          <li>
            <a href="#">printing</a>
          </li>
          <li>
            <a href="#">agency</a>
          </li>
          <li>
            <a href="#">corporate</a>
          </li>
          <li>
            <a href="#">customers</a>
          </li>
          <li>
            <a href="#">hello</a>
          </li>
          <li>
            <a href="#">businesscard</a>
          </li>
          <li>
            <a href="#">professional</a>
          </li>
        </ul>
      </div>
      <div className="single-sidebar img-sidebar">
        <div className="img-box">
          <img src={sidebarTextWidgetData.image} alt="Awesome Image" />
        </div>
        <div className="text-box">
          <h4>{sidebarTextWidgetData.title}</h4>
          <p>{sidebarTextWidgetData.text}</p>
        </div>
      </div>
      <div className="single-sidebar category-sidebar">
        <div className="title">
          <h3>Categories</h3>
        </div>
        <ul className="category-list">
          <li>
            <a href="#">Business</a>
          </li>
          <li>
            <a href="#">Research</a>
          </li>
          <li>
            <a href="#">Event Organisation</a>
          </li>
          <li>
            <a href="#">Social Media</a>
          </li>
          <li>
            <a href="#">Travel</a>
          </li>
          <li>
            <a href="#">Personal Life</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
