import React from "react";
import Layout from "@/components/layout";
import PageHeader from "@/components/page-header";
import Footer from "@/components/footer";
import ClientCarousel from "@/components/client-carousel";
import RelatedServices from "@/components/related-services";
import DesignGuideLines from "@/components/design-guideline";
import PriceTable from "@/components/price-table";
import ServiceDetails from "@/components/service-details";
import MenuContextProvider from "@/context/menu-context";
import HeaderOne from "@/components/header-one";

const ServiceDetailsPage = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Service Details Page">
        <HeaderOne />
        <PageHeader title="Postcards" name="Service Details" />
        <ServiceDetails />
        <PriceTable />
        <DesignGuideLines />
        <RelatedServices />
        <ClientCarousel />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default ServiceDetailsPage;
