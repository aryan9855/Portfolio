import React, { useEffect, useRef } from 'react';

const Works = ({ projects = [] }) => {
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
    }, [projects]);

    return (
        <section id="works">
            <div className="works-header">
                <div>
                    <div className="section-label reveal" ref={el => revealEls.current[0] = el}>Portfolio</div>
                    <h2 className="section-title reveal" ref={el => revealEls.current[1] = el}>Recent<br />Projects</h2>
                </div>

            </div>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div 
                        key={index} 
                        className="project-card reveal" 
                        ref={el => revealEls.current[index + 2] = el}
                    >
                        <div className="project-bg">
                            {typeof project.image === 'string' && (project.image.includes('/') || project.image.includes('.') || project.image.startsWith('data:')) ? (
                                <img src={project.image} alt={project.title} className="project-thumb" />
                            ) : (
                                project.image || '🚀'
                            )}
                        </div>
                        <div className="project-info-always">
                            <div className="project-tag">{project.tag}</div>
                            <div className="project-title">{project.title}</div>
                        </div>
                        <div className="project-overlay">
                            <div className="project-tag">{project.tag}</div>
                            <div className="project-title">{project.title}</div>
                            <div className="project-actions">
                                <a href={project.live || '#'} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo →</a>
                                <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="project-link">Source Code →</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Works;
