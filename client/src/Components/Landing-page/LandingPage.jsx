import React from "react";
//import SubPage from "../SubPage";
//import Footer from "../Footer";
import OrderForm from "../OrderForm";

function LandingPage({ searchField, setSearchField }) {
  return (
    <>
      <OrderForm searchField={searchField} setSearchField={setSearchField} />
      {/*    <SubPage />
      <Footer /> */}
    </>
  );
}

export default LandingPage;
