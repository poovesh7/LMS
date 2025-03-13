import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#7303c0" }}>
      <div className="container-fluid">
        {/* LMS Title */}
        <a className="navbar-brand text-white" href="/">LMS</a>

        {/* Navbar Toggle Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/courses">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/courses">Courses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/about">About Us</a>
            </li>
          </ul>

          {/* Category Dropdown */}
          <div className="dropdown me-3">
            <button className="btn btn-light dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
              <li><a className="dropdown-item" href="/category/web-development">Web Development</a></li>
              <li><a className="dropdown-item" href="/category/data-science">Data Science</a></li>
              <li><a className="dropdown-item" href="/category/design">Design</a></li>
            </ul>
          </div>

          {/* Search Bar */}
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search courses..." aria-label="Search" />
            <button className="btn btn-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
