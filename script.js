document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('navigation-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 3. Scroll Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 4. Set minimum date as today for the date picker
    const dateInput = document.getElementById('form-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // 5. Appointment Form Redirection to WhatsApp
    const form = document.getElementById('appointment-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const date = document.getElementById('form-date').value;
            const time = document.getElementById('form-time').value;
            const message = document.getElementById('form-message').value.trim();
            
            // Format WhatsApp Message
            let waText = `Hola Dra. Ana Patricia Arellano,\n\nMe gustaría agendar una cita en su Clínica Dental. Aquí están mis datos:\n`;
            waText += `*• Nombre:* ${name}\n`;
            waText += `*• Teléfono:* ${phone}\n`;
            waText += `*• Fecha:* ${date}\n`;
            waText += `*• Hora:* ${time}\n`;
            if (message) {
                waText += `*• Motivo:* ${message}\n`;
            }
            
            // Clinic phone number from prompt: 9991402191
            // Country code for Mexico is +52
            const targetNumber = '529991402191';
            
            // Construct the WhatsApp redirect URL
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(waText)}`;
            
            // Open in a new tab/window
            window.open(whatsappUrl, '_blank');
        });
    }
});
