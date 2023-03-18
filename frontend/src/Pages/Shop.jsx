import { useState, useEffect } from "react";

import Loader from "../Components/Loader";
import Button from "../Components/Button";
import Product from "../Components/Product";

import "./../Assets/css/shop.css";
import Image from "./../Assets/icons/shopping-black.svg";
import Image2 from "./../Assets/icons/shopping-bags.svg";

import { _get } from "../Hooks/fetch";

const Shop = () => {
  const [loadedProducts, setLoadedProducts] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [products, setProducts] = useState({});
  const [nextUrl, setNextURL] = useState(null);

  async function getProducts(page = 1, url = null) {
    var absolute;
    if (page) {
      url = `products/list/?page=${page}&size=6`;
      absolute = false;
    } else absolute = true;

    const data = await _get(url, absolute);
    setLoadingMore(false);
    if (!data) return;

    setNextURL(data.next);
    setLoadedProducts(true);

    let results = data.results;
    let currentProducts = products;
    for (let index in results) {
      let product = results[index];
      currentProducts[product.id] = product;
    }

    setProducts(currentProducts);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const ProductList = () => {
    return Object.keys(products).map((productId, key) => (
      <div className="col-md-4 my-2" key={key}>
        <Product product={products[productId]} />
      </div>
    ));
  };

  function handleLoadMore() {
    if (nextUrl === null) return;
    console.log(nextUrl);
    setLoadingMore(true);
    getProducts(null, nextUrl);
  }

  return (
    <>
      <section
        id="shopHero"
        className="pt-5 pb-3 position-relative"
        style={{ backgroundColor: "red" }}
      >
        <div
          className="position-absolute ms-md-5 ps-md-5 ms-3"
          id="shopImgWrapper"
        >
          <img src={Image} alt="Shopping" id="shopImg" />
        </div>
        <div className="position-absolute ps-md-5 ms-3" id="shopImg2Wrapper">
          <img src={Image2} alt="Shopping" id="shopImg2" />
        </div>
        <div className="container mt-sm-5 pt-5 pb-sm-3 d-flex flex-column align-items-end position-relative">
          <div className="border border-5 border-dark p-1">
            <div className="bg-dark display-6 heading py-md-3 py-2 px-md-4 px-3 text-white text-center text-uppercase">
              Shop
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <section id="shop" className="my-5">
          <div className="row">
            {loadedProducts ? <ProductList /> : <Loader />}
          </div>
        </section>

        <div className="text-center my-4" id="loadMoreWrapper">
          {loadingMore ? <Loader /> : null}
          {nextUrl !== null ? (
            <Button line={true} size="lg" onclick={handleLoadMore}>
              Load more
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Shop;
