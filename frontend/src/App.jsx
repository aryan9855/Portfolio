import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import About from './components/About';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { projects, experience, skills } from './data';

function App() {
  return (
    <div id="top">
      <CustomCursor />
      <Navbar />
      <Hero />

      <div className="marquee-strip">
        <div className="marquee-track">
          {['Full-Stack MERN', 'System Design', 'Data Structures', 'RESTful APIs', 'AI Integration', 'React.js', 'Node.js', 'MongoDB'].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
          {['Full-Stack MERN', 'System Design', 'Data Structures', 'RESTful APIs', 'AI Integration', 'React.js', 'Node.js', 'MongoDB'].map((item, i) => (
            <span key={i + 10} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      <Services />
      <Works projects={projects} />
      <About skills={skills} />
      <Experience experience={experience} />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
