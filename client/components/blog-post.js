import React, { Fragment } from "react";
import { BlogDetailsData } from "@/data";
const BlogPost = () => {
  return (
    <Fragment>
      <div className="single-blog-post">
        <div className="text-box">
          <h3>{BlogDetailsData.title}</h3>
          <p>{BlogDetailsData.text}</p>
        </div>
        <div className="img-box">
          <img src={BlogDetailsData.image} alt={BlogDetailsData.title} />
          <div className="meta-info">
            <a href="#">
              <i className="fas fa-user"></i> by {BlogDetailsData.author}
            </a>
            <a href="#">
              <i className="fas fa-calendar"></i> {BlogDetailsData.date}
            </a>
            <a href="#">
              <i className="fas fa-comments"></i> {BlogDetailsData.commentCount}
            </a>
          </div>
        </div>
        <div className="content-box">
          <p>
            Lorem Ipsum is simply dummy text of the rinting and typesetting
            industry has been th standard dummy text ever sincer they llam id
            condimentum purus In non ex at ligula fringilla bortis et mauris
            auctor aliquet nulla sed, aliquam mauris. Vestibulum sed malesuada
            dolor. Integer fringilla odio a dolor aliquet eu euismod lectus
            porttitor. Proin et libero nec eros eleifend commodo Phasellus
            sodales des volutpat diam, id sagittis purus egestas dapibus. Donec
            bibendum estcommodo blandit. Maecenas pellentesque massa vitae
            faucibus consectetur, ante magna gravida magna, ut venenatis massa
            augue et odio.{" "}
          </p>
          <br />
          <p>
            Lorem Ipsum is simply dummy text of the rinting and typesetting
            industry has been th standard dummy text ever sincer they llam id
            condimentum purus In non ex at ligula fringilla bortis et mauris
            auctor aliquet nulla sed, aliquam mauris. Vestibulum sed malesuada
            dolor. Integer fringilla odio a dolor aliquet eu euismod lectus
            porttitor. Proin et libero nec eros eleifend commodo Phasellus
            sodales des volutpat diam, id sagittis purus egestas dapibus. Donec
            bibendum estcommodo blandit. Maecenas pellentesque massa vitae
            faucibus consectetur, ante magna gravida magna, ut venenatis massa
            augue et odio.{" "}
          </p>
        </div>
        <div className="share-box clearfix">
          <div className="left-title float-left">
            <h4>Share this post</h4>
          </div>
          <div className="right-social float-right">
            <div className="social">
              <a href="#" className="fab fa-twitter hvr-pulse"></a>
              <a href="#" className="fab fa-pinterest hvr-pulse"></a>
              <a href="#" className="fab fa-facebook-f hvr-pulse"></a>
              <a href="#" className="fab fa-youtube hvr-pulse"></a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPost;
