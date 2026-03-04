// ==========================================
// GRUPO IR - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------
  // 1. Scroll Reveal Animations
  // ------------------------------------------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-card').forEach(el => {
    revealObserver.observe(el);
  });

  // Staggered card animations
  document.querySelectorAll('.reveal-card').forEach((card, index) => {
    const parent = card.parentElement;
    const siblings = Array.from(parent.querySelectorAll('.reveal-card'));
    const localIndex = siblings.indexOf(card);
    card.style.transitionDelay = `${localIndex * 100}ms`;
  });

  // ------------------------------------------
  // 2. Hero Entrance Animation
  // ------------------------------------------
  const heroElements = document.querySelectorAll('.reveal-hero');
  heroElements.forEach(el => {
    const delay = parseInt(el.dataset.delay || '0');
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + delay);
  });

  // Stats are shown via the reveal-hero animation (no counter needed)

  // ------------------------------------------
  // 4. Header Scroll Effect
  // ------------------------------------------
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }, { passive: true });

  // ------------------------------------------
  // 5. Active Nav Link on Scroll
  // ------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-72px 0px -50% 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // ------------------------------------------
  // 6. Mobile Menu
  // ------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    
    // Bloquear scroll del body cuando el menú está abierto
    if (mobileMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    });
  });

  // ------------------------------------------
  // 7. Form Validation & Submit con EmailJS
  // ------------------------------------------
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  // Inicializar EmailJS
  (function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Necesitarás reemplazar esto con tu Public Key de EmailJS
  })();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

      let hasError = false;

      // Validate nombre
      const nombre = form.querySelector('#nombre');
      if (!nombre.value.trim()) {
        nombre.closest('.form-group').classList.add('error');
        hasError = true;
      }

      // Validate email
      const email = form.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.closest('.form-group').classList.add('error');
        hasError = true;
      }

      if (hasError) return;

      // Send form
      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Preparar datos del formulario
      const templateParams = {
        from_name: nombre.value,
        from_email: email.value,
        phone: form.querySelector('#telefono').value,
        company: form.querySelector('#empresa').value,
        message: form.querySelector('#mensaje').value,
        to_email: 'grupoir2026@gmail.com'
      };

      // Enviar email usando EmailJS
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          form.reset();
          formSuccess.classList.add('show');

          setTimeout(() => {
            formSuccess.classList.remove('show');
          }, 5000);
        }, (error) => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          alert('Hubo un error al enviar el mensaje. Por favor intente nuevamente o contáctenos por WhatsApp.');
          console.error('EmailJS error:', error);
        });
    });

    // Clear error on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('error');
      });
    });
  }

  // ------------------------------------------
  // 8. WhatsApp Button
  // ------------------------------------------
  const waBtn = document.getElementById('waBtn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const message = encodeURIComponent('Hola, me gustaría consultar sobre sus servicios de importación.');
      window.open(`https://wa.me/5491158729132?text=${message}`, '_blank');
    });
  }

  // ------------------------------------------
  // 9. Smooth scroll for all anchor links
  // ------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = 72;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});

  // ------------------------------------------
  // Animaciones con Scroll Observer
  // ------------------------------------------
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observar secciones
  const sections = document.querySelectorAll('.identity-section, .presencia-section, .transparencia-section, .cta-section, .footer');
  sections.forEach(section => observer.observe(section));

