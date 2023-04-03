import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	function clearSearch() {
		setProducts([]);
	}

	function activatePlaceholder() {
		const { input, placeholder } = search();
		const val = input.value;
		if (val === "") {
			placeholder.classList.add("animated");
			//   input.classList.add("d-none");
			placeholder.classList.remove("d-none");
		}
	}

	const search = () => {
		return {
			input: document.getElementById("search"),
			placeholder: document.getElementById("pseudoPlaceholder"),
		};
	};

	function activateInput() {
		const { input, placeholder } = search();
		placeholder.classList.add("d-none");
		//   input.classList.remove("d-none");
		input.focus();
	}

	return (
		<SearchContext.Provider value={{ clearSearch, products, setProducts, activatePlaceholder, search, activateInput }}>{children}</SearchContext.Provider>
	)
}

export { SearchProvider, useSearch };