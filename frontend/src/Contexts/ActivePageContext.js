import React, { useRef, createContext } from "react";

const ActivePageContext = createContext();

const useActivePage = () => React.useContext(ActivePageContext);

const ActivePageProvider = ({ children }) => {
	const activeActivePage = useRef('home');

	const setActivePage = (page) => {
		activeActivePage.current = page;
	};

	return (
		<ActivePageContext.Provider value={{ activePage: activeActivePage.current, setActivePage }}>
			{children}
		</ActivePageContext.Provider>
	);
};

export { ActivePageProvider, useActivePage };