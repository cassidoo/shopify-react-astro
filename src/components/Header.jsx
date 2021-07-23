import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      <h1>
        <a href="/">Shoperoni</a>
      </h1>
      <nav className="main-nav">
        <ul>
          <li className="main-nav-item">
            <a href="/">All Products</a>
          </li>
          {/* <li className="main-nav-item">
            <a href="/cheeses">Cheeses</a>
          </li>
          <li className="main-nav-item">
            <a href="/meats">Meats</a>
          </li>
          <li className="main-nav-item">
            <a href="/boards">Boards</a>
          </li> */}
          <li className="main-nav-item">
            <a href="/cart" className="cart cartLink">
              Shopping Cart
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
