# Setup Guide - Email Configuration

## Required Credentials

To enable email functionality, you need to configure SMTP (Simple Mail Transfer Protocol) settings in your `.env` file.

## Step-by-Step Setup

### 1. Create .env File

Copy the example file:
```bash
copy env.example .env
```
(On Mac/Linux: `cp env.example .env`)

### 2. Choose Your Email Provider

#### Option A: Gmail (Recommended for Testing)

**Steps:**
1. Go to your Google Account: https://myaccount.google.com/
2. Enable **2-Step Verification** (required for App Passwords)
3. Go to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new App Password:
   - Select "Mail" as the app
   - Select "Other (Custom name)" as device
   - Enter "Organic Housekeeping Website"
   - Click "Generate"
   - Copy the 16-character password (no spaces)

**Your .env file should look like:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM=your-email@gmail.com
EMAIL_TO=info@organichousekeepingtx.com
PORT=3000
```

#### Option B: Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM=your-email@outlook.com
EMAIL_TO=info@organichousekeepingtx.com
PORT=3000
```

#### Option C: Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@yahoo.com
EMAIL_TO=info@organichousekeepingtx.com
PORT=3000
```

#### Option D: Custom Email Provider (cPanel, Hosting Provider, etc.)

Contact your email hosting provider for SMTP settings. Common settings:
- **SMTP Host**: Usually `mail.yourdomain.com` or `smtp.yourdomain.com`
- **SMTP Port**: Usually `587` (TLS) or `465` (SSL)
- **SMTP Secure**: `false` for port 587, `true` for port 465
- **Username**: Your full email address
- **Password**: Your email account password

### 3. Verify Configuration

1. Start the server: `npm start`
2. Visit: `http://localhost:3000/api/health`
3. Check the response - it should show `emailConfigured: true`

### 4. Test the Forms

1. Go to `http://localhost:3000`
2. Scroll to the forms section
3. Fill out the "Request a Quote" form
4. Submit and check your email inbox at `info@organichousekeepingtx.com`
5. You should receive an email with the form submission

## Troubleshooting

### "Email transporter not initialized"
- Check that your `.env` file exists in the root directory
- Verify all SMTP variables are set correctly
- Check for typos in variable names

### "Authentication failed"
- For Gmail: Make sure you're using an App Password, not your regular password
- Verify 2-Step Verification is enabled on your Google account
- Check that SMTP_USER matches the email associated with the App Password

### "Connection timeout"
- Check your internet connection
- Verify SMTP_HOST and SMTP_PORT are correct
- Some networks block SMTP ports - try a different network or use port 465 with SMTP_SECURE=true

### Emails going to spam
- This is normal for automated emails
- Check spam/junk folder
- Consider using a professional email service (SendGrid, Mailgun) for production

## Production Recommendations

For a production website, consider using a professional email service:

1. **SendGrid** (Free tier: 100 emails/day)
   - More reliable delivery
   - Better analytics
   - Professional appearance

2. **Mailgun** (Free tier: 5,000 emails/month)
   - Great for transactional emails
   - Easy API integration

3. **Amazon SES** (Very affordable)
   - Pay per email sent
   - Highly scalable

## Security Notes

- **NEVER commit your `.env` file to Git** (it's already in `.gitignore`)
- Keep your App Passwords secure
- Rotate passwords periodically
- Use environment variables on your hosting platform instead of hardcoding

## Need Help?

If you're having trouble:
1. Check server logs for specific error messages
2. Verify your email provider's SMTP settings
3. Test with a different email provider
4. Check firewall/network restrictions
