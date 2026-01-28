# Organic Housekeeping TX - Website

A clean, modern, and responsive website for Organic Housekeeping TX with contact forms and email functionality.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Prominent Phone Number**: All calls directed to (281) 968-4668 with click-to-call functionality
- **Three Locations**: Displays all three service locations with addresses and service areas
- **Contact Forms**: Two forms for quote requests and general contact
- **Email Integration**: Automatic email sending for form submissions
- **Form Validation**: Client-side and server-side validation with error handling
- **SEO Friendly**: Proper meta tags and semantic HTML

## Files

- `index.html` - Main HTML structure with forms
- `styles.css` - All styling and responsive design
- `script.js` - Mobile menu, smooth scrolling, and form handling
- `server.js` - Express backend server for form processing
- `package.json` - Node.js dependencies
- `env.example` - Environment variables template

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

1. Copy the example environment file:
   ```bash
   copy env.example .env
   ```
   (On Mac/Linux: `cp env.example .env`)

2. Edit `.env` and add your email credentials:

   **For Gmail:**
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate an "App Password" at https://myaccount.google.com/apppasswords
   - Use the app password (not your regular password) in `SMTP_PASS`

   **Example .env configuration:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   SMTP_FROM=your-email@gmail.com
   EMAIL_TO=info@organichousekeepingtx.com
   PORT=3000
   ```

   **For Other Email Providers:**
   - **Outlook/Hotmail**: `SMTP_HOST=smtp-mail.outlook.com`, `SMTP_PORT=587`
   - **Yahoo**: `SMTP_HOST=smtp.mail.yahoo.com`, `SMTP_PORT=587`
   - **Custom SMTP**: Use your provider's SMTP settings

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The website will be available at `http://localhost:8000`

## Form Features

### Quote Request Form
- Location selection (required)
- Address (required)
- Email (required, validated)
- Phone (required, validated)
- Service type (required): Move in/move out, One time deep clean, Bi-weekly service, Weekly service, Monthly service, Airbnb, New home builds, Other
- Notes (optional)

### Contact Form
- Location selection (required)
- Name (required)
- Email (required, validated)
- Phone (required, validated)
- Notes (required)

All form submissions are sent to `info@organichousekeepingtx.com` with the location name in the subject line.

## Contact Information

**Main Phone**: (281) 968-4668 (All calls directed here)

### Locations

1. **Woodforest and The Woodlands**
   - 126 Kinnerly Peak Pl, Montgomery, TX 77316
   - Serves: Montgomery, The Woodlands, parts of Conroe and Magnolia

2. **North Houston and Surrounding Areas**
   - 15710 Pebble Bend, Houston, TX 77068
   - Serves: Spring area to downtown, Humble, Tomball, Cypress, Cy-Creek

3. **Houston**
   - 819 W 22nd Street, Suite B, Houston, TX 77008
   - Serves: Heights, Memorial, Galleria, Montrose, River Oaks, Midtown, Downtown, West Village, Timbergrove, Energy Corridor, East Downtown, Oak Forest, Garden Oaks

## Testing

1. Start the server: `npm start`
2. Open `http://localhost:3000` in your browser
3. Test the forms:
   - Fill out the quote request form
   - Fill out the contact form
   - Check that emails are received at `info@organichousekeepingtx.com`
4. Test validation:
   - Try submitting forms with missing fields
   - Try invalid email addresses
   - Try invalid phone numbers

## Health Check

Visit `http://localhost:3000/api/health` to verify:
- Server is running
- Email configuration status

## Deployment

### Option 1: Node.js Hosting (Recommended for Forms)
- **Heroku**: Connect GitHub repo and deploy
- **DigitalOcean**: Use App Platform
- **AWS**: Use Elastic Beanstalk or EC2
- **Vercel**: Supports Node.js backends
- **Railway**: Simple Node.js deployment

### Option 2: Static Hosting (Forms won't work)
If you only need the static site without forms:
- **Netlify**: Drag and drop or Git integration
- **GitHub Pages**: Push to repository
- **Any Web Host**: Upload files via FTP

## Troubleshooting

### Email Not Sending
1. Check `.env` file exists and has correct values
2. Verify SMTP credentials are correct
3. For Gmail, ensure you're using an App Password, not your regular password
4. Check server logs for error messages
5. Test SMTP connection: Visit `/api/health` endpoint

### Forms Not Submitting
1. Ensure server is running (`npm start`)
2. Check browser console for errors
3. Verify API endpoints are accessible
4. Check server logs for errors

## Customization

To customize colors, edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #f26522;  /* Orange buttons */
    --secondary-color: #d85a1e;
    --accent-color: #ff7a3d;
    --green-bg: #8dc73f;       /* Body background */
}
```
