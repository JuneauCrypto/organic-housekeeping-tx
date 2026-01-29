const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Email configuration
let transporter;

function initializeEmailTransporter() {
    try {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false // For self-signed certificates
            }
        });

        // Verify connection
        transporter.verify(function(error, success) {
            if (error) {
                console.error('Email transporter verification failed:', error);
            } else {
                console.log('Email transporter is ready to send messages');
            }
        });
    } catch (error) {
        console.error('Error initializing email transporter:', error);
    }
}

// Initialize email transporter on startup
initializeEmailTransporter();

// Validation rules
const quoteValidation = [
    body('location').notEmpty().withMessage('Location is required'),
    body('location').isIn(['Woodforest and The Woodlands', 'Spring', 'Houston']).withMessage('Invalid location selected'),
    body('address').notEmpty().trim().withMessage('Address is required'),
    body('address').isLength({ min: 5, max: 500 }).withMessage('Address must be between 5 and 500 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().trim().withMessage('Phone is required'),
    body('phone').matches(/^[\d\s\(\)\-\.]+$/).withMessage('Invalid phone number format'),
    body('serviceType').notEmpty().withMessage('Service type is required'),
    body('serviceType').isIn(['Move in/move out', 'One time deep clean', 'Bi-weekly service', 'Weekly service', 'Monthly service', 'Airbnb', 'New home builds', 'Other']).withMessage('Invalid service type'),
    body('notes').optional().isLength({ max: 2000 }).withMessage('Notes must be less than 2000 characters')
];

const contactValidation = [
    body('location').notEmpty().withMessage('Location is required'),
    body('location').isIn(['Woodforest and The Woodlands', 'Spring', 'Houston']).withMessage('Invalid location selected'),
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('name').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().trim().withMessage('Phone is required'),
    body('phone').matches(/^[\d\s\(\)\-\.]+$/).withMessage('Invalid phone number format'),
    body('notes').notEmpty().trim().withMessage('Notes are required'),
    body('notes').isLength({ min: 10, max: 2000 }).withMessage('Notes must be between 10 and 2000 characters')
];

// Location to email mapping
const locationEmails = {
    'Woodforest and The Woodlands': 'info@cleancleaningtx.com',
    'Spring': 'info@organichousekeepingtx.com',
    'Houston': 'info@houstongreenmaid.com'
};

// Helper function to send email
async function sendEmail(subject, htmlContent, toEmail = null) {
    if (!transporter) {
        throw new Error('Email transporter not initialized. Please check your .env configuration.');
    }

    // Use location-specific email if provided, otherwise use default
    const recipientEmail = toEmail || process.env.EMAIL_TO || 'info@organichousekeepingtx.com';

    const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: recipientEmail,
        subject: subject,
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', recipientEmail, ':', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Quote inquiry endpoint
app.post('/api/quote', quoteValidation, async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: errors.array() 
            });
        }

        const { location, address, email, phone, serviceType, notes } = req.body;

        // Sanitize inputs
        const sanitizedData = {
            location: location.trim(),
            address: address.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            serviceType: serviceType.trim(),
            notes: notes ? notes.trim() : ''
        };

        // Get location-specific email
        const recipientEmail = locationEmails[sanitizedData.location] || process.env.EMAIL_TO || 'info@organichousekeepingtx.com';

        // Create email subject
        const subject = `from organic - quote request`;

        // Create email HTML content
        const htmlContent = `
            <h2>New Quote Inquiry</h2>
            <p><strong>Location:</strong> ${sanitizedData.location}</p>
            <p><strong>Address:</strong> ${sanitizedData.address}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
            <p><strong>Service Type:</strong> ${sanitizedData.serviceType}</p>
            ${sanitizedData.notes ? `<p><strong>Notes:</strong><br>${sanitizedData.notes.replace(/\n/g, '<br>')}</p>` : ''}
            <hr>
            <p><small>This email was sent from the Organic Housekeeping TX website contact form.</small></p>
        `;

        // Send email to location-specific address
        await sendEmail(subject, htmlContent, recipientEmail);

        res.json({ 
            success: true, 
            message: 'Quote request submitted successfully' 
        });

    } catch (error) {
        console.error('Error processing quote request:', error);
        res.status(500).json({ 
            error: 'Failed to send quote request. Please try again later or call us at (281) 968-4668.' 
        });
    }
});

// Contact form endpoint
app.post('/api/contact', contactValidation, async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: errors.array() 
            });
        }

        const { location, name, email, phone, notes } = req.body;

        // Sanitize inputs
        const sanitizedData = {
            location: location.trim(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            notes: notes.trim()
        };

        // Get location-specific email
        const recipientEmail = locationEmails[sanitizedData.location] || process.env.EMAIL_TO || 'info@organichousekeepingtx.com';

        // Create email subject
        const subject = `from organic - contact - ${sanitizedData.name}`;

        // Create email HTML content
        const htmlContent = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Location:</strong> ${sanitizedData.location}</p>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
            <p><strong>Message:</strong><br>${sanitizedData.notes.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>This email was sent from the Organic Housekeeping TX website contact form.</small></p>
        `;

        // Send email to location-specific address
        await sendEmail(subject, htmlContent, recipientEmail);

        res.json({ 
            success: true, 
            message: 'Message sent successfully' 
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ 
            error: 'Failed to send message. Please try again later or call us at (281) 968-4668.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        emailConfigured: !!transporter,
        timestamp: new Date().toISOString()
    });
});

// Location profile routes
app.get('/location/:locationId', (req, res) => {
    const locationId = req.params.locationId.toLowerCase();
    const validLocations = ['woodforest', 'spring', 'houston'];
    
    if (validLocations.includes(locationId)) {
        const filePath = path.join(__dirname, 'location-profile.html');
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending location profile:', err);
                res.status(404).send('Location profile page not found');
            }
        });
    } else {
        res.status(404).send('Location not found');
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error. Please try again later.' 
    });
});

// Start server locally (don't start a dedicated server on serverless platforms like Vercel)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Email configuration: ${transporter ? 'Configured' : 'NOT CONFIGURED - Please check your .env file'}`);
    });
}

// Export the app for serverless platforms (Vercel will use this as the handler)
module.exports = app;
