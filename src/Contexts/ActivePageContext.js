import React, { createContext, useContext, useRef} from 'react'

const ActivePageContext = createContext();

function useActivePage() {
    return useContext(ActivePageContext);
}

function ActivePageProvider({children}) {

    const activePage = useRef(0);

    function setActivePage(pageNo) {
        return activePage.current = pageNo
    }

    function getActivePage() {
        return activePage.current;
    }

    const value = {
        setActivePage,
        getActivePage
    }

  return (
    <ActivePageContext.Provider value={value}>
        { children }
    </ActivePageContext.Provider>
  )
}

export  { ActivePageProvider, useActivePage };