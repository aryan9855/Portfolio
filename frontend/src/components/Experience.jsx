import React, { useEffect, useRef } from 'react';

const Experience = ({ experience = [] }) => {
    const revealEls = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12 });

        revealEls.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [experience]);

    const workExperience = experience.filter(exp => exp.type === 'work');
    const education = experience.filter(exp => exp.type === 'education');

    return (
        <section id="experience">
            <div className="section-label reveal" ref={el => revealEls.current[0] = el}>My Journey</div>
            <h2 className="section-title reveal" ref={el => revealEls.current[1] = el}>Experience &<br />Education</h2>
            <div className="experience-grid">
                <div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', marginBottom: '8px', marginTop: '40px' }} className="reveal" ref={el => revealEls.current[2] = el}>Work Experience</h3>
                    <div className="timeline-list">
                        {workExperience.map((item, index) => (
                            <div key={index} className="timeline-item reveal" ref={el => revealEls.current[index + 3] = el}>
                                <div className="timeline-year">{item.year}</div>
                                <div>
                                    <div className="timeline-role">{item.role}</div>
                                    <div className="timeline-company">{item.company}</div>
                                    <div className="timeline-desc">{item.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', marginBottom: '8px', marginTop: '40px' }} className="reveal" ref={el => revealEls.current[workExperience.length + 3] = el}>Education</h3>
                    <div className="timeline-list">
                        {education.map((item, index) => (
                            <div key={index} className="timeline-item reveal" ref={el => revealEls.current[index + workExperience.length + 4] = el}>
                                <div className="timeline-year">{item.year}</div>
                                <div>
                                    <div className="timeline-role">{item.role}</div>
                                    <div className="timeline-company">{item.company}</div>
                                    <div className="timeline-desc">{item.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
