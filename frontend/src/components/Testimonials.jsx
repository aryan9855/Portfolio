import React, { useEffect, useRef } from 'react';

const Testimonials = () => {
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

    const testimonials = [
        {
            stars: '5/5',
            text: "Aryan's work on CredNova is a masterclass in applying Explainable AI to real-world financial problems. Winning first place at our hackathon was a well-deserved achievement for such a technically sound project.",
            author: 'Aditya Verma',
            role: 'Professor, CPU Kota University',
            avatar: 'A'
        }
    ];

    return (
        <section id="testimonials">
            <div className="section-label reveal" ref={(el) => { revealEls.current[0] = el; }}>Social Proof</div>
            <h2 className="section-title reveal" ref={(el) => { revealEls.current[1] = el; }}>What Clients<br />Are Saying</h2>
            <div className="testimonials-row reveal" ref={(el) => { revealEls.current[2] = el; }}>
                {testimonials.map((t) => (
                    <div key={t.author} className="testimonial-card">
                        <div className="stars">{t.stars}</div>
                        <div className="quote-mark">"</div>
                        <p className="testimonial-text">{t.text}</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">{t.avatar}</div>
                            <div>
                                <div className="author-name">{t.author}</div>
                                <div className="author-role">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
