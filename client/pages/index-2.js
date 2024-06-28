import React from "react";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import GoogleMap from "@/components/google-map";
import ClientCarousel from "@/components/client-carousel";
import AboutTwo from "@/components/about-two";
import BlogTwo from "@/components/blog-two";
import ContactOne from "@/components/contact-one";
import PricingOne from "@/components/pricing-one";
import TestimonialsOne from "@/components/testimonials-one";
import FeaturedTwo from "@/components/featured-two";
import SliderTwo from "@/components/slider-two";
import ServiceTabTwo from "@/components/service-tab-2";
import CallToAction from "@/components/call-to-action";
import HeaderOne from "@/components/header-one";
import MenuContextProvider from "@/context/menu-context";

const HomeTwo = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Home Two">
        <HeaderOne />
        <SliderTwo />
        <AboutTwo />
        <FeaturedTwo />
        <ServiceTabTwo />
        <TestimonialsOne />
        <PricingOne />
        <CallToAction />
        <BlogTwo />
        <ClientCarousel />
        <ContactOne />
        <GoogleMap extraClassName="contact-page" />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default HomeTwo;
