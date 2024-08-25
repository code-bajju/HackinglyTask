import React from "react";
import PrivateRoute from "../utils/PrivateRoute";


const Home = () => {
  return (
    <div className="container">
      <div className="left-section">
        <div className="text-content">
          <h1 className="title">Innovate with Us</h1>
          <p className="description">Discover new possibilities and drive success.</p>
          <a 
            href="https://spacema-dev.com/free-tailwind-css-templates/" 
            className="cta-button"
          >
            Free Tailwind Template
          </a>
        </div>
      </div>
      <div className="right-section"></div>
    </div>
  );
};



export default PrivateRoute(Home);
