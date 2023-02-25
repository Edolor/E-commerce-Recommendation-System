import Header from "./Layouts/Header";
// import Newsletter from "./Layouts/Newsletter/Newsletter";
import Footer from "./Layouts/Footer";
import { Outlet } from "react-router-dom";
import { useActivePage } from "./Contexts/ActivePageContext";

function Layout({ pageNo }) {
  const { setActivePage } = useActivePage();
  setActivePage(pageNo);

  return (
    <>
      <Header pageNo={pageNo} />

      <main id="main">
        <Outlet />
      </main>

      {/* <Newsletter /> */}
      <Footer />
    </>
  );
}

export default Layout;
