(function () {
  'use strict';

  function init() {
    const header = document.getElementById('header');
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const contactDropdown = document.getElementById('contactDropdown');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"], .mobile-menu__link[href^="#"]');

    function setMobileNavOpen(isOpen) {
      document.body.classList.toggle('nav-open', isOpen);

      if (burger) {
        burger.classList.toggle('burger--open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
      }

      if (mobileNav) {
        mobileNav.classList.toggle('is-open', isOpen);
        mobileNav.setAttribute('aria-hidden', String(!isOpen));
      }
    }

    function closeMobileNav() {
      setMobileNavOpen(false);
    }

    // Burger menu
    if (burger && mobileNav) {
      burger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setMobileNavOpen(!document.body.classList.contains('nav-open'));
      });

      if (backdrop) {
        backdrop.addEventListener('click', closeMobileNav);
      }

      if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(function (link) {
          link.addEventListener('click', closeMobileNav);
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeMobileNav();
        }
      });
    }

    // Active nav + scroll
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

    // Contact dropdown
    if (contactDropdown) {
      const toggle = contactDropdown.querySelector('.dropdown__toggle');

      if (toggle) {
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          const isOpen = contactDropdown.classList.toggle('dropdown--open');
          toggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', function () {
          contactDropdown.classList.remove('dropdown--open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      }
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
      'hero-bg.jpg': 'assets/images/hero-drone.jpg',
      'hero-drone.jpg': 'assets/images/hero-placeholder.svg',
      'hero-field-drone.jpg': 'assets/images/drone-spray.jpg',
      'drone-spray.jpg': 'assets/images/field-placeholder.svg',
      'drone-close.jpg': 'assets/images/drone-placeholder.svg',
      'field-rows.jpg': 'assets/images/field-placeholder.svg',
      'irrigation.jpg': 'assets/images/field-placeholder.svg',
      'garden.jpg': 'assets/images/field-placeholder.svg',
      'field-aerial.jpg': 'assets/images/field-placeholder.svg',
      'field-green.jpg': 'assets/images/field-placeholder.svg',
      'field-wheat.jpg': 'assets/images/field-placeholder.svg',
      'hero-landscape.jpg': 'assets/images/field-placeholder.svg',
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
