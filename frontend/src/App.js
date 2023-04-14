import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import ProductDetails from "./Pages/ProductDetails";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import FourOhFour from "./Pages/FourOhFour";
import Layout from "./Layout";
import Checkout from "./Pages/Checkout";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout page="home" />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>

        <Route element={<Layout page="about" />}>
          <Route path="about" element={<About />} />
        </Route>

        <Route element={<Layout page="shop" />}>
          <Route path="shop" element={<Shop />} />
        </Route>

        <Route element={<Layout page="contact" />}>
          <Route path="contact" element={<Contact />} />
        </Route>


        <Route element={<Layout page="" />}>
          <Route path="product/:product_id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart/checkout" element={<Checkout />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;