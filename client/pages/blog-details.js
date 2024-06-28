import React from "react";
import Layout from "@/components/layout";
import PageHeader from "@/components/page-header";
import Footer from "@/components/footer";
import BlogDetails from "@/components/blog-details";
import MenuContextProvider from "@/context/menu-context";
import HeaderOne from "@/components/header-one";

const BlogDetailsPage = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Blog Details">
        <HeaderOne />
        <PageHeader title="Blog Details" name="Blog Details" />
        <BlogDetails />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default BlogDetailsPage;
