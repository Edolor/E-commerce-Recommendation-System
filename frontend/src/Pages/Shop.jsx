import "./../Assets/css/shop.css";
import Button from "../Components/Button";
import Image from "./../Assets/icons/shopping-black.svg";
import Image2 from "./../Assets/icons/shopping-bags.svg";
import Product from "../Components/Product";
import productListing from "../Hooks/products";

function getShopProducts() {
  return productListing;
}

const Shop = () => {
  const products = getShopProducts();
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
            {products.map((product, key) => (
              <div className="col-md-4 my-2" key={key}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </section>

        <div className="text-center my-4" id="loadMoreWrapper">
          <Button line={true} size="lg">
            Load more
          </Button>
        </div>
      </div>
    </>
  );
};

export default Shop;
