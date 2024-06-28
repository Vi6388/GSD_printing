import React from "react";
import Layout from "@/components/layout";
import PageHeader from "@/components/page-header";
import Footer from "@/components/footer";
import BlogOne from "@/components/blog-one";
import HeaderOne from "@/components/header-one";
import MenuContextProvider from "@/context/menu-context";

const BlogPage = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Blog Page">
        <HeaderOne />
        <PageHeader title="Latest News" name="Latest News" />
        <BlogOne />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default BlogPage;
