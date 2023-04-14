import React from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import { Outlet } from "react-router-dom";
import { useActivePage } from "./Contexts/ActivePageContext";
import Search from "./Layouts/Search";

function Layout({ page }) {
  const { setActivePage } = useActivePage();

  React.useEffect(() => {
    setActivePage(page);
  }, [setActivePage, page]);

  return (
    <>
      <Search />
      <Header activePage={page} />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
