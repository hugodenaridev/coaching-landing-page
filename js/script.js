(function () {
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
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------- CTAs de WhatsApp ----------
  // Os hrefs já vêm prontos no HTML (a página precisa funcionar sem JS); isto
  // apenas os mantém corretos caso um data-message seja editado sem que o href
  // correspondente seja atualizado junto.
  var WHATSAPP_NUMBER = '5512997304566';

  document.querySelectorAll('.js-whatsapp-cta').forEach(function (link) {
    var message = link.dataset.message || 'Oi Agatha! Quero agendar minha conversa gratuita.';
    link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  // ---------- Menu mobile ----------
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

  // ---------- Botão flutuante de WhatsApp ----------
  //
  // Fica escondido enquanto a hero está na tela — ali o CTA principal já está
  // logo ali e o botão só competiria com ele. Passada a hero, aparece e segue
  // disponível até o fim da página.
  var waFloat = document.getElementById('wa-float');
  var hero = document.getElementById('hero');

  if (waFloat && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        waFloat.classList.remove('is-visible');
        waFloat.hidden = true;
      } else {
        waFloat.hidden = false;
        // No quadro seguinte, para a transição ter de onde animar em vez de já
        // aparecer no lugar final.
        requestAnimationFrame(function () { waFloat.classList.add('is-visible'); });
      }
    }, { threshold: 0, rootMargin: '-120px 0px 0px 0px' }).observe(hero);
  } else if (waFloat) {
    // Sem IntersectionObserver, é melhor o botão existir sempre do que nunca.
    waFloat.hidden = false;
    waFloat.classList.add('is-visible');
  }
})();
