import React, { useContext } from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom'
import UserContext from '../contexts/UserContext';

export const Navbar = (props) => {
  const { userDetails,userLogOut } = useContext(UserContext)
  const location = useLocation();
  const navigate=useNavigate();

  const handleLogIn=()=>{
   if(userDetails.loggedIn)
   userLogOut();
    navigate('/login');
  }

  return (<div>
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <span className="navbar-item" >
          {props.title}
        </span>

        <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className={`navbar-item ${location.pathname === "/" ? "is-active" : ""}`} to="/">
            Home
          </Link>

          <Link  className={`navbar-item ${location.pathname === "/about" ? "is-active" : ""}`} to="/about">
            About
          </Link>

        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons " >
              <Link className={`button is-primary ${userDetails.loggedIn?'is-hidden':''}`} to="/signup">
                <strong>Sign up</strong>
              </Link>
              <button className={`button ${userDetails.loggedIn?'is-danger':''}`} onClick={handleLogIn} to="/login">
                {userDetails.loggedIn?'Log out':'Log In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>);
};
