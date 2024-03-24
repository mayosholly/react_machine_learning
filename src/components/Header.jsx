import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from  "../context/AuthContext";


const Header = () => {
  
  const { logout} = useContext(AuthContext); // Use default empty object to avoid null error
  const navigate = useNavigate();
  const user = localStorage.getItem('user')
  console.log(user);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
 
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">React ML Project</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
<>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to={"/gold-prediction"}>Gold</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link"  to={"/orchid-prediction"}>Orchid</Link>
              </li>

              <li className="nav-item">
          <button className="nav-link" onClick={handleLogout}>Logout</button>
        </li>
        </>
                ) : (
                  <>
              <li className="nav-item">
                <Link className="nav-link"  to={"/login"}>Login</Link>
              </li>
              </>
                )}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />   
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      
 

  
    </>
  );
};

export default Header;
