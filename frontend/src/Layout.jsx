import React from "react";
import Header from "./Layouts/Header";
// import Newsletter from "./Layouts/Newsletter/Newsletter";
import Footer from "./Layouts/Footer";
import { Outlet } from "react-router-dom";
import { useActivePage } from "./Contexts/ActivePageContext";

function Layout({ page }) {
  const { setActivePage } = useActivePage();

  React.useEffect(() => {
    setActivePage(page);
  }, [setActivePage, page]);

  return (
    <>
      <Header activePage={page} />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
