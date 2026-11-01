(function () {
  var CONFIG = window.SITE_CONFIG;

  // ---------- Links de WhatsApp e Instagram ----------
  // O HTML já traz hrefs funcionais (a página precisa funcionar sem JS). Aqui
  // eles são refeitos a partir de js/config.js, que é a fonte única de contatos.
  function whatsappUrl(key) {
    var message = CONFIG.whatsappMessages[key] || CONFIG.whatsappMessages.geral;
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(message);
  }

  function applyContactLinks(root) {
    if (!CONFIG) return;

    root.querySelectorAll('[data-wa]').forEach(function (link) {
      link.href = whatsappUrl(link.getAttribute('data-wa'));
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    root.querySelectorAll('[data-instagram]').forEach(function (link) {
      link.href = CONFIG.instagramUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  applyContactLinks(document);

  // ---------- Scroll reveal ----------
  var revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealTargets.forEach(function (node) { revealObserver.observe(node); });
  } else {
    revealTargets.forEach(function (node) { node.classList.add('is-visible'); });
  }

  // ---------- Menu mobile ----------
  var navToggle = document.querySelector('.nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  function setMenu(open) {
    primaryNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      setMenu(!primaryNav.classList.contains('is-open'));
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        setMenu(false);
        navToggle.focus();
      }
    });
  }

  // ---------- Botão flutuante de WhatsApp ----------
  // Aparece depois de uma rolagem curta, para não competir com o CTA da
  // primeira tela. Nasce `hidden`: sem JS ele nunca fica preso sobre o texto.
  var waFloat = document.getElementById('wa-float');

  if (waFloat) {
    var ticking = false;

    var updateFloat = function () {
      ticking = false;
      var show = window.scrollY > 520;

      if (show && waFloat.hidden) {
        waFloat.hidden = false;
        // No quadro seguinte, para a transição ter de onde animar.
        requestAnimationFrame(function () { waFloat.classList.add('is-visible'); });
      } else if (!show && !waFloat.hidden) {
        waFloat.classList.remove('is-visible');
        waFloat.hidden = true;
      }
    };

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFloat);
      }
    }, { passive: true });

    updateFloat();
  }
})();
