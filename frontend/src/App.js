import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import ProductDetails from "./Pages/Product/ProductDetails";
import Shop from "./Pages/Shop/Shop";
import Cart from "./Pages/Cart/Cart";
import NoPage from "./Pages/NoPage/NoPage";
import Layout from "./Layout";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout pageNo="0" />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
      </Route>

      <Route element={<Layout pageNo="1" />}>
        <Route path="about" element={<About />} />
      </Route>

      <Route element={<Layout pageNo="2" />}>
        <Route path="shop" element={<Shop />} />
      </Route>

      <Route element={<Layout pageNo="3" />}>
        <Route path="contact" element={<Contact />} />
      </Route>
            

      <Route element={<Layout pageNo="-1" />}>
        <Route path="product/:product_id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NoPage />} />
      </Route> 
    </Routes>
  );
}

export default App;