import Product from "../../Components/Product/Product.jsx";

function Shop(props) {
    const PRODUCTS = [
        {
            id: 1, 
            title: "D2250.4 PRO ROUND", 
            price: "15,000", 
            src: "./Assets/images/product.jpg", 
            altText: "Image of weights",
            discount: true,
            discountPercentage: "23%",
            formerPrice: "40,000"
        },
        {
            id: 2, 
            title: "D2250.4 PRO ROUND", 
            price: "15,000", 
            src: "./Assets/images/product.jpg", 
            altText: "Image of weights",
            discount: true,
            discountPercentage: "23%",
            formerPrice: "40,000"
        },
        {
            id: 3, 
            title: "D2250.4 PRO ROUND", 
            price: "15,000", 
            src: "./Assets/images/product.jpg", 
            altText: "Image of weights",
            discount: true,
            discountPercentage: "23%",
            formerPrice: "40,000"
        },
        {
            id: 4, 
            title: "D2250.4 PRO ROUND", 
            price: "15,000", 
            src: "./Assets/images/product.jpg", 
            altText: "Image of weights",
            discount: true,
            discountPercentage: "23%",
            formerPrice: "40,000"
        },
        {
            id: 5, 
            title: "D2250.4 PRO ROUND", 
            price: "15,000", 
            src: "./Assets/images/product.jpg", 
            altText: "Image of weights",
            discount: true,
            discountPercentage: "23%",
            formerPrice: "40,000"
        },
        {
            id: 6, 
            title: "D2250.4 PRO ROUND", 
            price: "15,000", 
            src: "./Assets/images/product.jpg", 
            altText: "Image of weights",
            discount: true,
            discountPercentage: "23%",
            formerPrice: "40,000"
        },
    ];

    const productItems = PRODUCTS.map(el => {
        return (
            <li key={el.id}>
                <Product product={el} />
            </li>
        );
    });

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