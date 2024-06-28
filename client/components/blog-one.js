import React from "react";
import { Row, Col } from "react-bootstrap";
import { BlogPostsData } from "@/data";
import BlogCard from "@/components/blog-card";
import PostPaginations from "@/components/post-paginations";

const BlogOne = () => {
  return (
    <section className="blog-style-one sec-pad blog-page">
      <div className="thm-container">
        <Row>
          {BlogPostsData.map((post, index) => {
            return (
              <Col md={6} key={index}>
                <BlogCard data={post} />
              </Col>
            );
          })}
        </Row>
        <PostPaginations />
      </div>
    </section>
  );
};

export default BlogOne;
