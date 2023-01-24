import React from 'react';
import { useActivePage } from "./../Contexts/ActivePageContext";
import { Outlet } from "react-router-dom";

function ActiveRoute({ pageNo=0, children }) {
  const { setActivePage } = useActivePage();
  setActivePage(pageNo);

  return children ? children : <Outlet />;
}

export default ActiveRoute;