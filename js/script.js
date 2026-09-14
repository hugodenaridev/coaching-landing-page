(function () {
  // Scroll reveal
  var revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // WhatsApp CTA links (hrefs are already set statically in HTML; this keeps them
  // correct even if a data-message attribute is edited without touching the href).
  var WHATSAPP_NUMBER = '5512997304566';

  document.querySelectorAll('.js-whatsapp-cta').forEach(function (link) {
    var message = link.dataset.message || 'Oi Agatha! Quero agendar minha conversa gratuita.';
    link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky mobile CTA bar.
  //
  // It stays out of the way in the two places where it would only add noise:
  // over the hero (the hero has its own primary CTA right there) and over the
  // closing CTA section (which is the same action, full size). Everywhere in
  // between, the bar is the always-reachable path to WhatsApp.
  //
  // The element starts with the `hidden` attribute so that, without JS, it never
  // appears stuck on screen with no way to dismiss it.
  var stickyCta = document.getElementById('sticky-cta');
  var hero = document.getElementById('hero');
  var finalCta = document.getElementById('final-cta');

  if (stickyCta && hero && 'IntersectionObserver' in window) {
    var heroVisible = true;
    var finalVisible = false;

    var syncStickyCta = function () {
      var shouldShow = !heroVisible && !finalVisible;

      // `hidden` is kept in sync with the class so the bar is also out of the
      // accessibility tree and the tab order while it is off screen.
      if (shouldShow) {
        stickyCta.hidden = false;
        document.body.classList.add('has-sticky-cta');
        // Next frame, so the slide-up transition has a starting point to
        // animate from instead of appearing already in place.
        requestAnimationFrame(function () { stickyCta.classList.add('is-visible'); });
      } else {
        stickyCta.classList.remove('is-visible');
        stickyCta.hidden = true;
        document.body.classList.remove('has-sticky-cta');
      }
    };

    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      syncStickyCta();
    }, { threshold: 0 }).observe(hero);

    if (finalCta) {
      new IntersectionObserver(function (entries) {
        finalVisible = entries[0].isIntersecting;
        syncStickyCta();
      }, { threshold: 0 }).observe(finalCta);
    }
  }
})();
