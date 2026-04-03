import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navStyle = {
        padding: scrolled ? '14px 60px' : '24px 60px',
        boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.08)' : 'none'
    };

    return (
        <nav style={navStyle}>
            <a href="#top" className="nav-logo">Aryan Singhal</a>
            <ul className="nav-links">
                <li><a href="#works">Works</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact" className="nav-cta">Hire Me</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
