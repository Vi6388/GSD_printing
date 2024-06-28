import React from "react";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import ClientCarousel from "@/components/client-carousel";
import PageHeader from "@/components/page-header";
import FeatureOne from "@/components/featured-one";
import FeaturedTwo from "@/components/featured-two";
import ServiceTabOne from "@/components/service-tab-1";
import MenuContextProvider from "@/context/menu-context";
import HeaderOne from "@/components/header-one";

const Services = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Service Page">
        <HeaderOne />
        <PageHeader title="Services" name="Services" />
        <ServiceTabOne />
        <FeaturedTwo />
        <FeatureOne />
        <ClientCarousel />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default Services;
