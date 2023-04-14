import { useRef, useEffect, useState } from "react";

import { useSearch } from "../Contexts/SearchContext";

import { _get } from "../Hooks/fetch";
import { formControlClass } from "../Hooks/form";

import ProductListItem from "../Pages/ProductListItem";
import Loader from "../Components/Loader";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const {
    products,
    clearSearch,
    setProducts,
    activatePlaceholder,
    activateInput,
  } = useSearch();

  const fetchSearch = async () => {
    setLoading(true);
    const search = await _get(`products/list/?search=${searchValue}`);
    setLoading(false);
    setProducts(search.results);
  };

  useEffect(() => {
    if (searchValue !== "") fetchSearch();
    else clearSearch();
  }, [searchValue]);

  const activateIfNeeded = async (e) => {
    const val = e.target.value;
    setSearchValue(e.target.value);

    if (val === "") activatePlaceholder();
    else activateInput();
  };

  const ResultList = () => {
    if (products.length === 0 && searchValue !== "")
      return <div className="text-center">No results for "{searchValue}"</div>;
    return products.map((product, key) => (
      <li key={key} className="my-3">
        <ProductListItem product={product} />
      </li>
    ));
  };

  return (
    <div
      className="modal fade"
      aria-hidden={true}
      id="searchModal"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="container py-4">
            <div className="modal-header border-0">
              <div className="flex-fill me-4">
                <h1 className="small mb-3 text-uppercase heading text-black-50">
                  Search for products
                </h1>

                <div className="form-group position-relative">
                  <input
                    ref={inputRef}
                    type="text"
                    id="search"
                    className={`${formControlClass} border-0 fs-1`}
                    aria-label="Search for products"
                    style={{ borderColor: "#000" }}
                    value={searchValue}
                    onBlur={activatePlaceholder}
                    onInput={activateIfNeeded}
                  />
                  <div
                    id="pseudoPlaceholder"
                    className="animated font-weight-600 py-2 bg-white fs-1 overflow-hidden position-absolute px-0 rounded-0 top-0"
                    onClick={activateInput}
                    aria-hidden={true}
                  >
                    <div>What are you looking for?</div>
                  </div>
                </div>
              </div>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {loading && searchValue !== "" ? (
                <Loader />
              ) : (
                <>
                  <ul id="results" className="list-unstyled">
                    <ResultList />
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
