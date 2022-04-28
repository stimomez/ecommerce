import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
     
    <footer>
      <p>© Academlo 2022</p>
      <ul className="footer">
        <li>
          <a href="https://www.instagram.com/academlohq/">
            <i className="fa-brands fa-instagram-square"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/academlo/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/c/academlo">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </li>
      </ul>
    </footer>
  
  );
};

export default Footer;
