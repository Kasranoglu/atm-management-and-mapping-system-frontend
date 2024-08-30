import React from "react";
import "../navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
        Şekerbank ATM
      </a>
      <ul className="nav__menu">
        <li className="nav__item">
          <a href="/" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="/map" className="nav__link">
            Map
          </a>
        </li>
        <li className="nav__item">
          <a href="/create-atm" className="nav__link">
            Create ATM
          </a>
        </li>
      </ul>
    </nav>
  );
}
