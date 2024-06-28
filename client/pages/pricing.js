import React from "react";
import Layout from "@/components/layout";
import PageHeader from "@/components/page-header";
import PricingOne from "@/components/pricing-one";
import ProgressOne from "@/components/progress-one";
import Footer from "@/components/footer";
import ContactOne from "@/components/contact-one";
import HeaderOne from "@/components/header-one";
import MenuContextProvider from "@/context/menu-context";

const PricingPage = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Pricing Page">
        <HeaderOne />
        <PageHeader title="Our Pricing" name="Pricing" />
        <PricingOne />
        <ProgressOne />
        <ContactOne />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default PricingPage;
