const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getAutoReplyTemplate } = require('../utils/emailTemplates');

// POST /api/contact
router.post('/contact', async (req, res) => {
    console.log('Contact request received:', JSON.stringify(req.body));

    const { name, email, subject, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    // Check environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        console.error('Missing Gmail credentials in env');
        return res.status(500).json({ success: false, message: 'Server configuration error (missing email credentials)' });
    }

    // Nodemailer Transporter Configuration with timeouts
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        connectionTimeout: 10000,  // 10s to connect
        greetingTimeout: 10000,    // 10s for greeting
        socketTimeout: 15000,      // 15s for socket
    });

    // 1. Notification to ADMIN (You)
    const adminMailOptions = {
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject || 'New Message'}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #EEE; border-radius: 8px;">
                <h3 style="color: #0A0A0A; border-bottom: 2px solid #C8A96E; padding-bottom: 10px;">New Inquiry Received</h3>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #F9F9F9; padding: 15px; border-left: 4px solid #C8A96E; font-style: italic;">
                    ${message}
                </blockquote>
            </div>
        `
    };

    // 2. Auto-Reply to VISITOR
    const visitorMailOptions = {
        from: `"Aryan Singhal" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Thank you for reaching out, ${name.split(' ')[0]}! — Aryan Singhal`,
        html: getAutoReplyTemplate(name)
    };

    try {
        // Send both emails in parallel
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(visitorMailOptions)
        ]);

        console.log(`Success: Inquiry sent to Admin & Auto-Reply sent to ${email}`);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Nodemailer Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to send message.',
            debug: error.message
        });
    }
});

module.exports = router;
