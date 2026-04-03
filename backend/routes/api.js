const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getAutoReplyTemplate } = require('../utils/emailTemplates');

const escapeHtml = (value = '') =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const sanitizeInput = (value = '') => value.toString().trim();

router.post('/contact', async (req, res) => {
    console.log('Contact request received:', JSON.stringify(req.body));

    const name = sanitizeInput(req.body?.name);
    const email = sanitizeInput(req.body?.email);
    const subject = sanitizeInput(req.body?.subject);
    const message = sanitizeInput(req.body?.message);

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        console.error('Missing Gmail credentials in env');
        return res.status(500).json({ success: false, message: 'Server configuration error (missing email credentials)' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
    });

    const adminMailOptions = {
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject || 'New Message'}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #EEE; border-radius: 8px;">
                <h3 style="color: #0A0A0A; border-bottom: 2px solid #C8A96E; padding-bottom: 10px;">New Inquiry Received</h3>
                <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject || 'General Inquiry')}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #F9F9F9; padding: 15px; border-left: 4px solid #C8A96E; font-style: italic;">
                    ${escapeHtml(message).replace(/\n/g, '<br />')}
                </blockquote>
            </div>
        `
    };

    const visitorMailOptions = {
        from: `"Aryan Singhal" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Thank you for reaching out, ${name.split(' ')[0]}! - Aryan Singhal`,
        html: getAutoReplyTemplate(name)
    };

    try {
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(visitorMailOptions)
        ]);

        console.log(`Success: Inquiry sent to Admin & Auto-Reply sent to ${email}`);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Nodemailer Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to send message.',
            debug: error.message
        });
    }
});

module.exports = router;
