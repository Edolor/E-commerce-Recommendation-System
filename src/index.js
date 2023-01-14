import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import "./Assets/css/style.css";
import "./Assets/css/main.css";
import reportWebVitals from './reportWebVitals';
import { ActivePageProvider } from "./Contexts/ActivePageContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ActivePageProvider>
      <Router>
        <App />
      </Router>
    </ActivePageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
