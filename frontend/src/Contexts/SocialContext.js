import React, { createContext } from 'react';

const SocialContext = createContext();

const useSocial = () => React.useContext(SocialContext);

const SocialProvider = ({ children }) => {
	const socials = [
		{ title: "Facebook", icon: "fa-brands fa-facebook", url: "" },
		{ title: "Twitter", icon: "fa-brands fa-twitter", url: "" },
		{ title: "Instagram", icon: "fa-brands fa-instagram", url: "" },
	];

	return (
		<SocialContext.Provider value={socials}>{children}</SocialContext.Provider>
	)
};

export { useSocial, SocialProvider };