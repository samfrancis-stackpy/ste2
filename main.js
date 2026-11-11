/**
 * STE POWER TECH - Premium Electrical Services Website
 * Main Interactive JavaScript
 * Features:
 *  - Header Scroll State & Sticky Behavior
 *  - Mobile Navigation Drawer Toggle
 *  - Active Section Observer & Smooth Scrolling
 *  - Projects Gallery Category Filtering
 *  - Project Lightbox Preview Modal
 *  - Service Detail Modal & Auto-Enquiry
 *  - Interactive Quote Estimator Modal
 *  - Working Contact Form with Real-time Validation
 *  - WhatsApp Direct Integration (Phone: +91 90420 58090)
 *  - FAQ Accordion
 *  - Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // Service Detailed Information Database
  const serviceDetails = {
    electrical: {
      title: "Electrical Services",
      tag: "Contracting & Installation",
      image: "assets/images/service-electrical.jpg",
      intro: "Comprehensive electrical solutions for modern residential, commercial, and industrial facilities in Tiruchirappalli.",
      offerings: [
        { name: "Electrical wiring and installation", desc: "Complete conduit piping, circuit planning, distribution cabling, and switchgear setup compliant with Indian safety standards." },
        { name: "Electrical troubleshooting", desc: "Diagnostic testing, fault locating, short circuit identification, and precision rectification by experienced electricians." },
        { name: "Lighting installation", desc: "Energy-efficient LED downlighting, architectural facade lighting, emergency exit illumination, and high-bay fixtures." },
        { name: "Power distribution and electrical maintenance", desc: "Main switchboards, busbars, sub-panels, phase balancing, and systematic load distribution maintenance." },
        { name: "Electrical repairs and upgrades", desc: "Switchgear modernization, circuit breaker replacements, grounding/earthing enhancement, and rewire upgrades." }
      ]
    },
    manpower: {
      title: "Manpower Services",
      tag: "Technical Workforce",
      image: "assets/images/service-manpower.jpg",
      intro: "Supplying vetted, highly trained, and safety-compliant electrical technicians for short-term and long-term requirements.",
      offerings: [
        { name: "Skilled electrical technicians", desc: "Experienced electricians capable of handling complex industrial wiring, control panels, and diagnostic meters." },
        { name: "Electrician manpower supply", desc: "Flexible staffing models for contractors, construction firms, commercial facilities, and industrial complexes in Trichy." },
        { name: "Technical workforce deployment", desc: "Rapid deployment of technicians with complete toolkits and protective equipment for immediate on-site mobilization." },
        { name: "Electrical project support", desc: "Dedicated crew support for new installations, facility commissioning, factory shutdowns, and expansion projects." },
        { name: "On-site maintenance assistance", desc: "Stationed technicians providing continuous facility coverage, shift maintenance, and routine inspections." }
      ]
    },
    company: {
      title: "Company Maintenance",
      tag: "Commercial & Industrial AMC",
      image: "assets/images/service-company.jpg",
      intro: "Structured electrical maintenance contracts ensuring zero operational downtime for corporate offices, factories, and commercial buildings.",
      offerings: [
        { name: "Industrial electrical maintenance", desc: "Heavy machinery supply feeds, motor control centers (MCC), transformers, and power factor correction capacitors." },
        { name: "Commercial building maintenance", desc: "Continuous facility upkeep for IT spaces, corporate offices, shopping complexes, and healthcare facilities." },
        { name: "Preventive maintenance", desc: "Scheduled periodic checks, thermal scanning, terminal tightening, and load monitoring to avert unexpected breakdowns." },
        { name: "Electrical inspection and troubleshooting", desc: "Full-system insulation resistance testing, earth electrode testing, and voltage stability verification." },
        { name: "Regular maintenance support", desc: "Dedicated maintenance schedules, emergency call-out readiness, and transparent maintenance logs for facility managers." }
      ]
    },
    apartment: {
      title: "Apartment Maintenance",
      tag: "Residential Communities",
      image: "assets/images/service-apartment.jpg",
      intro: "Dedicated electrical care for gated communities, multi-storey residential complexes, and apartment welfare associations across Trichy.",
      offerings: [
        { name: "Residential electrical maintenance", desc: "Regular testing and upkeep of shared residential electrical systems, water pumps, and lift supply panels." },
        { name: "Common-area lighting maintenance", desc: "Stairwell lighting, perimeter solar/LED fixtures, parking bay lights, landscape illumination, and timers." },
        { name: "Electrical panel inspection", desc: "Main meter panels, changeover switches, surge protection devices, and distribution boards inspected for loose connections." },
        { name: "Wiring and repair services", desc: "Prompt resolution of common faults, tripped breakers, burnt neutral terminals, and damaged cables in community areas." },
        { name: "Building electrical maintenance", desc: "Comprehensive scheduled check-ups covering lightning arrestors, earthing pits, and generator changeover panels." }
      ]
    }
  };

  // 1. Sticky Header & Scroll Effects
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -40% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // 4. Projects Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 5. Project Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img').src;
      const title = card.querySelector('.project-title').textContent;
      const desc = card.querySelector('.project-desc').textContent;

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        openModal(lightboxModal);
      }
    });
  });

  // 6. Service Detail Modal
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalTitle = document.getElementById('serviceModalTitle');
  const serviceModalTag = document.getElementById('serviceModalTag');
  const serviceModalImg = document.getElementById('serviceModalImg');
  const serviceModalIntro = document.getElementById('serviceModalIntro');
  const serviceModalOfferings = document.getElementById('serviceModalOfferings');
  const serviceModalEnquireBtn = document.getElementById('serviceModalEnquireBtn');

  const exploreButtons = document.querySelectorAll('[data-service-key]');
  exploreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-service-key');
      const data = serviceDetails[key];
      if (!data) return;

      serviceModalTitle.textContent = data.title;
      serviceModalTag.textContent = data.tag;
      serviceModalImg.src = data.image;
      serviceModalIntro.textContent = data.intro;

      serviceModalOfferings.innerHTML = data.offerings.map(item => `
        <div style="display:flex; gap:12px; margin-bottom:14px; align-items:flex-start;">
          <div style="width:22px; height:22px; border-radius:50%; background:#E8F2FA; color:#1769AA; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:12px; margin-top:2px;">✓</div>
          <div>
            <strong style="color:#101B32; font-size:0.95rem; display:block; margin-bottom:2px;">${item.name}</strong>
            <span style="font-size:0.85rem; color:#475569; line-height:1.45; display:block;">${item.desc}</span>
          </div>
        </div>
      `).join('');

      // Pre-fill enquiry link
      serviceModalEnquireBtn.onclick = () => {
        closeModal(serviceModal);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const serviceSelect = document.getElementById('contactService');
          if (serviceSelect) {
            serviceSelect.value = data.title;
          }
        }
      };

      openModal(serviceModal);
    });
  });

  // 7. Quote Estimator Modal
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteButtons = document.querySelectorAll('.open-quote-modal');
  openQuoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModal);
    });
  });

  // 8. General Modal Close Handling
  const closeButtons = document.querySelectorAll('.modal-close-btn, .modal-overlay-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 9. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });

  // 10. Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(contactForm, 'email');
    });

    const whatsappBtn = document.getElementById('contactWhatsAppBtn');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleFormSubmit(contactForm, 'whatsapp');
      });
    }
  }

  // 11. Quote Modal Form Submission
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleQuoteSubmit(quoteForm, 'whatsapp');
    });

    const quoteEmailBtn = document.getElementById('quoteEmailBtn');
    if (quoteEmailBtn) {
      quoteEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleQuoteSubmit(quoteForm, 'email');
      });
    }
  }

  function validateInput(inputEl, condition, errorMsg) {
    const formGroup = inputEl.closest('.form-group');
    let errorSpan = formGroup.querySelector('.form-error-msg');
    
    if (!condition) {
      inputEl.classList.add('error');
      formGroup.classList.add('has-error');
      if (errorSpan) errorSpan.textContent = errorMsg;
      return false;
    } else {
      inputEl.classList.remove('error');
      formGroup.classList.remove('has-error');
      return true;
    }
  }

  function handleFormSubmit(form, mode) {
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');
    const serviceInput = form.querySelector('[name="service"]');
    const messageInput = form.querySelector('[name="message"]');

    let isValid = true;

    // Validate Name
    if (!validateInput(nameInput, nameInput.value.trim().length >= 2, "Please enter your full name.")) {
      isValid = false;
    }

    // Validate Phone (Indian mobile numbers: 10 digits, starts with 6-9)
    const phonePattern = /^[6-9]\d{9}$/;
    const cleanPhone = phoneInput.value.replace(/[\s\-\+]/g, '').slice(-10);
    if (!validateInput(phoneInput, phonePattern.test(cleanPhone), "Please enter a valid 10-digit mobile number.")) {
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validateInput(emailInput, emailPattern.test(emailInput.value.trim()), "Please enter a valid email address.")) {
      isValid = false;
    }

    // Validate Service
    if (!validateInput(serviceInput, serviceInput.value !== "", "Please select a service.")) {
      isValid = false;
    }

    // Validate Message
    if (!validateInput(messageInput, messageInput.value.trim().length >= 5, "Please provide brief details of your requirement.")) {
      isValid = false;
    }

    if (!isValid) return;

    const payload = {
      name: nameInput.value.trim(),
      phone: cleanPhone,
      email: emailInput.value.trim(),
      service: serviceInput.value,
      message: messageInput.value.trim()
    };

    if (mode === 'whatsapp') {
      const waText = encodeURIComponent(
        `*New Enquiry - STE POWER TECH*\n\n` +
        `👤 *Name:* ${payload.name}\n` +
        `📱 *Phone:* +91 ${payload.phone}\n` +
        `✉️ *Email:* ${payload.email}\n` +
        `⚡ *Service Required:* ${payload.service}\n` +
        `📝 *Message:* ${payload.message}\n\n` +
        `Sent via STE POWER TECH Official Website.`
      );
      window.open(`https://wa.me/919042058090?text=${waText}`, '_blank');
      showToast("Opening WhatsApp with your enquiry details!");
    } else {
      const mailSubject = encodeURIComponent(`Service Enquiry: ${payload.service} - ${payload.name}`);
      const mailBody = encodeURIComponent(
        `Hello Mr. Stephen A. (STE POWER TECH),\n\n` +
        `I would like to inquire about your electrical services:\n\n` +
        `Name: ${payload.name}\n` +
        `Phone: +91 ${payload.phone}\n` +
        `Email: ${payload.email}\n` +
        `Service Required: ${payload.service}\n\n` +
        `Requirement Details:\n${payload.message}\n\n` +
        `Location: Tiruchirappalli, Tamil Nadu`
      );
      window.location.href = `mailto:stepowertech@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      showToast("Thank you! Your email client has been prepared with your enquiry.");
    }

    form.reset();
  }

  function handleQuoteSubmit(form, mode) {
    const name = form.querySelector('[name="quote_name"]').value.trim();
    const phone = form.querySelector('[name="quote_phone"]').value.replace(/[\s\-\+]/g, '').slice(-10);
    const property = form.querySelector('[name="quote_property"]').value;
    const service = form.querySelector('[name="quote_service"]').value;
    const notes = form.querySelector('[name="quote_notes"]').value.trim();

    if (!name || phone.length !== 10) {
      alert("Please enter your name and a valid 10-digit mobile number.");
      return;
    }

    if (mode === 'whatsapp') {
      const waText = encodeURIComponent(
        `*Quick Quote Request - STE POWER TECH*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📱 *Phone:* +91 ${phone}\n` +
        `🏢 *Property Type:* ${property}\n` +
        `⚡ *Service Required:* ${service}\n` +
        `📝 *Requirement:* ${notes || 'Standard evaluation requested'}\n\n` +
        `Please provide a prompt quote.`
      );
      window.open(`https://wa.me/919042058090?text=${waText}`, '_blank');
      closeModal(quoteModal);
      showToast("Quote request redirected to WhatsApp!");
    } else {
      const mailSubject = encodeURIComponent(`Quote Request: ${service} for ${property}`);
      const mailBody = encodeURIComponent(
        `Hello STE POWER TECH,\n\n` +
        `I am requesting a quote for:\n` +
        `Name: ${name}\n` +
        `Phone: +91 ${phone}\n` +
        `Property Type: ${property}\n` +
        `Service: ${service}\n\n` +
        `Notes:\n${notes || 'Standard estimation needed'}`
      );
      window.location.href = `mailto:stepowertech@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      closeModal(quoteModal);
      showToast("Quote details prepared in your email app!");
    }

    form.reset();
  }

  // 12. Toast Notification Function
  function showToast(message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      toast.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="toast-text" style="font-weight:600; font-size:0.925rem;"></span>
      `;
      document.body.appendChild(toast);
    }
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 13. Back to Top Smooth Scroll
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 14. Interactive Estimator Tool
  const estServiceType = document.getElementById('estServiceType');
  const estScale = document.getElementById('estScale');
  const estFrequency = document.getElementById('estFrequency');
  const estPackageTitle = document.getElementById('estPackageTitle');
  const estPackageDesc = document.getElementById('estPackageDesc');
  const estSchedule = document.getElementById('estSchedule');
  const estTechs = document.getElementById('estTechs');
  const estResponse = document.getElementById('estResponse');
  const estNext = document.getElementById('estNext');
  const estWhatsAppBtn = document.getElementById('estWhatsAppBtn');

  if (estServiceType && estScale && estFrequency) {
    const plans = {
      apartment: {
        title: "Apartment Electrical AMC",
        desc: "Comprehensive routine care of main meter panels, common-area lighting, pump starters, and prompt fault repairs in Ponmalaipatti & across Trichy.",
        schedule: { small: "Bi-Weekly Inspection", medium: "Weekly Inspection", large: "Dedicated Shift Care" },
        techs: { small: "1 Certified Electrician", medium: "2 Skilled Electricians", large: "Multi-Technician Team" },
        response: "Emergency Priority (Trichy)",
        next: "Free Site Inspection"
      },
      company: {
        title: "Company & Industrial AMC",
        desc: "Structured electrical maintenance for industrial workshops, IT buildings, and commercial facilities ensuring zero production downtime.",
        schedule: { small: "Monthly Routine AMC", medium: "Bi-Weekly Systematic AMC", large: "Continuous Shift Support" },
        techs: { small: "1 Industrial Electrician", medium: "2–3 Technical Specialists", large: "Dedicated Electrical Crew" },
        response: "Immediate Priority Support",
        next: "Technical Audit & Proposal"
      },
      manpower: {
        title: "Electrician Manpower Deployment",
        desc: "Supply of vetted, trained electrical technicians with tools and safety PPE for project contracting or operational support.",
        schedule: { small: "Short-Term / Project Basis", medium: "Weekly / Monthly Deployment", large: "Long-Term Facility Deployment" },
        techs: { small: "1–2 Technicians", medium: "3–6 Technicians", large: "Full Workforce Crew" },
        response: "Rapid On-Site Mobilization",
        next: "Workforce Allocation"
      },
      electrical: {
        title: "Electrical Contracting & Installation",
        desc: "Precision wiring, lighting system installation, power distribution setup, and code-adherent electrical repairs.",
        schedule: { small: "1–3 Day Turnaround", medium: "Scheduled Project Timeline", large: "Phased Electrical Contracting" },
        techs: { small: "1–2 Electricians", medium: "2–4 Installation Experts", large: "Full Contracting Team" },
        response: "Prompt Consultation",
        next: "Estimate & Site Survey"
      }
    };

    function updateEstimator() {
      const s = estServiceType.value;
      const sc = estScale.value;
      const data = plans[s] || plans.apartment;

      if (estPackageTitle) estPackageTitle.textContent = data.title;
      if (estPackageDesc) estPackageDesc.textContent = data.desc;
      if (estSchedule) estSchedule.textContent = data.schedule[sc] || "Scheduled Routine";
      if (estTechs) estTechs.textContent = data.techs[sc] || "Skilled Technicians";
      if (estResponse) estResponse.textContent = data.response;
      if (estNext) estNext.textContent = data.next;
    }

    [estServiceType, estScale, estFrequency].forEach(el => {
      el.addEventListener('change', updateEstimator);
    });

    if (estWhatsAppBtn) {
      estWhatsAppBtn.addEventListener('click', () => {
        const s = estServiceType.options[estServiceType.selectedIndex].text;
        const sc = estScale.options[estScale.selectedIndex].text;
        const f = estFrequency.options[estFrequency.selectedIndex].text;

        const text = encodeURIComponent(
          `*Service & Maintenance Estimate Request*\n\n` +
          `🏢 *Service:* ${s}\n` +
          `📐 *Scale:* ${sc}\n` +
          `⏱️ *Model:* ${f}\n` +
          `📍 *Location:* Trichy, Tamil Nadu\n\n` +
          `Hello STE POWER TECH (Mr. Stephen A.), please provide a detailed quote and schedule a site inspection for this requirement.`
        );
        window.open(`https://wa.me/919042058090?text=${text}`, '_blank');
        showToast("Opening WhatsApp with your configured estimate!");
      });
    }

    updateEstimator();
  }

  // 15. Why Choose Us - Carousel Slider Logic
  const whyViewport = document.getElementById('whyCarouselViewport');
  const whyTrack = document.getElementById('whyCarouselTrack');
  const whyPrevBtn = document.getElementById('whyPrevBtn');
  const whyNextBtn = document.getElementById('whyNextBtn');
  const whyDots = document.querySelectorAll('.why-dot');
  const whySlides = document.querySelectorAll('.why-slide');

  if (whyViewport && whyTrack && whySlides.length > 0) {
    let currentSlide = 0;
    let autoSlideInterval = null;

    function getVisibleCards() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, whySlides.length - getVisibleCards());
    }

    function updateCarousel(instant = false) {
      const maxIndex = getMaxIndex();
      if (currentSlide > maxIndex) {
        currentSlide = maxIndex;
      }
      if (currentSlide < 0) {
        currentSlide = 0;
      }

      // Compute slide step offset dynamically
      const slideWidth = whySlides[0].getBoundingClientRect().width;
      const trackGap = parseFloat(window.getComputedStyle(whyTrack).gap) || 24;
      const step = slideWidth + trackGap;
      const offset = currentSlide * step;

      whyTrack.style.transition = instant ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      whyTrack.style.transform = `translateX(-${offset}px)`;

      // Update dots
      whyDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });

      // Update button state visually
      if (whyPrevBtn) {
        whyPrevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
      }
      if (whyNextBtn) {
        whyNextBtn.style.opacity = currentSlide >= maxIndex ? '0.5' : '1';
      }
    }

    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentSlide < maxIndex) {
        currentSlide++;
      } else {
        currentSlide = 0; // loop back to first
      }
      updateCarousel();
    }

    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = maxIndex; // loop to last
      }
      updateCarousel();
    }

    if (whyNextBtn) {
      whyNextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (whyPrevBtn) {
      whyPrevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    whyDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        currentSlide = Math.min(idx, maxIndex);
        updateCarousel();
        resetAutoSlide();
      });
    });

    // Touch / Swipe support for mobile & tablet
    let touchStartX = 0;
    let touchEndX = 0;

    whyViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseAutoSlide();
    }, { passive: true });

    whyViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoSlide();
    }, { passive: true });

    // Auto Play with hover pause
    function startAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function pauseAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    function resetAutoSlide() {
      pauseAutoSlide();
      startAutoSlide();
    }

    whyViewport.addEventListener('mouseenter', pauseAutoSlide);
    whyViewport.addEventListener('mouseleave', startAutoSlide);

    window.addEventListener('resize', () => {
      updateCarousel(true);
    });

    // Initialize
    updateCarousel(true);
    startAutoSlide();
  }
});

