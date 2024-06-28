import React from "react";
import Layout from "@/components/layout";
import PageHeader from "@/components/page-header";
import ProjectOne from "@/components/project-one";
import ClientCarousel from "@/components/client-carousel";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header-one";
import MenuContextProvider from "@/context/menu-context";

const ProjectPage = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Projects Page">
        <HeaderOne />
        <PageHeader title="All Projects" name="All Projects" />
        <ProjectOne />
        <ClientCarousel />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default ProjectPage;
