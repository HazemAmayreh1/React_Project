import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
  return (
    <footer className="bg-light text-center py-3">
      <Container>
        <div className="mb-3">
          <a href="https://www.facebook.com/profile.php?id=100003449605865" className="text-dark mx-2 icon-hover" title="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/hazem_agil/" className="text-dark mx-2 icon-hover" title="Follow us on Twitter" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://www.instagram.com/hazem_agil/" className="text-dark mx-2 " title="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/hazem-amayreh-b2a1292b0/" className="text-dark mx-2 icon-hover" title="Connect with us on LinkedIn" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} <a className="text-dark" href="mailto:hazemamayreh44@gmail.com">Hazem Amayreh.</a></p>
      </Container>
    </footer>
  );
}

export default Footer;
