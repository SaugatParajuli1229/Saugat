// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'contact') {
        window.location.href = 'contact.html';
    } else if (sectionId === 'projects') {
        window.location.href = 'projects.html';
    }
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    // Character count for textarea
    if (messageField && charCount) {
        messageField.addEventListener('input', function() {
            charCount.textContent = this.value.length;
            if (this.value.length > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = 500;
            }
        });
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
});

// Contact form validation
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('show');
    });

    // Validate name
    if (!name.value.trim()) {
        showError('nameError', 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (!subject.value.trim()) {
        showError('subjectError', 'Subject is required');
        isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// Show form error
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit contact form (via mailto)
function submitContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:saugatparajuli@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
        const successMsg = document.getElementById('successMessage');
        if (successMsg) {
            successMsg.style.display = 'block';
            document.getElementById('contactForm').reset();
            document.getElementById('charCount').textContent = '0';

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }
    }, 500);
}

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active navigation state on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(current) && current) {
            link.classList.add('active');
        }
    });
});

// Page animations on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelectorAll('.service-card, .project-card, .info-card').forEach((el, index) => {
        el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    });
});

// Add fade-in animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);