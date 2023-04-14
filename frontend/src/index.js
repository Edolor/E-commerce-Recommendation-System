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

import reportWebVitals from './reportWebVitals';

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
  <React.StrictMode>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
