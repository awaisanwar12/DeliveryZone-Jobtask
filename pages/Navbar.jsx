// Navbar.js
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        
        <li>
          <Link href="/">
            <a>Entries</a>
          </Link>
        </li>
        <li>
          <Link href="/hipolabs">
            <a>Hipolabs</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
