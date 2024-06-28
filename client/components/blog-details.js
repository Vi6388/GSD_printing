import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogPost from "@/components/blog-post";
import Comments from "@/components/comments";
import CommentForm from "@/components/comment-form";
import BlogSidebar from "@/components/blog-sidebar";

const BlogDetails = () => {
  return (
    <section className="blog-details-page sec-pad">
      <div className="thm-container">
        <Row>
          <Col lg={8}>
            <BlogPost />
            <Comments />
            <CommentForm />
          </Col>
          <Col lg={4}>
            <BlogSidebar />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default BlogDetails;
