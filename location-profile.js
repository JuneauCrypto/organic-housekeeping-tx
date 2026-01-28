// Location Profile Page Script
// Loads location data and populates the profile page

const locations = {
    'woodforest': {
        id: 'woodforest',
        name: 'Woodforest and The Woodlands',
        displayName: 'Woodforest and The Woodlands',
        address: {
            street: '126 Kinnerly Peak Pl',
            city: 'Montgomery',
            state: 'TX',
            zip: '77316'
        },
        serviceAreas: [
            'Montgomery',
            'The Woodlands',
            'Parts of Conroe',
            'Magnolia'
        ],
        contact: {
            phone: '(936) 449-0889',
            phoneLink: '9364490889',
            email: 'info@cleancleaningtx.com',
            website: {
                url: 'https://www.cleancleaningtx.com/',
                name: 'Clean Cleaning'
            }
        },
        description: 'Serving the beautiful communities of Woodforest, The Woodlands, and surrounding areas with premium organic cleaning services. Our team is dedicated to providing eco-friendly, non-toxic cleaning solutions for your home.',
        blurb: 'Professional organic housekeeping services for Woodforest, The Woodlands, Montgomery, and surrounding communities. Trusted by families who value clean, healthy living spaces.',
        emailRecipient: 'info@cleancleaningtx.com'
    },
    'spring': {
        id: 'spring',
        name: 'North Houston and Surrounding Areas',
        displayName: 'North Houston and Surrounding Areas',
        address: {
            street: '15710 Pebble Bend',
            city: 'Houston',
            state: 'TX',
            zip: '77068'
        },
        serviceAreas: [
            'Spring area to downtown',
            'Humble',
            'Tomball',
            'Cypress',
            'Cy-Creek'
        ],
        zipCodes: [
            '77066', '77067', '77068', '77069', '77070', '77084', '77090', '77092', '77095', '77373', '77375', '77377', '77379', '77388', '77389', '77429', '77433', '77449', '77494'
        ],
        contact: {
            phone: '(281) 968-4668',
            phoneLink: '2819684668',
            email: 'info@organichousekeepingtx.com',
            website: null
        },
        description: 'Comprehensive organic cleaning services covering North Houston and surrounding communities. From Spring to downtown, we bring professional, eco-friendly cleaning to your doorstep.',
        blurb: 'Serving North Houston, Spring, Tomball, Cypress, and surrounding areas with reliable organic housekeeping services. Your trusted partner for a clean, healthy home.',
        emailRecipient: 'info@organichousekeepingtx.com'
    },
    'houston': {
        id: 'houston',
        name: 'Houston',
        displayName: 'Houston',
        address: {
            street: '819 W 22nd Street, Suite B',
            city: 'Houston',
            state: 'TX',
            zip: '77008'
        },
        serviceAreas: [
            'Heights',
            'Memorial',
            'Galleria',
            'Montrose',
            'River Oaks',
            'Midtown',
            'Downtown',
            'West Village',
            'Timbergrove',
            'Energy Corridor',
            'East Downtown',
            'Oak Forest',
            'Garden Oaks'
        ],
        zipCodes: [
            '77002', '77003', '77004', '77005', '77006', '77007', '77008', '77009', '77019', '77024', '77027', '77030', '77055', '77056', '77057', '77063', '77079', '77080', '77098'
        ],
        contact: {
            phone: '(281) 402-6688',
            phoneLink: '2814026688',
            email: 'info@houstongreenmaid.com',
            website: {
                url: 'https://houstongreenmaid.com',
                name: 'houstongreenmaid.com'
            }
        },
        description: 'Premium organic cleaning services throughout Houston\'s most vibrant neighborhoods. From the Heights to River Oaks, we deliver exceptional housekeeping with eco-friendly products.',
        blurb: 'Houston\'s premier organic housekeeping service. Serving Heights, Memorial, Galleria, Montrose, River Oaks, and more with professional, non-toxic cleaning solutions.',
        emailRecipient: 'info@houstongreenmaid.com'
    }
};

// Get location ID from URL
function getLocationFromURL() {
    const path = window.location.pathname;
    const match = path.match(/\/location\/([^\/]+)/);
    return match ? match[1].toLowerCase() : null;
}

// Populate profile page with location data
function loadLocationProfile() {
    const locationId = getLocationFromURL();
    
    if (!locationId) {
        console.error('No location ID found in URL');
        window.location.href = '/';
        return;
    }
    
    if (!locations[locationId]) {
        console.error('Location not found:', locationId);
        console.log('Available locations:', Object.keys(locations));
        window.location.href = '/';
        return;
    }

    const location = locations[locationId];
    console.log('Loading location:', locationId, location);

    // Update page title
    document.getElementById('page-title').textContent = `${location.displayName} - Organic Housekeeping TX`;

    // Populate header
    document.getElementById('location-name').textContent = location.displayName;
    document.getElementById('location-blurb').textContent = location.blurb;

    // Populate description
    document.getElementById('location-description').textContent = location.description;

    // Populate service areas
    const serviceAreasList = document.getElementById('service-areas-list');
    serviceAreasList.innerHTML = '';
    location.serviceAreas.forEach(area => {
        const li = document.createElement('li');
        li.textContent = area;
        serviceAreasList.appendChild(li);
    });

    // Populate zip codes
    if (location.zipCodes && location.zipCodes.length > 0) {
        const zipCodesList = document.getElementById('zip-codes-list');
        if (zipCodesList) {
            zipCodesList.innerHTML = '';
            location.zipCodes.forEach(zip => {
                const span = document.createElement('span');
                span.className = 'zip-code-item';
                span.textContent = zip;
                zipCodesList.appendChild(span);
            });
        }
    } else {
        const zipCodesList = document.getElementById('zip-codes-list');
        if (zipCodesList) {
            zipCodesList.innerHTML = '<p style="color: #666;">Zip codes information coming soon.</p>';
        }
    }

    // Populate address
    const address = `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`;
    document.getElementById('location-address').textContent = address;

    // Populate contact info
    document.getElementById('contact-phone-link').textContent = location.contact.phone;
    document.getElementById('contact-phone-link').href = `tel:${location.contact.phoneLink}`;
    
    // Add text/SMS link if phone number exists
    if (location.contact.phoneLink) {
        const textSection = document.getElementById('text-section');
        const textLink = document.getElementById('contact-text-link');
        if (textSection && textLink) {
            textSection.style.display = 'block';
            textLink.href = `sms:${location.contact.phoneLink}`;
        }
    }
    
    const emailLink = document.getElementById('contact-email-link');
    emailLink.textContent = location.contact.email;
    emailLink.href = `mailto:${location.contact.email}`;
    
    // Add email copy functionality
    emailLink.addEventListener('click', async function(e) {
        e.preventDefault();
        const email = location.contact.email;
        
        try {
            await navigator.clipboard.writeText(email);
            
            // Show temporary message
            const originalText = this.textContent;
            this.textContent = 'Email copied!';
            this.style.color = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
            // Fallback: open mailto link if clipboard fails
            window.location.href = `mailto:${email}`;
        }
    });

    // Populate website if available
    if (location.contact.website) {
        document.getElementById('website-section').style.display = 'block';
        document.getElementById('contact-website-link').textContent = location.contact.website.name;
        document.getElementById('contact-website-link').href = location.contact.website.url;
    }

    // Set up form buttons
    document.getElementById('profile-quote-btn').addEventListener('click', function() {
        showForm('quote', location.displayName);
    });

    document.getElementById('profile-contact-btn').addEventListener('click', function() {
        showForm('contact', location.displayName);
    });
}

// Show form with location pre-filled
function showForm(formType, locationName) {
    const formsContainer = document.getElementById('forms-container');
    const quoteFormWrapper = document.getElementById('quote-form-wrapper');
    const contactFormWrapper = document.getElementById('contact-form-wrapper');

    // Hide both forms first
    quoteFormWrapper.style.display = 'none';
    contactFormWrapper.style.display = 'none';

    // Show forms container
    formsContainer.style.display = 'block';

    // Show the selected form
    if (formType === 'quote') {
        document.getElementById('quote-location').value = locationName;
        document.getElementById('quote-location-name').textContent = locationName;
        quoteFormWrapper.style.display = 'block';
    } else if (formType === 'contact') {
        document.getElementById('contact-location').value = locationName;
        document.getElementById('contact-location-name').textContent = locationName;
        contactFormWrapper.style.display = 'block';
    }

    // Scroll to form
    formsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Close forms function (reuse from main script if available)
if (typeof closeForms === 'undefined') {
    window.closeForms = function() {
        const formsContainer = document.getElementById('forms-container');
        const quoteFormWrapper = document.getElementById('quote-form-wrapper');
        const contactFormWrapper = document.getElementById('contact-form-wrapper');
        
        formsContainer.style.display = 'none';
        quoteFormWrapper.style.display = 'none';
        contactFormWrapper.style.display = 'none';
        
        // Reset forms
        const quoteForm = document.getElementById('quote-form');
        const contactForm = document.getElementById('contact-form');
        if (quoteForm) quoteForm.reset();
        if (contactForm) contactForm.reset();
        
        // Clear messages
        const quoteMessage = document.getElementById('quote-message');
        const contactMessage = document.getElementById('contact-message');
        if (quoteMessage) quoteMessage.style.display = 'none';
        if (contactMessage) contactMessage.style.display = 'none';
    };
}

// Load profile when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadLocationProfile();
    });
} else {
    // DOM is already loaded
    loadLocationProfile();
}
