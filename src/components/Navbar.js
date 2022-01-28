import React from 'react';
import {Link,useLocation} from 'react-router-dom'

export const Navbar = (props) => {

  let location = useLocation();

  return (<div>
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" >
          {props.title}
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className={`navbar-item ${location.pathname==="/"?"is-active":""}`} to="/">
            Home
          </Link>

          <Link className={`navbar-item ${location.pathname==="/about"?"is-active":""}`} to="/about">
            About
          </Link>

        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>);
};
