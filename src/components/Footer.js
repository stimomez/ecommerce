import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
     
    <footer>
      <p className="text-footer">© Stiven Morales</p>
      <ul className="footer">
        <li className="footer-li">
          <a href="https://www.instagram.com/stimomez/">
            <i className="icon-footer fa-brands fa-instagram-square"></i>
          </a>
        </li>
        <li className="footer-li">
          <a href="https://www.linkedin.com/in/stiven-morales-meza-8a528421a">
            <i className="icon-footer fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li className="footer-li">
          <a href="https://github.com/stimomez">
            <i className="icon-footer fa-brands fa-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  
  );
};

export default Footer;
