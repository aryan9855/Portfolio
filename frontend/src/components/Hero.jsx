import React, { useEffect } from 'react';
import heroImg from '../assets/hero.png';

const Hero = () => {
  useEffect(() => {
    const revealHero = () => {
      const heroRevealEls = document.querySelectorAll('.hero .reveal');
      heroRevealEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
    };

    const timer = setTimeout(revealHero, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-left">
        <div className="available-badge reveal">
          <span className="badge-dot"></span>
          Available for new opportunities
        </div>
        <h1>
          <div className="hero-greeting reveal">Hey, <em style={{ fontStyle: 'italic' }}>there!</em></div>
          <div className="hero-greeting reveal">I am <em style={{ fontStyle: 'italic' }}>Aryan</em></div>
        </h1>
        <p className="hero-title reveal">Software Engineer &amp; Full-Stack MERN Developer</p>
        <p className="hero-desc reveal">I build production-grade MERN applications and GenAI-powered solutions. Currently at IIIT Kota, I focus on architecting scalable systems and solving complex problems with 900+ DSA success stories.</p>
        <div className="hero-actions reveal">
          <a href="#works" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Let's Talk {'->'}</a>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-blob"></div>
        <div className="hero-portrait-wrap reveal">
          <img src={heroImg} alt="Aryan" className="hero-portrait" />
        </div>
        <div className="hero-stats reveal">
          <div className="stat reveal">
            <div className="stat-num">12+</div>
            <div className="stat-label">Projects Done</div>
          </div>
          <div className="stat reveal">
            <div className="stat-num">900+</div>
            <div className="stat-label">DSA Problems Solved</div>
          </div>
          <div className="stat reveal">
            <div className="stat-num">10+</div>
            <div className="stat-label">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


