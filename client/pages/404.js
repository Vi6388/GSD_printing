import React from "react";
import Error from "@/components/error";
import Layout from "@/components/layout";
import MenuContextProvider from "@/context/menu-context";

const ErrorPage = () => {
  return (
    <MenuContextProvider>
      <Layout PageTitle="Error 404 Page">
        <Error />
      </Layout>
    </MenuContextProvider>
  );
};

export default ErrorPage;
