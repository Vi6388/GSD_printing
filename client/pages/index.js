import React from "react";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import AboutTwo from "@/components/about-two";
import ClientCarousel from "@/components/client-carousel";
import RecentProject from "@/components/recent-project";
import CallToActionTwo from "@/components/call-to-action-two";
import CallToActionThree from "@/components/call-to-action-three";
import AboutThree from "@/components/about-three";
import VideoDesignGuide from "@/components/video-design-guide";
import TeamOne from "@/components/team-one";
import FaqFeature from "@/components/faq-feature";
import TestimonialsOne from "@/components/testimonials-one";
import ServiceTwo from "@/components/service-two";
import HeaderOne from "@/components/header-one";
import SliderOne from "@/components/slider-one";
import MenuContextProvider from "@/context/menu-context";
import Category from "@/components/Category";

const Home = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Home Page">
        <HeaderOne />
        <SliderOne />
        <Category/>
        <AboutTwo />
        <ServiceTwo />
        <TestimonialsOne />
        <FaqFeature />
        <CallToActionTwo />
        <TeamOne />
        <AboutThree />
        <VideoDesignGuide />
        <CallToActionThree />
        <RecentProject />
        <ClientCarousel />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default Home;
