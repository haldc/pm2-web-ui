import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../store';
import Link from 'next/link';

export default function() {
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <nav className="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <img src="/img/logo.png" width="66" height="28"/>
          </a>
        </Link>

        <a role="button" className={`navbar-burger burger ${burgerActive ? 'is-active' : ''}`} onClick={() => setBurgerActive(!burgerActive)} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" className={`navbar-menu ${burgerActive ? 'is-active' : ''}`}>
        {
          <div className="navbar-start">
            <Link href="/"><a className="navbar-item">Dashboard</a></Link>
            
            {
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Administration
                </a>

                <div className="navbar-dropdown">
                  <Link href="/deployment"><a className="navbar-item">Deploy an application</a></Link>
                </div>
              </div>
            }
          </div>
        }

        <div className="navbar-end">
        </div>
      </div>
    </nav>
  );
};