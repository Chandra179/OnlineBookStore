import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes/routes'
import './index.css';

import CartContextProvider from './context/cartContext'

ReactDOM.render(
  <CartContextProvider>
    <Routes />
  </CartContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
