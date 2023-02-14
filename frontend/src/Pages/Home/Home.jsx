import "./_home.scss";
import weights from "../../Assets/images/man_on_weights@2x.jpg";
import showAndWeight from "../../Assets/images/shoe_and_weights@2x.jpg";
import { ArrowButton } from "../../Components/Button/Button";
import Product from "../../Components/Product/Product";
import { useProduct } from "../../Contexts/ProductContext";

function Home(props) {
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
                <article className="section-medium grid col-1-2 align-center gap-5">
                    <div className="left color-black">
                        <p className="body-copy--small margin-bottom-1 font-weight-500">SHOP OUR STORE</p>
                        <h1 className="heading-1 margin-bottom-2">
                            Transforming the world
                            of Fitness and Health
                            one push at a time.
                        </h1>

                        <p className="body-copy--larger margin-bottom-3 width-50">
                            A muscle is like a car. If you want
                            it to run well early in the morning,
                            you have to warm it up.
                        </p>

                        <ArrowButton link="/shop" text="Shop Now" />
                    </div>

                    <div className="right">
                        <figure className="s">
                            <img src={weights} alt="Man carrying weights in Gym" className="image"/>
                            <figcaption className="hide">Man carrying weights in Gym</figcaption>
                        </figure>
                    </div>
                </article>

                <article className="grid col-1-2">
                    <div className="left">
                        <figure>
                            <img src={showAndWeight} alt="Man carrying weights in Gym" className="image"/>
                            <figcaption className="hide">Man carrying weights in Gym</figcaption>
                        </figure>
                    </div>

                    <div className="right color-white bg-secondary flex flex-column justify-center align-center">
                        <div className="grp">
                            <h3 className="heading-3 margin-bottom-2">
                                Transforming Your Workout
                            </h3>

                            <p className="body-copy--larger margin-bottom-3 width-50">
                                The body achieves what the mind believes.
                            </p>

                            <ArrowButton link="/shop" text="Explore Products" />
                        </div>
                    </div>
                </article>

                <article className="section-medium flex flex-column align-center">
                    <h2 className="heading-2 margin-bottom-4">
                        New in Store
                    </h2>

                    <ul className="list-s-none products margin-bottom-3">
                        {productItems}
                    </ul>

                    <ArrowButton 
                        link="/shop" 
                        text="View All" 
                        addon="bg-black body-copy--largest" 
                    />
                </article>
            </section>
        </>
    );
}

export default Home;