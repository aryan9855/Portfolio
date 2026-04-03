import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const revealEls = useRef([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setStatus('loading');

        // EmailJS Configuration from environment variables
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
        const VISITOR_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_VISITOR;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!SERVICE_ID || !PUBLIC_KEY) {
            console.error('EmailJS credentials missing');
            setStatus('error');
            setErrorMessage('Email service is not configured correctly. Please email me directly below.');
            return;
        }

        const templateParams = {
            from_name: formData.name.trim(),
            from_email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            to_name: 'Aryan', // Used in visitor template
        };

        try {
            // 1. Send Notification to Admin
            const adminPromise = emailjs.send(
                SERVICE_ID,
                ADMIN_TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            // 2. Send Auto-Reply to Visitor (if template ID provided)
            const visitorPromise = VISITOR_TEMPLATE_ID 
                ? emailjs.send(SERVICE_ID, VISITOR_TEMPLATE_ID, templateParams, PUBLIC_KEY)
                : Promise.resolve();

            await Promise.all([adminPromise, visitorPromise]);

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setErrorMessage('Unable to send the message right now. Please try again or email me directly below.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact">
            <div className="contact-inner">
                <div className="section-label reveal" ref={(el) => { revealEls.current[0] = el; }}>
                    Get In Touch
                </div>

                <h2 className="contact-big reveal" ref={(el) => { revealEls.current[1] = el; }}>
                    Let's Build<br />Something <em>Great</em>
                </h2>

                <div className="contact-container reveal" ref={(el) => { revealEls.current[2] = el; }}>
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

                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'error' && (
                                <p className="status-message error">
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    )}
                </div>

                <div
                    className="contact-footer reveal"
                    ref={(el) => { revealEls.current[3] = el; }}
                    style={{ marginTop: '60px' }}
                >
                    <a href="mailto:aryanworkspace90@gmail.com" className="contact-email">
                        aryanworkspace90@gmail.com
                    </a>

                    <div className="contact-socials" style={{ marginTop: '30px' }}>
                        <a href="https://linkedin.com/in/aryanlinked" className="social-btn">in</a>
                        <a href="https://github.com/aryan9855" className="social-btn">gh</a>
                        <a href="mailto:aryanworkspace90@gmail.com" className="social-btn">@</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

