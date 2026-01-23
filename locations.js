// Location Profile Data
// This file contains all location information for easy management and expansion

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
        zipCodes: [
            '77316', '77354', '77356', '77357', '77362', '77365', '77372', '77373', '77375', '77380', '77381', '77382', '77384', '77385', '77386', '77389'
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

module.exports = locations;
