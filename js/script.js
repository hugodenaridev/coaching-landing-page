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

  // Reels: match the "coming soon" placeholder heights to the real Instagram
  // embed's full height, so the post shows completely (no internal scrollbar)
  // and all three cards line up. Instagram's embed.js replaces the blockquote
  // with an iframe asynchronously, so this polls for that iframe to appear
  // before measuring, instead of measuring the placeholder blockquote's height.
  var reelEmbed = document.querySelector('.reel-embed');
  var reelPlaceholders = document.querySelectorAll('.reel-placeholder');

  if (reelEmbed && reelPlaceholders.length && window.matchMedia('(min-width: 861px)').matches) {
    var applyReelHeight = function () {
      var height = reelEmbed.offsetHeight;
      if (height > 0) {
        reelPlaceholders.forEach(function (el) { el.style.height = height + 'px'; });
      }
    };

    var attempts = 0;
    var maxAttempts = 40; // ~10s at 250ms
    var pollId = setInterval(function () {
      attempts++;
      var isReady = reelEmbed.querySelector('iframe');
      if (isReady || attempts >= maxAttempts) {
        clearInterval(pollId);
        // The iframe reports a placeholder height first, then Instagram resizes
        // it to fit the real post a moment later; wait for that to settle.
        setTimeout(applyReelHeight, 400);
        setTimeout(applyReelHeight, 1200);
      }
    }, 250);

    window.addEventListener('resize', applyReelHeight);
  }
})();
