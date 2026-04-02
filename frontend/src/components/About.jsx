import React, { useEffect, useRef } from 'react';

const About = ({ skills = [] }) => {
    const revealEls = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Animate skill bars
                    const bars = entry.target.querySelectorAll('.skill-bar');
                    bars.forEach(bar => {
                        bar.style.width = bar.dataset.width;
                    });
                }
            });
        }, { threshold: 0.12 });

        revealEls.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [skills]);

    return (
        <section id="about">
            <div className="section-label reveal" ref={el => revealEls.current[0] = el} style={{ color: 'var(--accent)' }}>My Story</div>
            <h2 className="section-title reveal" ref={el => revealEls.current[1] = el}>Turning Vision<br />Into Reality</h2>
            <div className="about-grid">
                <div className="about-text reveal" ref={el => revealEls.current[2] = el}>
                    <p>I'm Aryan Singhal, a Full-Stack MERN Developer based in India, currently pursuing my B.Tech from IIIT Kota (2023-2027). My expertise lies in building high-performance, real-world applications that solve complex problems using modern engineering disciplines.</p>
                    <p>I specialize in architecting scalable backend systems, integrating AI solutions, and mastering Data Structures & Algorithms, with a proven track record of 1st place in national-level hackathons like HackSprint.</p>
                    <div className="about-facts">
                        <div className="fact">
                            <div className="fact-num">1st</div>
                            <div className="fact-label">Hackathon Winner</div>
                        </div>
                        <div className="fact">
                            <div className="fact-num">900+</div>
                            <div className="fact-label">DSA Solutions</div>
                        </div>
                    </div>
                </div>
                <div className="skills-section reveal" ref={el => revealEls.current[3] = el}>
                    <h3>Skills & Expertise</h3>
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-row">
                            <div className="skill-meta"><span>{skill.name}</span><span>{skill.percentage}%</span></div>
                            <div className="skill-bar-bg">
                                <div className="skill-bar" data-width={`${skill.percentage}%`} style={{ width: 0 }}></div>
                            </div>
                        </div>
                    ))}
                    <div className="tools-list">
                        {['C++', 'React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'SQL', 'REST API', 'DBMS', 'Operating System'].map(tool => (
                            <span key={tool} className="tool-tag">{tool}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
