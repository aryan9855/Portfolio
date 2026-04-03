const getAutoReplyTemplate = (name) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #FAFAF7; }
        .container { max-width: 600px; margin: 40px auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid rgba(10,10,10,0.05); }
        .header { background-color: #F5F0E8; padding: 40px; text-align: center; border-bottom: 1px solid rgba(10,10,10,0.05); }
        .header h1 { font-family: 'Playfair Display', serif; font-size: 28px; font-style: italic; color: #0A0A0A; margin: 0; }
        .content { padding: 40px; }
        .content p { font-size: 16px; margin-bottom: 24px; color: #333; }
        .footer { padding: 30px 40px; background-color: #1A1A1A; color: rgba(255,255,255,0.5); text-align: center; }
        .footer a { color: #C8A96E; text-decoration: none; font-weight: 600; margin: 0 10px; font-size: 13px; text-transform: uppercase; }
        .signature { margin-top: 40px; border-top: 1px solid #EEE; padding-top: 20px; font-weight: 600; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Aryan Singhal.</h1>
        </div>
        <div class="content">
            <p>Hey ${name},</p>
            <p>Thank you for reaching out! I've successfully received your message from my portfolio and wanted to let you know that I'm already looking into it.</p>
            <p>I value every inquiry and will get back to you personally within the next 24-48 hours to discuss how we can build something great together.</p>
            <p>In the meantime, you can explore more of my recent work on GitHub and LinkedIn.</p>
            <div class="signature">
                Best regards,<br>
                Aryan Singhal - Creative Developer
            </div>
        </div>
        <div class="footer">
            <a href="https://github.com/aryan9855">GitHub</a>
            <a href="https://linkedin.com/in/aryanlinked">LinkedIn</a>
            <a href="mailto:aryanworkspace90@gmail.com">Email</a>
            <p style="font-size: 11px; margin-top: 20px;">&copy; 2026 Aryan Singhal. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = { getAutoReplyTemplate };
