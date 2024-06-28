import React from "react";
import ClientCarousel from "@/components/client-carousel";
import Layout from "@/components/layout";
import ProgressOne from "@/components/progress-one";
import PageHeader from "@/components/page-header";
import Footer from "@/components/footer";
import AboutOne from "@/components/about-one";
import TestimonialsOne from "@/components/testimonials-one";
import TeamOne from "@/components/team-one";
import FaqFeature from "@/components/faq-feature";
import HeaderOne from "@/components/header-one";
import MenuContextProvider from "@/context/menu-context";

const AboutPage = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="About Us Page">
        <HeaderOne />
        <PageHeader title="About Us" name="About" />
        <AboutOne />
        <TestimonialsOne />
        <TeamOne />
        <ProgressOne />
        <FaqFeature />
        <ClientCarousel />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default AboutPage;
