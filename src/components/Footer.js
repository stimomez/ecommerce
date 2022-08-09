import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
     
    <footer>
      <p className="text-footer">© Stiven Morales</p>
      <ul className="footer">
        <li className="footer-li">
          <a href="http://stivenmoralesdev.com/" title="Portfolio" target="noopener">
            <i className="icon-footer fa-solid fa-folder-closed"></i>
          </a>
        </li>
        <li className="footer-li">
          <a href="https://www.linkedin.com/in/stiven-morales-meza-8a528421a" title="Linkedin" target="noopener">
            <i className="icon-footer fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li className="footer-li">
          <a href="https://github.com/stimomez" title="GitHub" target="noopener">
            <i className="icon-footer fa-brands fa-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  
  );
};

export default Footer;
