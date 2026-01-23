// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form handling - new location-based structure
    const formsContainer = document.getElementById('forms-container');
    const quoteFormWrapper = document.getElementById('quote-form-wrapper');
    const contactFormWrapper = document.getElementById('contact-form-wrapper');
    const quoteForm = document.getElementById('quote-form');
    const contactForm = document.getElementById('contact-form');
    
    // Location to email mapping
    const locationEmails = {
        'Woodforest and The Woodlands': 'info@cleancleaningtx.com',
        'Spring': 'info@organichousekeepingtx.com',
        'Houston': 'info@organichousekeepingtx.com'
    };
    
    // Toggle form buttons
    document.querySelectorAll('.toggle-form-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            const formType = this.getAttribute('data-form');
            
            // Hide both forms first
            quoteFormWrapper.style.display = 'none';
            contactFormWrapper.style.display = 'none';
            
            // Show forms container
            formsContainer.style.display = 'block';
            
            // Show the selected form
            if (formType === 'quote') {
                document.getElementById('quote-location').value = location;
                document.getElementById('quote-location-name').textContent = location;
                quoteFormWrapper.style.display = 'block';
                // Scroll to form
                formsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (formType === 'contact') {
                document.getElementById('contact-location').value = location;
                document.getElementById('contact-location-name').textContent = location;
                contactFormWrapper.style.display = 'block';
                // Scroll to form
                formsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Close forms function
    window.closeForms = function() {
        formsContainer.style.display = 'none';
        quoteFormWrapper.style.display = 'none';
        contactFormWrapper.style.display = 'none';
        // Reset forms
        if (quoteForm) quoteForm.reset();
        if (contactForm) contactForm.reset();
        // Clear messages
        document.getElementById('quote-message').style.display = 'none';
        document.getElementById('contact-message').style.display = 'none';
    };

    // Validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\d\s\(\)\-\.]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#cf2e2e';
        }
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#ddd';
        }
    }

    function showMessage(formId, message, isError = false) {
        const messageElement = document.getElementById(formId + '-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = 'form-message ' + (isError ? 'error' : 'success');
            messageElement.style.display = 'block';
            
            // Scroll to message
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function validateQuoteForm(formData) {
        let isValid = true;

        // Address validation
        if (!formData.address || formData.address.trim() === '') {
            showError('quote-address', 'Address is required');
            isValid = false;
        } else {
            clearError('quote-address');
        }

        // Email validation
        if (!formData.email || formData.email.trim() === '') {
            showError('quote-email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            showError('quote-email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('quote-email');
        }

        // Phone validation
        if (!formData.phone || formData.phone.trim() === '') {
            showError('quote-phone', 'Phone is required');
            isValid = false;
        } else if (!validatePhone(formData.phone)) {
            showError('quote-phone', 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError('quote-phone');
        }

        // Service type validation
        if (!formData.serviceType || formData.serviceType === '') {
            showError('quote-service', 'Please select a service type');
            isValid = false;
        } else {
            clearError('quote-service');
        }

        return isValid;
    }

    function validateContactForm(formData) {
        let isValid = true;

        // Name validation
        if (!formData.name || formData.name.trim() === '') {
            showError('contact-name', 'Name is required');
            isValid = false;
        } else {
            clearError('contact-name');
        }

        // Email validation
        if (!formData.email || formData.email.trim() === '') {
            showError('contact-email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            showError('contact-email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('contact-email');
        }

        // Phone validation
        if (!formData.phone || formData.phone.trim() === '') {
            showError('contact-phone', 'Phone is required');
            isValid = false;
        } else if (!validatePhone(formData.phone)) {
            showError('contact-phone', 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError('contact-phone');
        }

        // Notes validation
        if (!formData.notes || formData.notes.trim() === '') {
            showError('contact-notes', 'Notes are required');
            isValid = false;
        } else {
            clearError('contact-notes');
        }

        return isValid;
    }

    // Quote form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                location: document.getElementById('quote-location').value,
                address: document.getElementById('quote-address').value.trim(),
                email: document.getElementById('quote-email').value.trim(),
                phone: document.getElementById('quote-phone').value.trim(),
                serviceType: document.getElementById('quote-service').value,
                notes: document.getElementById('quote-notes').value.trim()
            };

            // Validate form
            if (!validateQuoteForm(formData)) {
                showMessage('quote', 'Please correct the errors above', true);
                return;
            }

            // Disable submit button
            const submitButton = quoteForm.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch('/api/quote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('quote', 'Thank you! Your quote request has been sent successfully.');
                    // Clear all errors
                    ['quote-address', 'quote-email', 'quote-phone', 'quote-service'].forEach(id => clearError(id));
                    // Reset form after 2 seconds and close
                    setTimeout(() => {
                        quoteForm.reset();
                        closeForms();
                    }, 2000);
                } else {
                    showMessage('quote', data.error || 'An error occurred. Please try again.', true);
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('quote', 'Network error. Please check your connection and try again.', true);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Quote Request';
            }
        });
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                location: document.getElementById('contact-location').value,
                name: document.getElementById('contact-name').value.trim(),
                email: document.getElementById('contact-email').value.trim(),
                phone: document.getElementById('contact-phone').value.trim(),
                notes: document.getElementById('contact-notes').value.trim()
            };

            // Validate form
            if (!validateContactForm(formData)) {
                showMessage('contact', 'Please correct the errors above', true);
                return;
            }

            // Disable submit button
            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('contact', 'Thank you! Your message has been sent successfully.');
                    // Clear all errors
                    ['contact-name', 'contact-email', 'contact-phone', 'contact-notes'].forEach(id => clearError(id));
                    // Reset form after 2 seconds and close
                    setTimeout(() => {
                        contactForm.reset();
                        closeForms();
                    }, 2000);
                } else {
                    showMessage('contact', data.error || 'An error occurred. Please try again.', true);
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('contact', 'Network error. Please check your connection and try again.', true);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }

    // Real-time validation
    const quoteFields = ['quote-address', 'quote-email', 'quote-phone', 'quote-service'];
    quoteFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                const formData = {
                    location: document.getElementById('quote-location').value,
                    address: document.getElementById('quote-address').value.trim(),
                    email: document.getElementById('quote-email').value.trim(),
                    phone: document.getElementById('quote-phone').value.trim(),
                    serviceType: document.getElementById('quote-service').value
                };
                validateQuoteForm(formData);
            });
        }
    });

    const contactFields = ['contact-name', 'contact-email', 'contact-phone', 'contact-notes'];
    contactFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                const formData = {
                    location: document.getElementById('contact-location').value,
                    name: document.getElementById('contact-name').value.trim(),
                    email: document.getElementById('contact-email').value.trim(),
                    phone: document.getElementById('contact-phone').value.trim(),
                    notes: document.getElementById('contact-notes').value.trim()
                };
                validateContactForm(formData);
            });
        }
    });
});
