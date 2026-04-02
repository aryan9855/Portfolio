import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Contact = () => {
    const revealEls = useRef([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

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
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await axios.post('/api/contact', formData);
            if (response.data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact">
            <div className="contact-inner">
                <div className="section-label reveal" ref={el => revealEls.current[0] = el}>Get In Touch</div>
                <h2 className="contact-big reveal" ref={el => revealEls.current[1] = el}>
                    Let's Build<br />Something <em>Great</em>
                </h2>

                <div className="contact-container reveal" ref={el => revealEls.current[2] = el}>
                    {status === 'success' ? (
                        <div className="status-message success">
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'error' && <p className="status-message error">Oops! Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </div>

                <div className="contact-footer reveal" ref={el => revealEls.current[3] = el} style={{ marginTop: '60px' }}>
                    <a href="mailto:aryanworkspace90@gmail.com" className="contact-email">aryanworkspace90@gmail.com</a>
                    <div className="contact-socials" style={{ marginTop: '30px' }}>
                        <a href="https://linkedin.com/in/aryanlinked" className="social-btn" title="LinkedIn">in</a>
                        <a href="https://github.com/aryan9855" className="social-btn" title="GitHub">gh</a>
                        <a href="mailto:aryanworkspace90@gmail.com" className="social-btn" title="Email">✉</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
