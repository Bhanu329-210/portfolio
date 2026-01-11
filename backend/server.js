import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// Use port 5001 to avoid conflict with common port 5000 or others
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Standard Gmail SMTP
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // Valid system email
            to: 'bhanuprakashalahari.04@gmail.com', // Destination email as requested
            replyTo: email, // Valid reply-to header from user input
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <br>
                <p><strong>Message:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
            </div>
        `,
        };

        // Verify transporter before sending
        await transporter.verify();

        // Send email
        await transporter.sendMail(mailOptions);

        console.log(`Email sent from ${email}`);
        return res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Email send error:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
