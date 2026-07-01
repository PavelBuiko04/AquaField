(function () {
  'use strict';

  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const contactDropdown = document.getElementById('contactDropdown');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"], .mobile-menu__link[href^="#"]');

  // Sticky header on scroll
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger menu
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      const isOpen = burger.classList.toggle('burger--open');
      mobileMenu.classList.toggle('mobile-menu--open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('burger--open');
        mobileMenu.classList.remove('mobile-menu--open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // Contact dropdown
  if (contactDropdown) {
    const toggle = contactDropdown.querySelector('.dropdown__toggle');

    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = contactDropdown.classList.toggle('dropdown--open');
        toggle.setAttribute('aria-expanded', isOpen);
      });

      document.addEventListener('click', function () {
        contactDropdown.classList.remove('dropdown--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav__link').forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  // Smooth scroll for anchor links
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Image fallback to local SVG placeholders
  const fallbackMap = {
    'hero-drone.jpg': 'assets/images/hero-placeholder.svg',
    'drone-close.jpg': 'assets/images/drone-placeholder.svg',
    'field-rows.jpg': 'assets/images/field-placeholder.svg',
    'irrigation.jpg': 'assets/images/field-placeholder.svg',
    'garden.jpg': 'assets/images/field-placeholder.svg',
    'field-aerial.jpg': 'assets/images/field-placeholder.svg',
    'field-green.jpg': 'assets/images/field-placeholder.svg',
    'farm.jpg': 'assets/images/field-placeholder.svg'
  };

  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function onError() {
      const name = img.src.split('/').pop().split('?')[0];
      const fallback = fallbackMap[name];
      if (fallback && img.src.indexOf(fallback) === -1) {
        img.src = fallback;
      }
      img.removeEventListener('error', onError);
    });
  });
})();
