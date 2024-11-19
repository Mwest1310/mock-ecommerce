import React, { useState, useEffect } from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const [year, setYear] = useState(null);
    useEffect(() => {
        const d = new Date();
        const y = d.getFullYear();
        setYear(y);
    }, []);
  return (
    <footer id="footer">
        <p>&copy; MW - {year}</p>
        <a href="mailto:Mwest2000@matthewwest.dev">Mwest2000@matthewwest.dev</a>
        <div>
            <a href="https://github.com/Mwest1310" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://www.linkedin.com/in/matthew-west-98b5481b8/" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
    </footer>
  );
};

export default Footer;