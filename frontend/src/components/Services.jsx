import React, { useEffect, useRef } from 'react';

const Services = () => {
    const revealEls = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12 });

        revealEls.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const services = [
        { num: '01', icon: 'FS', title: 'Full-Stack MERN', desc: 'Building production-grade applications with MongoDB, Express, React, and Node.js.' },
        { num: '02', icon: 'AI', title: 'GenAI Solutions', desc: 'Integrating advanced LLMs like Llama 3.3 and Groq API for intelligent web simulations.' },
        { num: '03', icon: 'SD', title: 'System Design', desc: 'Designing scalable, high-performance systems with efficient architectures, optimized load handling, and thoughtful engineering trade-offs.' },
        {
            num: '04',
            icon: 'PS',
            title: 'Problem Solving',
            desc: 'Mastering DSA and System Design to optimize performance and solve complex engineering challenges.',
            links: [
                { name: 'LeetCode', url: 'https://leetcode.com/u/aryan1_code/' },
                { name: 'GFG', url: 'https://www.geeksforgeeks.org/profile/aryan1_code?tab=overview' }
            ]
        }
    ];

    return (
        <section id="services">
            <div className="section-label reveal" ref={(el) => { revealEls.current[0] = el; }}>What I Do</div>
            <h2 className="section-title reveal" ref={(el) => { revealEls.current[1] = el; }}>I Can Help<br />You With</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div
                        key={service.num}
                        className="service-card reveal"
                        ref={(el) => { revealEls.current[index + 2] = el; }}
                    >
                        <div className="service-num">{service.num}</div>
                        <div className="service-icon">{service.icon}</div>
                        <div className="service-name">{service.title}</div>
                        <p className="service-desc">{service.desc}</p>
                        {service.links && (
                            <div className="service-links">
                                {service.links.map((link) => (
                                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="service-link">
                                        {link.name} {'->'}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;


