import React from "react";
import ContactOne from "@/components/contact-one";
import Footer from "@/components/footer";
import GoogleMap from "@/components/google-map";
import Layout from "@/components/layout";
import MenuContextProvider from "@/context/menu-context";
import HeaderOne from "@/components/header-one";

const Contact = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Contact Page">
        <HeaderOne />
        <GoogleMap extraClassName="contact-page" />
        <ContactOne />
        <Footer />
      </Layout>
    </MenuContextProvider>
  );
};

export default Contact;
