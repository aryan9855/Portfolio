const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/contact
router.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!process.env.RESEND_API_KEY) {
        console.error('Missing RESEND_API_KEY in environment');
        return res.status(500).json({ success: false, message: 'Server config error', debug: 'Missing RESEND_API_KEY' });
    }

    try {
        // 1. Notification to ADMIN (You)
        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.GMAIL_USER || 'aryanworkspace90@gmail.com',
            replyTo: email,
            subject: `[Portfolio Inquiry] ${subject || 'New Message'}`,
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
        });

        // 2. Auto-Reply to VISITOR
        await resend.emails.send({
            from: 'Aryan Singhal <onboarding@resend.dev>',
            to: email,
            subject: `Thank you for reaching out, ${name.split(' ')[0]}! — Aryan Singhal`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #C8A96E, #A8894E); padding: 30px; text-align: center;">
                        <h1 style="margin: 0; color: #0A0A0A; font-size: 24px;">Thank You, ${name.split(' ')[0]}!</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p style="color: #F5F0E8; line-height: 1.6;">I appreciate you reaching out. I've received your message and will get back to you as soon as possible.</p>
                        <p style="color: #A0A0A0; line-height: 1.6;">In the meantime, feel free to check out my work or connect with me on social media.</p>
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333;">
                            <p style="color: #C8A96E; margin: 0;">Best regards,</p>
                            <p style="color: #F5F0E8; font-weight: bold; margin: 5px 0;">Aryan Singhal</p>
                            <p style="color: #A0A0A0; font-size: 12px;">Creative Developer & Designer</p>
                        </div>
                    </div>
                </div>
            `
        });

        console.log(`Success: Inquiry from ${name} (${email})`);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Resend Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message.',
            debug: error.message
        });
    }
});

module.exports = router;
