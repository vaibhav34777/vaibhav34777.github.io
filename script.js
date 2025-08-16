// js/script.js

document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Animation duration in ms
        once: true, // Whether animation should happen only once
        offset: 50, // Offset (in px) from the original trigger point
    });

    // 2. Smooth Scrolling for Navbar Links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Check if it's an internal link
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault(); // Prevent default anchor click behavior
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Calculate position to scroll to, considering the fixed navbar height
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Close mobile navbar collapse after clicking a link
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                         const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                             toggle: false // Prevent re-toggling
                         });
                         bsCollapse.hide();
                    }
                }
            }
        });
    });

     // 3. Activate Nav Link on Scroll (using Bootstrap's ScrollSpy)
     // Bootstrap's ScrollSpy handles this automatically via the `data-bs-spy="scroll"`
     // and `data-bs-target="#mainNavbar"` attributes in the <body> tag.
     // Make sure your nav links `href` match the section `id`s exactly.

    // 4. Update Footer Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 5. Handle Contact Form Submission (Placeholder)
    // Since this is a static site (GitHub Pages), you need a service like Formspree
    // or Netlify Forms to actually handle email sending.
    // This code just prevents the default submit and logs a message.
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            console.log('Form submission intercepted. Use a service like Formspree for actual email sending.');
            // You would typically add an AJAX call here to send data to Formspree
            alert('Thank you for your message! (Form submission needs backend setup)');
            // Optionally clear the form
            // contactForm.reset();
        });
    }


    // Animate skill bars when in view
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--progress');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillProgressBars.forEach(bar => {
        bar.style.width = '0';
        skillObserver.observe(bar);
    });

});