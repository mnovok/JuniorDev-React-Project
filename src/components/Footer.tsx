import '../styles/footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Srce Jadrana</h3>
        <h4>Stranica izrađena kao završni projekt tečaja JuniorDev React.</h4>
      </div>

      <div className="footer-icons">
        <a href="https://github.com/mnovok" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/marijanovokmet" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>

      <div className="footer-bottom">
        <p>&copy; Copyright 2024, Marija Novokmet</p>
      </div>
    </footer>
  );
};

export default Footer;
