/* ==========================================================================
   Quiz "A mentoria é para mim?"
   - Uma pergunta por tela, barra de progresso, Voltar / Continuar.
   - As respostas ficam só na memória desta página: nada é enviado a servidor
     nem gravado (sem localStorage, cookies ou formulário).
   - Os textos e as alternativas estão todos nos dados abaixo (QUIZ). Para mudar
     uma pergunta ou alternativa, edite só aqui; a tela é montada a partir deles.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('quiz');
  if (!root) return;

  // ---------------------------------------------------------------- Conteúdo
  var QUIZ = {
    // Cada pergunta com "Outro" ganha automaticamente a 7ª opção com texto livre.
    q1: {
      legend: 'Qual dessas situações mais combina com você hoje?',
      options: [
        'Tenho objetivos claros, mas não consigo colocá-los em prática.',
        'Tenho muitos sonhos, mas não sei transformá-los em planos.',
        'Sinto que sou capaz de mais, mas ainda não sei exatamente o que quero.',
        'Sei o que quero mudar, mas sempre acabo voltando aos mesmos hábitos.',
        'Estou passando por uma fase de mudanças e preciso de direção.',
        'Minha vida parece estar no automático e quero construir algo diferente.'
      ],
      // Posições (a partir de 0) das alternativas "tenho sonhos, mas ainda não
      // tenho objetivos claros": a 2 e a 3. Mudam a mensagem do resultado.
      dreamer: [1, 2]
    },

    areasQuestion: {
      legend: 'Quais áreas da sua vida você mais gostaria de desenvolver?',
      hint: 'Escolha até três áreas que são importantes para você neste momento.',
      max: 3
    },

    areas: [
      {
        id: 'rotina', label: 'Rotina e disciplina',
        legend: 'O que você gostaria de melhorar na sua rotina?',
        options: [
          'Parar de procrastinar e conseguir começar o que planejo.',
          'Desenvolver disciplina e manter a constância.',
          'Acordar mais cedo e aproveitar melhor o dia.',
          'Organizar meu tempo e minhas prioridades.',
          'Diminuir distrações e o uso excessivo do celular.',
          'Construir uma rotina equilibrada que inclua minhas responsabilidades e meus objetivos pessoais.'
        ]
      },
      {
        id: 'saude', label: 'Saúde e corpo',
        legend: 'O que você gostaria de desenvolver em relação à sua saúde e ao seu corpo?',
        options: [
          'Criar constância na prática de exercícios físicos.',
          'Organizar uma rotina de alimentação mais saudável.',
          'Priorizar meu autocuidado.',
          'Melhorar meus hábitos de sono e descanso.',
          'Conseguir conciliar trabalho, responsabilidades e cuidados pessoais.',
          'Ter mais disciplina para manter hábitos saudáveis.'
        ]
      },
      {
        id: 'autoestima', label: 'Autoestima e autoconfiança',
        legend: 'O que você gostaria de fortalecer em si?',
        options: [
          'Confiar mais na minha capacidade de realizar meus objetivos.',
          'Deixar de me comparar tanto com outras pessoas.',
          'Superar o medo de errar ou de ser rejeitado.',
          'Aprender a reconhecer minhas qualidades e meu valor.',
          'Ter mais coragem para tomar decisões importantes.',
          'Conseguir me posicionar e me expressar com mais segurança.'
        ]
      },
      {
        id: 'emocional', label: 'Vida emocional',
        legend: 'O que você gostaria de melhorar na maneira como lida consigo e com as situações da vida?',
        options: [
          'Desenvolver uma perspectiva mais positiva do futuro.',
          'Reconhecer e trabalhar padrões de pensamentos negativos.',
          'Lidar melhor com frustrações e contratempos.',
          'Desenvolver mais consciência sobre minhas emoções e reações.',
          'Deixar de alimentar pensamentos que me impedem de agir.',
          'Desenvolver mais equilíbrio emocional nas decisões do dia a dia.'
        ]
      },
      {
        id: 'relacionamentos', label: 'Relacionamentos',
        legend: 'O que você gostaria de melhorar nos seus relacionamentos?',
        options: [
          'Melhorar minha comunicação com meu parceiro ou minha parceira.',
          'Aprender a lidar melhor com conflitos e divergências.',
          'Demonstrar mais carinho, atenção e afeto.',
          'Desenvolver relacionamentos mais saudáveis e equilibrados.',
          'Aprender a estabelecer limites e expressar minhas necessidades.',
          'Recuperar minha autoconfiança e reorganizar minha vida após o fim de um relacionamento.'
        ]
      },
      {
        id: 'espiritual', label: 'Vida espiritual',
        legend: 'O que você gostaria de desenvolver na sua vida espiritual?',
        options: [
          'Criar constância na oração.',
          'Dedicar mais tempo à leitura e ao estudo da Bíblia.',
          'Fortalecer meu relacionamento com Deus.',
          'Alinhar melhor minhas decisões aos meus valores e à minha fé.',
          'Desenvolver uma rotina espiritual mais intencional.',
          'Encontrar mais clareza sobre meus valores e propósito de vida.'
        ]
      },
      {
        id: 'profissional', label: 'Vida profissional',
        legend: 'O que você gostaria de transformar na sua vida profissional?',
        options: [
          'Crescer na carreira e conquistar novas oportunidades.',
          'Ter mais clareza sobre a profissão ou carreira que desejo seguir.',
          'Planejar uma transição de carreira.',
          'Desenvolver mais confiança e posicionamento profissional.',
          'Melhorar minha organização, produtividade e execução no trabalho.',
          'Transformar uma ideia ou sonho profissional em um projeto concreto.'
        ]
      },
      {
        id: 'financeira', label: 'Vida financeira',
        legend: 'O que você gostaria de melhorar na sua vida financeira?',
        options: [
          'Criar o hábito de acompanhar meus gastos.',
          'Organizar meu orçamento e minhas prioridades financeiras.',
          'Ter mais disciplina para economizar.',
          'Definir metas financeiras claras.',
          'Desenvolver hábitos mais conscientes de consumo.',
          'Construir um plano de ação para alcançar objetivos financeiros pessoais.'
        ]
      }
    ],

    // Pergunta comercial (última). O preço aproximado só aparece aqui, depois das
    // perguntas sobre objetivos e prioridades. Os valores exatos vêm de js/config.js.
    final: {
      title: 'Você está pronta para investir no seu próximo capítulo?',
      intro: 'Você já identificou as áreas da sua vida que deseja transformar. Agora quero te apresentar como podemos trabalhar isso juntos.',
      offerTitle: 'Mentoria Individual Premium',
      offerItems: [
        '12 encontros individuais, com duração de 1h30, podendo chegar a 2 horas.',
        'Sessões semanais ou quinzenais, conforme o planejamento e a disponibilidade.',
        'Online, de qualquer lugar do mundo, ou presencial em São José dos Campos (SP).',
        'Plano de ação personalizado para suas prioridades.',
        'Exercícios pontuais e práticas recorrentes entre as sessões.',
        'Ferramentas práticas e acompanhamento individual.',
        'Suporte pelo WhatsApp, conforme as condições do acompanhamento.'
      ],
      // A faixa é calculada a partir de SITE_CONFIG.pricing (js/config.js): nada fixo aqui.
      priceBefore: 'O acompanhamento individual completo envolve um investimento entre ',
      priceAfter: ', conforme a modalidade escolhida.',
      legend: 'Considerando esse investimento, qual opção faz mais sentido para você agora?',
      options: [
        { id: 'investir', label: 'Quero investir em mim e conhecer as opções para começar.', desc: 'Estou pronta para avaliar minha contratação.' },
        { id: 'acessivel', label: 'Quero começar com um investimento mais acessível.', desc: 'Tenho interesse em cursos e ferramentas digitais quando estiverem disponíveis.' },
        { id: 'planejar', label: 'Tenho interesse, mas preciso me planejar financeiramente.', desc: 'Gostaria de considerar a mentoria para outro momento.' },
        { id: 'conhecer', label: 'Prefiro continuar conhecendo seu trabalho por enquanto.', desc: 'Ainda não é o momento de contratar.' }
      ]
    },

    result: {
      title: 'Todo grande projeto começa com uma decisão.',
      dreamer: 'Você já reconhece que deseja construir algo diferente. A mentoria pode ajudar você a transformar seus sonhos em objetivos mais claros, definir prioridades e criar um plano de ação para começar.',
      standard: 'Você identificou áreas importantes que deseja desenvolver. A mentoria pode ajudar você a compreender o que está dificultando seu avanço, organizar prioridades e transformar seus objetivos em ações práticas.',
      note: 'A mentoria é um acompanhamento individual de desenvolvimento pessoal. A compatibilidade com suas necessidades será confirmada antes da contratação.'
    },

    // Modalidades da opção 1 (os valores vêm de SITE_CONFIG.pricing, em js/config.js)
    modalities: [
      { id: 'online', label: 'Online' },
      { id: 'presencial', label: 'Presencial em São José dos Campos' }
    ],

    // Caminhos de decisão
    path: {
      investTitle: 'Investimento do programa completo',
      investHint: 'Escolha a modalidade que faz mais sentido para você.',
      requestTitle: 'Quero começar minha mentoria',
      requestPurpose: 'Usamos estas informações apenas para analisar sua solicitação e entrar em contato sobre a mentoria. Não pedimos CPF nesta etapa.',
      privacyLabel: 'Política de Privacidade',
      pendingNotice: 'Integração pendente: o servidor que recebe estas solicitações ainda não está configurado, então este formulário ainda não envia nenhuma informação.',
      requestError: 'Não foi possível concluir o envio agora e não recebemos confirmação do servidor. Nada foi registrado. Tente novamente em instantes.',
      sentTitle: 'Solicitação recebida',
      sentText: 'O servidor confirmou o recebimento da sua solicitação. Para continuar a conversa, abra o WhatsApp com uma mensagem pronta. Você precisa confirmar o envio da mensagem no aplicativo: ela não é enviada automaticamente.',
      whatsappLabel: 'Abrir WhatsApp com minha solicitação',

      digitalTitle: 'Você pode começar com passos menores.',
      digitalText: 'Estou desenvolvendo cursos e ferramentas digitais para ajudar você a construir hábitos, organizar seus objetivos e colocá-los em prática. Quer saber quando estiverem disponíveis?',
      consentDigital: 'Aceito receber comunicações da Ágatha Vidal sobre cursos e ferramentas digitais, quando estiverem disponíveis.',

      planTitle: 'Planejar seu investimento também faz parte de uma decisão consciente.',
      planText: 'Você pode conhecer os valores completos, organizar suas prioridades e voltar quando fizer sentido para você.',
      showPrices: 'Ver os valores completos',
      planInterest: 'Se quiser, você também pode registrar interesse em receber informações futuras.',
      consentMentoria: 'Aceito receber informações futuras da Ágatha Vidal sobre a mentoria.',

      exploreTitle: 'Tudo bem. Continue explorando conteúdos e ferramentas que podem ajudar você a dar os próximos passos.',
      instagramLabel: 'Instagram da Ágatha',

      // Mensagens do cadastro (nunca declaram cadastro concluído sem armazenamento funcional)
      leadSoon: 'O cadastro para receber avisos ainda não está disponível, e por isso nada é coletado ou salvo agora. Enquanto isso, você pode acompanhar a Ágatha no Instagram.',
      leadUnavailable: 'O cadastro ainda não está disponível. Nada foi enviado.',
      leadSaved: 'Cadastro recebido.',
      leadError: 'Não foi possível enviar agora. Tente novamente mais tarde.'
    }
  };

  var OTHER_LABEL = 'Outro';
  var OTHER_PLACEHOLDER = 'Escreva livremente';
  var CFG = window.SITE_CONFIG || {};
  var QCFG = CFG.quiz || {};

  // ------------------------------------------------------------------ Estado
  var state;
  var current = 'intro';

  function freshState() {
    return {
      q1: { choice: null, other: '' },
      areas: [],
      ans: {},
      final: null,      // posição da alternativa da pergunta comercial (0 a 3)
      modality: null,   // 'online' | 'presencial' (caminho da opção 1)
      contact: { fullName: '', age: '', profession: '', cityState: '', email: '', whatsapp: '', ageInWhatsapp: false },
      requestId: null,  // identificador devolvido pelo servidor (só existe após confirmação)
      showPrices: false // caminho da opção 3: valores exibidos?
    };
  }

  state = freshState();

  // ---------------------------------------------------------------- Elementos
  var introEl = document.getElementById('quiz-intro');
  var runEl = document.getElementById('quiz-run');
  var stageEl = document.getElementById('quiz-stage');
  var barEl = document.getElementById('quiz-bar');
  var progressEl = document.getElementById('quiz-progress');
  var progressTextEl = document.getElementById('quiz-progress-text');
  var startBtn = document.getElementById('quiz-start');

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  var uid = 0;
  function nextId(prefix) { uid += 1; return prefix + '-' + uid; }

  function areaById(id) {
    for (var i = 0; i < QUIZ.areas.length; i++) if (QUIZ.areas[i].id === id) return QUIZ.areas[i];
    return null;
  }

  function decisionId() {
    return state.final === null ? null : QUIZ.final.options[state.final].id;
  }

  // ------------------------------------------------------------------- Fluxo
  // Perguntas (as que entram na contagem "Pergunta X de Y")
  function questions() {
    var list = ['q1', 'areas'];
    state.areas.forEach(function (id) { list.push('a:' + id); });
    list.push('final');
    return list;
  }

  // Ordem completa das telas: perguntas -> resultado -> pergunta comercial -> caminho
  function flow() {
    var list = questions();
    list.splice(list.length - 1, 0, 'result');
    list.push('path');
    if (decisionId() === 'investir' && state.modality) list.push('request');
    if (state.requestId) list.push('sent');
    return list;
  }

  function isValid() {
    if (current === 'q1') {
      var c = state.q1;
      return c.choice !== null && (c.choice !== QUIZ.q1.options.length || c.other.trim() !== '');
    }
    if (current === 'areas') {
      return state.areas.length >= 1 && state.areas.length <= QUIZ.areasQuestion.max;
    }
    if (current.indexOf('a:') === 0) {
      var a = state.ans[current.slice(2)];
      if (!a || a.sel.length === 0) return false;
      var otherIdx = areaById(current.slice(2)).options.length;
      return a.sel.indexOf(otherIdx) === -1 || a.other.trim() !== '';
    }
    if (current === 'final') return state.final !== null;
    if (current === 'path') return decisionId() !== 'investir' || state.modality !== null;
    return true;
  }

  function go(step, opts) {
    current = step;
    render();
    if (!(opts && opts.silent)) {
      root.scrollIntoView({ block: 'start' });
    }
    var focusEl = stageEl.querySelector('[data-focus]');
    if (focusEl) focusEl.focus({ preventScroll: true });
  }

  function next() {
    if (!isValid()) return;

    if (current === 'areas') {
      // Mantém só as respostas das áreas ainda escolhidas
      Object.keys(state.ans).forEach(function (id) {
        if (state.areas.indexOf(id) === -1) delete state.ans[id];
      });
      state.areas.forEach(function (id) {
        if (!state.ans[id]) state.ans[id] = { sel: [], other: '' };
      });
    }

    var list = flow();
    var pos = list.indexOf(current);
    if (pos > -1 && pos < list.length - 1) go(list[pos + 1]);
  }

  function back() {
    if (current === 'q1') return showIntro();
    var list = flow();
    var pos = list.indexOf(current);
    // Ao voltar da pergunta comercial, a modalidade/valores do caminho anterior são descartados
    go(list[pos - 1]);
  }

  function showIntro() {
    runEl.hidden = true;
    introEl.hidden = false;
    current = 'intro';
    root.scrollIntoView({ block: 'start' });
    if (startBtn) startBtn.focus({ preventScroll: true });
  }

  function start() {
    introEl.hidden = true;
    runEl.hidden = false;
    go('q1');
  }

  function restart() {
    state = freshState();
    go('q1');
  }

  // --------------------------------------------------------------- Progresso
  function updateProgress() {
    var qs = questions();
    var pct;
    var text;

    if (current === 'result') {
      pct = Math.round(((qs.length - 1) / qs.length) * 100);
      text = 'Resultado';
    } else if (current === 'path' || current === 'request' || current === 'sent') {
      pct = 100;
      text = 'Próximo passo';
    } else {
      var idx = qs.indexOf(current);
      pct = Math.max(6, Math.round((idx / qs.length) * 100));
      text = 'Pergunta ' + (idx + 1) + ' de ' + qs.length;
    }

    progressTextEl.textContent = text;
    barEl.style.width = pct + '%';
    progressEl.setAttribute('aria-valuenow', String(pct));
    progressEl.setAttribute('aria-valuetext', text);
  }

  // ----------------------------------------------------------- Alternativas
  /**
   * Monta a lista de alternativas.
   * cfg: { type: 'radio'|'checkbox', name, options[], withOther, isChecked(i),
   *        otherText, onSelect(i, checked), onOtherText(text), maxChecked }
   * Cada opção é um texto ou { label, desc } (título em destaque + descrição).
   */
  function buildChoices(cfg, labelledBy) {
    var group = el('div', 'quiz-options');
    group.setAttribute('role', cfg.type === 'radio' ? 'radiogroup' : 'group');
    group.setAttribute('aria-labelledby', labelledBy);

    var all = cfg.options.slice();
    if (cfg.withOther) all.push(OTHER_LABEL);

    var otherIdx = cfg.options.length;
    var otherInput = null;

    all.forEach(function (opt, i) {
      var id = nextId('opt');
      var wrap = el('div', 'quiz-option');
      var input = el('input');
      input.type = cfg.type;
      input.name = cfg.name;
      input.id = id;
      input.value = String(i);
      input.checked = cfg.isChecked(i);
      input.setAttribute('data-index', String(i));

      var lab = el('label');
      lab.setAttribute('for', id);
      if (typeof opt === 'string') {
        lab.textContent = opt;
      } else {
        lab.appendChild(el('strong', null, opt.label));
        if (opt.desc) lab.appendChild(el('span', 'quiz-option-desc', opt.desc));
      }

      wrap.appendChild(input);
      wrap.appendChild(lab);
      group.appendChild(wrap);

      if (cfg.withOther && i === otherIdx) {
        var otherWrap = el('div', 'quiz-other');
        var otherId = nextId('other');
        var otherLabel = el('label', 'sr-only', OTHER_PLACEHOLDER);
        otherLabel.setAttribute('for', otherId);
        otherInput = el('input');
        otherInput.type = 'text';
        otherInput.id = otherId;
        otherInput.maxLength = 200;
        otherInput.placeholder = OTHER_PLACEHOLDER;
        otherInput.autocomplete = 'off';
        otherInput.value = cfg.otherText();
        otherWrap.hidden = !input.checked;
        otherWrap.appendChild(otherLabel);
        otherWrap.appendChild(otherInput);
        group.appendChild(otherWrap);

        otherInput.addEventListener('input', function () {
          cfg.onOtherText(otherInput.value);
          refreshActions();
        });
      }

      input.addEventListener('change', function () {
        cfg.onSelect(i, input.checked);

        // A caixa de texto de "Outro" aparece só quando ele está marcado.
        group.querySelectorAll('.quiz-other').forEach(function (box) {
          var otherInputEl = group.querySelector('input[data-index="' + otherIdx + '"]');
          box.hidden = !(otherInputEl && otherInputEl.checked);
        });
        if (cfg.withOther && i === otherIdx && input.checked && otherInput) otherInput.focus();

        if (cfg.maxChecked) applyMax(group, cfg.maxChecked);
        refreshActions();
      });
    });

    if (cfg.maxChecked) applyMax(group, cfg.maxChecked);
    return group;
  }

  // Com o limite atingido, as demais ficam desabilitadas (a pessoa desmarca uma para trocar)
  function applyMax(group, max) {
    var inputs = group.querySelectorAll('input[type="checkbox"]');
    var count = 0;
    inputs.forEach(function (inp) { if (inp.checked) count += 1; });
    inputs.forEach(function (inp) {
      var blocked = count >= max && !inp.checked;
      inp.disabled = blocked;
      inp.parentNode.classList.toggle('is-disabled', blocked);
    });
  }

  // ----------------------------------------------------------------- Telas
  function button(label, className, onClick) {
    var b = el('button', 'btn ' + className, label);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }

  function actions() {
    var bar = el('div', 'quiz-actions');
    bar.appendChild(button('Voltar', 'btn--ghost quiz-back', back));
    var nextBtn = button('Continuar', 'btn--dark quiz-next', next);
    nextBtn.id = 'quiz-next';
    bar.appendChild(nextBtn);
    return bar;
  }

  function refreshActions() {
    var btn = document.getElementById('quiz-next');
    if (btn) btn.disabled = !isValid();
  }

  function heading(text, hintText) {
    var id = nextId('q');
    var h = el('h2', 'quiz-question', text);
    h.id = id;
    h.tabIndex = -1;
    h.setAttribute('data-focus', '');
    var box = el('div', 'quiz-head');
    box.appendChild(h);
    if (hintText) box.appendChild(el('p', 'quiz-hint', hintText));
    return { box: box, id: id };
  }

  function renderQ1() {
    var q = QUIZ.q1;
    var h = heading(q.legend);
    var choices = buildChoices({
      type: 'radio', name: 'q1', options: q.options, withOther: true,
      isChecked: function (i) { return state.q1.choice === i; },
      otherText: function () { return state.q1.other; },
      onSelect: function (i) { state.q1.choice = i; },
      onOtherText: function (t) { state.q1.other = t; }
    }, h.id);
    stageEl.appendChild(h.box);
    stageEl.appendChild(choices);
  }

  function renderAreas() {
    var q = QUIZ.areasQuestion;
    var h = heading(q.legend, q.hint);
    var labels = QUIZ.areas.map(function (a) { return a.label; });
    var choices = buildChoices({
      type: 'checkbox', name: 'areas', options: labels, withOther: false, maxChecked: q.max,
      isChecked: function (i) { return state.areas.indexOf(QUIZ.areas[i].id) !== -1; },
      onSelect: function (i, checked) {
        var id = QUIZ.areas[i].id;
        var pos = state.areas.indexOf(id);
        if (checked && pos === -1) state.areas.push(id);
        if (!checked && pos !== -1) state.areas.splice(pos, 1);
        // Mantém a ordem original da lista de áreas
        state.areas.sort(function (a, b) {
          return QUIZ.areas.indexOf(areaById(a)) - QUIZ.areas.indexOf(areaById(b));
        });
        updateProgress();
      }
    }, h.id);
    stageEl.appendChild(h.box);
    stageEl.appendChild(choices);
  }

  function renderArea(id) {
    var area = areaById(id);
    var a = state.ans[id];
    var h = heading(area.legend, 'Você pode escolher mais de uma alternativa.');
    var choices = buildChoices({
      type: 'checkbox', name: 'area-' + id, options: area.options, withOther: true,
      isChecked: function (i) { return a.sel.indexOf(i) !== -1; },
      otherText: function () { return a.other; },
      onSelect: function (i, checked) {
        var pos = a.sel.indexOf(i);
        if (checked && pos === -1) a.sel.push(i);
        if (!checked && pos !== -1) a.sel.splice(pos, 1);
        a.sel.sort(function (x, y) { return x - y; });
      },
      onOtherText: function (t) { a.other = t; }
    }, h.id);

    stageEl.appendChild(el('p', 'quiz-area-tag', area.label));
    stageEl.appendChild(h.box);
    stageEl.appendChild(choices);
  }

  // ---------------------------------------------- Pergunta comercial (final)
  function renderFinal() {
    var f = QUIZ.final;

    var h = el('h2', 'quiz-question', f.title);
    h.tabIndex = -1;
    h.setAttribute('data-focus', '');
    stageEl.appendChild(h);
    stageEl.appendChild(el('p', 'quiz-lead', f.intro));

    // Card da mentoria premium
    var offer = el('div', 'quiz-offer');
    offer.appendChild(el('h3', null, f.offerTitle));
    var ul = el('ul', 'quiz-offer-list');
    f.offerItems.forEach(function (t) { ul.appendChild(el('li', null, t)); });
    offer.appendChild(ul);

    // Faixa de investimento: menor e maior valor total, vindos de js/config.js
    var range = priceRange();
    if (range) {
      var price = el('div', 'quiz-price');
      var sentence = el('p', 'quiz-price-statement');
      sentence.appendChild(document.createTextNode(f.priceBefore));
      sentence.appendChild(el('strong', null, range.low + ' e ' + range.high));
      sentence.appendChild(document.createTextNode(f.priceAfter));
      price.appendChild(sentence);
      offer.appendChild(price);
    }
    stageEl.appendChild(offer);

    // Pergunta
    var qid = nextId('q');
    var q = el('h3', 'quiz-subquestion', f.legend);
    q.id = qid;
    stageEl.appendChild(q);

    var choices = buildChoices({
      type: 'radio', name: 'final', options: f.options, withOther: false,
      isChecked: function (i) { return state.final === i; },
      onSelect: function (i) {
        // Trocar a decisão zera o que dependia da anterior
        if (state.final !== i) { state.modality = null; state.showPrices = false; state.requestId = null; }
        state.final = i;
      }
    }, qid);
    stageEl.appendChild(choices);
  }

  // ----------------------------------------------------- Resultado personalizado
  function renderResult() {
    var r = QUIZ.result;
    var h = el('h2', 'quiz-question quiz-result-title', r.title);
    h.tabIndex = -1;
    h.setAttribute('data-focus', '');
    stageEl.appendChild(h);

    var summary = el('div', 'quiz-summary');

    // Momento atual
    var momentText = state.q1.choice === QUIZ.q1.options.length
      ? OTHER_LABEL + ': ' + state.q1.other.trim()
      : QUIZ.q1.options[state.q1.choice];
    summary.appendChild(el('p', 'quiz-summary-label', 'Seu momento atual'));
    summary.appendChild(el('p', 'quiz-summary-moment', momentText));

    // Áreas e desafios escolhidos
    summary.appendChild(el('p', 'quiz-summary-label', 'Áreas e desafios que você escolheu'));
    var grid = el('div', 'quiz-summary-areas');
    state.areas.forEach(function (id) {
      var area = areaById(id);
      var a = state.ans[id];
      var card = el('div', 'quiz-summary-area');
      card.appendChild(el('h3', null, area.label));
      var ul = el('ul');
      a.sel.forEach(function (i) {
        var text = i === area.options.length
          ? OTHER_LABEL + ': ' + a.other.trim()
          : area.options[i];
        ul.appendChild(el('li', null, text));
      });
      card.appendChild(ul);
      grid.appendChild(card);
    });
    summary.appendChild(grid);
    stageEl.appendChild(summary);

    // Mensagem (sonhos sem objetivos claros x demais casos)
    var isDreamer = QUIZ.q1.dreamer.indexOf(state.q1.choice) !== -1;
    stageEl.appendChild(el('p', 'quiz-message', isDreamer ? r.dreamer : r.standard));
    stageEl.appendChild(el('p', 'quiz-note', r.note));
    stageEl.appendChild(actions());
  }

  // ------------------------------------------------------------ Caminhos
  function linkBtn(label, href, className, external) {
    var a = el('a', 'btn ' + className, label);
    a.href = href;
    if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }

  // Valores (vêm de js/config.js, fonte única)
  function planById(modalityId) {
    var p = CFG.pricing;
    if (!p || !p.enabled || !p.plans) return null;
    for (var i = 0; i < p.plans.length; i++) if (p.plans[i].id === modalityId) return p.plans[i];
    return null;
  }

  function toNumber(brl) { return parseInt(String(brl).replace(/\D/g, ''), 10); }

  function priceRange() {
    var p = CFG.pricing;
    if (!p || !p.enabled || !p.plans || !p.plans.length) return null;
    var sorted = p.plans.slice().sort(function (a, b) { return toNumber(a.total) - toNumber(b.total); });
    return { low: sorted[0].total, high: sorted[sorted.length - 1].total };
  }

  function priceText(m) {
    var plan = planById(m.id);
    if (!plan) return 'Valor informado diretamente pela Ágatha';
    return plan.perSession + ' por sessão — ' + plan.total + ' pelas ' + (CFG.pricing.sessions || 12) + ' sessões';
  }

  function pathActions(withNext) {
    var bar = el('div', 'quiz-actions');
    bar.appendChild(button('Voltar', 'btn--ghost quiz-back', back));
    if (withNext) {
      var nextBtn = button('Continuar', 'btn--dark quiz-next', next);
      nextBtn.id = 'quiz-next';
      bar.appendChild(nextBtn);
    } else {
      bar.appendChild(button('Refazer o quiz', 'btn--ghost', restart));
    }
    return bar;
  }

  function pathHeading(text) {
    var h = el('h2', 'quiz-question', text);
    h.tabIndex = -1;
    h.setAttribute('data-focus', '');
    return h;
  }

  // Lista de valores (somente leitura)
  function priceList() {
    var list = el('div', 'quiz-prices');
    QUIZ.modalities.forEach(function (m) {
      var row = el('div', 'quiz-price-row');
      row.appendChild(el('strong', null, m.label));
      row.appendChild(el('span', null, priceText(m)));
      list.appendChild(row);
    });
    return list;
  }

  // ----- Cadastro (preparado; só ativa com QCFG.leadsEnabled = true) -----
  function leadBlock(interest) {
    var wrap = el('div', 'quiz-lead-box');

    if (!QCFG.leadsEnabled) {
      wrap.appendChild(el('p', null, QUIZ.path.leadSoon));
      if (CFG.instagramUrl) {
        wrap.appendChild(linkBtn(QUIZ.path.instagramLabel, CFG.instagramUrl, 'btn--ghost', true));
      }
      return wrap;
    }

    var form = el('form', 'quiz-form');
    form.noValidate = false;

    function field(labelText, type, name, autocomplete) {
      var id = nextId('f');
      var row = el('div', 'quiz-field');
      var lab = el('label', null, labelText);
      lab.setAttribute('for', id);
      var inp = el('input');
      inp.type = type; inp.id = id; inp.name = name; inp.required = true;
      inp.autocomplete = autocomplete; inp.maxLength = 120;
      row.appendChild(lab); row.appendChild(inp);
      form.appendChild(row);
      return inp;
    }

    var nameInp = field('Primeiro nome', 'text', 'firstName', 'given-name');
    var mailInp = field('E-mail', 'email', 'email', 'email');

    // Consentimento específico, opcional e desmarcado por padrão
    var cid = nextId('consent');
    var crow = el('div', 'quiz-consent');
    var consent = el('input');
    consent.type = 'checkbox'; consent.id = cid; consent.checked = false;
    var clab = el('label', null, interest === 'digital' ? QUIZ.path.consentDigital : QUIZ.path.consentMentoria);
    clab.setAttribute('for', cid);
    crow.appendChild(consent); crow.appendChild(clab);
    form.appendChild(crow);

    var status = el('p', 'quiz-form-status');
    status.setAttribute('role', 'status');
    var submit = el('button', 'btn btn--dark', 'Enviar');
    submit.type = 'submit';
    form.appendChild(submit);
    form.appendChild(status);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      status.textContent = '';

      // Só o necessário para o cadastro: as respostas do quiz NÃO vão junto.
      var payload = {
        firstName: nameInp.value.trim(),
        email: mailInp.value.trim(),
        consent: consent.checked,
        interest: interest,
        decision: decisionId()
      };

      if (typeof QCFG.submitLead !== 'function') {
        status.textContent = QUIZ.path.leadUnavailable;
        return;
      }

      submit.disabled = true;
      Promise.resolve(QCFG.submitLead(payload)).then(function () {
        status.textContent = QUIZ.path.leadSaved;
      }, function () {
        status.textContent = QUIZ.path.leadError;
        submit.disabled = false;
      });
    });

    wrap.appendChild(form);
    return wrap;
  }

  function renderPath() {
    var id = decisionId();
    var P = QUIZ.path;

    if (id === 'investir') {
      stageEl.appendChild(pathHeading(P.investTitle));
      stageEl.appendChild(el('p', 'quiz-hint quiz-hint--tight', P.investHint));

      var gid = nextId('mod');
      var label = el('p', 'sr-only', P.investTitle);
      label.id = gid;
      stageEl.appendChild(label);

      var options = QUIZ.modalities.map(function (m) { return { label: m.label, desc: priceText(m) }; });
      stageEl.appendChild(buildChoices({
        type: 'radio', name: 'modality', options: options, withOther: false,
        isChecked: function (i) { return state.modality === QUIZ.modalities[i].id; },
        onSelect: function (i) { state.modality = QUIZ.modalities[i].id; }
      }, gid));
      stageEl.appendChild(pathActions(true));
      refreshActions();
      return;
    }

    if (id === 'acessivel') {
      stageEl.appendChild(pathHeading(P.digitalTitle));
      stageEl.appendChild(el('p', 'quiz-lead', P.digitalText));
      stageEl.appendChild(leadBlock('digital'));
      stageEl.appendChild(pathActions(false));
      return;
    }

    if (id === 'planejar') {
      stageEl.appendChild(pathHeading(P.planTitle));
      stageEl.appendChild(el('p', 'quiz-lead', P.planText));

      var holder = el('div', 'quiz-reveal');
      if (state.showPrices) {
        holder.appendChild(priceList());
      } else {
        holder.appendChild(button(P.showPrices, 'btn--ghost', function () {
          state.showPrices = true;
          go('path', { silent: true });
        }));
      }
      stageEl.appendChild(holder);
      stageEl.appendChild(el('p', 'quiz-lead quiz-lead--small', P.planInterest));
      stageEl.appendChild(leadBlock('mentoria'));
      stageEl.appendChild(pathActions(false));
      return;
    }

    // 'conhecer'
    stageEl.appendChild(pathHeading(P.exploreTitle));
    var links = el('div', 'quiz-explore');
    if (CFG.instagramUrl) links.appendChild(linkBtn(P.instagramLabel, CFG.instagramUrl, 'btn--dark', true));
    links.appendChild(linkBtn('Sobre mim', 'sobre-mim.html', 'btn--ghost', false));
    links.appendChild(linkBtn('Perguntas frequentes', 'perguntas-frequentes.html', 'btn--ghost', false));
    stageEl.appendChild(links);
    stageEl.appendChild(pathActions(false));
  }

  // ---------------------------------------------------------- Solicitação
  // Opção 1: depois de escolher a modalidade. Os dados só saem desta página para o
  // servidor configurado em SITE_CONFIG.quiz.requestEndpoint. Sem ele, NADA é enviado
  // e a tela diz que a integração está pendente. Nunca simula sucesso.
  function modalityById(id) {
    return QUIZ.modalities.filter(function (x) { return x.id === id; })[0];
  }

  function areaLabels() {
    return state.areas.map(function (id) { return areaById(id).label; });
  }

  function buildRequestPayload() {
    var c = state.contact;
    return {
      version: 1,
      contact: {
        fullName: c.fullName.trim(),
        age: c.age.trim() || null,
        profession: c.profession.trim(),
        cityState: c.cityState.trim(),
        email: c.email.trim(),
        whatsapp: c.whatsapp.trim()
      },
      modality: state.modality,
      whatsappMayIncludeAge: !!(c.ageInWhatsapp && c.age.trim()),
      quiz: window.QuizApp.getSubmission()
    };
  }

  // Mensagem do WhatsApp: só dados de identificação, até 3 áreas e o identificador.
  // Respostas livres, detalhes pessoais e o relatório do quiz NÃO entram na mensagem.
  function whatsappRequestUrl() {
    var c = state.contact;
    var m = modalityById(state.modality);
    var lines = ['Olá, Ágatha! Enviei minha solicitação de mentoria pelo site.', ''];
    lines.push('Nome: ' + c.fullName.trim());
    if (c.ageInWhatsapp && c.age.trim()) lines.push('Idade/faixa etária: ' + c.age.trim());
    lines.push('Profissão: ' + c.profession.trim());
    lines.push('Cidade/estado: ' + c.cityState.trim());
    lines.push('Áreas prioritárias: ' + areaLabels().slice(0, 3).join(', '));
    lines.push('Modalidade: ' + m.label);
    lines.push('Solicitação: ' + state.requestId);
    return 'https://wa.me/' + CFG.whatsappNumber + '?text=' + encodeURIComponent(lines.join(String.fromCharCode(10)));
  }

  function sendRequest(payload) {
    var url = QCFG.requestEndpoint;
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      cache: 'no-store',
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      if (timer) clearTimeout(timer);
      if (!res.ok) throw new Error('http');
      return res.json();
    }).then(function (data) {
      // Só vale como "recebida" se o servidor devolver o identificador
      if (!data || typeof data.id !== 'string' || !data.id.trim()) throw new Error('resposta');
      return data.id.trim();
    });
  }

  function renderRequest() {
    var P = QUIZ.path;
    var m = modalityById(state.modality);
    var pending = !QCFG.requestEndpoint;

    stageEl.appendChild(pathHeading(P.requestTitle));

    var purpose = el('p', 'quiz-lead', P.requestPurpose + ' ');
    var pl = el('a', null, P.privacyLabel);
    pl.href = 'politica-de-privacidade.html';
    pl.target = '_blank';
    pl.rel = 'noopener';
    purpose.appendChild(pl);
    purpose.appendChild(document.createTextNode('.'));
    stageEl.appendChild(purpose);

    var chosen = el('div', 'quiz-prices');
    var row = el('div', 'quiz-price-row');
    row.appendChild(el('span', 'quiz-row-label', 'Modalidade escolhida'));
    row.appendChild(el('strong', null, m.label));
    row.appendChild(el('span', null, priceText(m)));
    chosen.appendChild(row);
    stageEl.appendChild(chosen);

    if (pending) {
      var note = el('p', 'quiz-notice', P.pendingNotice);
      note.setAttribute('role', 'status');
      stageEl.appendChild(note);
    }

    var form = el('form', 'quiz-form quiz-form--request');
    var c = state.contact;

    function field(key, labelText, type, auto, required, hint) {
      var id = nextId('r');
      var wrap = el('div', 'quiz-field');
      var lab = el('label', null, labelText);
      lab.setAttribute('for', id);
      var inp = el('input');
      inp.type = type; inp.id = id; inp.name = key; inp.required = required;
      inp.autocomplete = auto; inp.maxLength = 120; inp.value = c[key];
      if (type === 'tel') { inp.inputMode = 'tel'; inp.title = 'WhatsApp com DDD, por exemplo (12) 99999-9999'; }
      inp.addEventListener('input', function () { c[key] = inp.value; });
      wrap.appendChild(lab); wrap.appendChild(inp);
      if (hint) wrap.appendChild(el('p', 'quiz-field-hint', hint));
      form.appendChild(wrap);
      return inp;
    }

    field('fullName', 'Nome completo', 'text', 'name', true);
    var ageInp = field('age', 'Idade ou faixa etária (opcional)', 'text', 'off', false);
    field('profession', 'Profissão ou área de atuação', 'text', 'organization-title', true);
    field('cityState', 'Cidade e estado', 'text', 'address-level2', true);
    field('email', 'E-mail', 'email', 'email', true);
    field('whatsapp', 'WhatsApp com DDD', 'tel', 'tel', true);

    // Autorização específica, desmarcada por padrão, para a idade ir na mensagem do WhatsApp
    var cid = nextId('age-ok');
    var crow = el('div', 'quiz-consent');
    var consent = el('input');
    consent.type = 'checkbox'; consent.id = cid; consent.checked = c.ageInWhatsapp;
    consent.addEventListener('change', function () { c.ageInWhatsapp = consent.checked; });
    var clab = el('label', null, 'Autorizo incluir minha idade ou faixa etária na mensagem de WhatsApp.');
    clab.setAttribute('for', cid);
    crow.appendChild(consent); crow.appendChild(clab);
    form.appendChild(crow);

    var status = el('p', 'quiz-form-status');
    status.setAttribute('role', 'status');
    var submit = el('button', 'btn btn--dark', 'Enviar solicitação');
    submit.type = 'submit';
    submit.disabled = pending;
    form.appendChild(submit);
    form.appendChild(status);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      status.textContent = '';
      if (pending) { status.textContent = P.pendingNotice; return; }
      if (!form.reportValidity()) return;
      if (c.whatsapp.replace(/\D/g, '').length < 10) {
        status.textContent = 'Informe o WhatsApp com DDD, por exemplo (12) 99999-9999.';
        form.querySelector('input[name="whatsapp"]').focus();
        return;
      }

      submit.disabled = true;
      status.textContent = 'Enviando…';
      sendRequest(buildRequestPayload()).then(function (id) {
        state.requestId = id;
        go('sent');
      }, function () {
        status.textContent = P.requestError;
        submit.disabled = false;
      });
    });

    stageEl.appendChild(form);

    var bar = el('div', 'quiz-actions quiz-actions--single');
    bar.appendChild(button('Voltar', 'btn--ghost quiz-back', back));
    stageEl.appendChild(bar);
  }

  function renderSent() {
    var P = QUIZ.path;
    stageEl.appendChild(pathHeading(P.sentTitle));
    stageEl.appendChild(el('p', 'quiz-lead', P.sentText));

    var idBox = el('div', 'quiz-prices');
    var row = el('div', 'quiz-price-row');
    row.appendChild(el('span', 'quiz-row-label', 'Identificador da solicitação'));
    row.appendChild(el('strong', null, state.requestId));
    idBox.appendChild(row);
    stageEl.appendChild(idBox);

    stageEl.appendChild(linkBtn(P.whatsappLabel, whatsappRequestUrl(), 'btn--gold quiz-cta', true));
  }

  function render() {
    stageEl.textContent = '';
    stageEl.classList.remove('quiz-stage--in');
    void stageEl.offsetWidth; // reinicia a transição discreta de entrada
    stageEl.classList.add('quiz-stage--in');

    if (current === 'q1') { renderQ1(); stageEl.appendChild(actions()); }
    else if (current === 'areas') { renderAreas(); stageEl.appendChild(actions()); }
    else if (current.indexOf('a:') === 0) { renderArea(current.slice(2)); stageEl.appendChild(actions()); }
    else if (current === 'final') { renderFinal(); stageEl.appendChild(actions()); }
    else if (current === 'result') renderResult();
    else if (current === 'path') renderPath();
    else if (current === 'request') renderRequest();
    else if (current === 'sent') renderSent();

    updateProgress();
    refreshActions();
  }

  // ------------------------------------------------ Registro (preparado)
  // Estrutura para gravar a decisão comercial junto das respostas quando o banco
  // de dados existir. NADA aqui é enviado automaticamente: quem integrar deve
  // chamar window.QuizApp.getSubmission() e decidir o destino. As respostas sobre
  // vida emocional, espiritual e relacionamentos não devem ir para ferramentas de marketing.
  window.QuizApp = {
    getSubmission: function () {
      var q1 = state.q1;
      var q1Other = q1.choice === QUIZ.q1.options.length;
      return {
        momento: {
          indice: q1.choice,
          texto: q1.choice === null ? null : (q1Other ? null : QUIZ.q1.options[q1.choice]),
          outro: q1Other ? q1.other.trim() : null
        },
        areas: state.areas.map(function (id) {
          var a = state.ans[id] || { sel: [], other: '' };
          var area = areaById(id);
          var hasOther = a.sel.indexOf(area.options.length) > -1;
          return {
            id: id,
            nome: area.label,
            desafios: a.sel.filter(function (i) { return i < area.options.length; })
              .map(function (i) { return { indice: i, texto: area.options[i] }; }),
            outro: hasOther ? a.other.trim() : null
          };
        }),
        decisaoComercial: decisionId(),
        decisaoTexto: state.final === null ? null : QUIZ.final.options[state.final].label,
        modalidade: state.modality
      };
    }
  };

  if (startBtn) startBtn.addEventListener('click', start);
})();
