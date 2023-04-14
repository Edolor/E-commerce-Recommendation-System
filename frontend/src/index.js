import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// will need to install boostrap 5 for this
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import "./Assets/css/app.css";
import { CartProvider } from "./Contexts/CartContext";
import { ActivePageProvider } from "./Contexts/ActivePageContext";
import { SocialProvider } from './Contexts/SocialContext';
import { SearchProvider } from './Contexts/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
  Product provider is a context that ensures the functions that
  will handle all actions relating to the product is top notch.
*/

/*
  Active page provider ensures that the proper active page indicator
  is passed when the right page is stumbled upon.
*/

root.render(
  <CartProvider>
    <ActivePageProvider>
      <SocialProvider>
        <SearchProvider>
          <Router>
            <App />
          </Router>
        </SearchProvider>
      </SocialProvider>
    </ActivePageProvider>
  </CartProvider>
);