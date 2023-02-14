import Product from "../../Components/Product/Product.jsx";
import { useProduct } from "../../Contexts/ProductContext";

function Shop(props) {
    const { getSampleProducts } = useProduct();

    // FETCH TOP 3 PRODUCTS TO DISPLAY ON SCREEN OF USER
    const PRODUCTS = getSampleProducts();
    const productItems = [];

    // RENDER LIST OF PRODUCTS ON HOME PAGE
    for (const productID in PRODUCTS) {
        productItems.push(
            <li key={productID}>
                <Product product={PRODUCTS[productID]} />
            </li>
        );
    }

    return (
        <>
            <section className="width-wrapper">
                <h1 className="heading-1 margin-bottom-2 text-center mt-12">
                    SHOP OUR STORE
                </h1>

                <p className="text-5xl text-center mt-3 font-light max-w-7xl mx-auto">
                        A muscle is like a car. If you want it to run well early in the
                        morning, you have to warm it up.
                </p>

                <article className="mt-10 section-medium">
                    <ul className="list-s-none products margin-bottom-3">
                        {productItems}
                    </ul>
                </article>
                
            </section>
        </>
    );
}

export default Shop;