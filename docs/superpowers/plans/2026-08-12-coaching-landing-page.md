# Landing Page de Coaching de Inteligência Emocional: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single static HTML/CSS/JS landing page selling Agatha Vidal's emotional intelligence coaching service, driving visitors to book a free intro session via WhatsApp.

**Architecture:** One `index.html` with nine sections in a fixed scroll order, one `css/style.css` for all styling (design tokens + section styles), one `js/script.js` for scroll-reveal, the ambient glow animation, and WhatsApp link construction. No framework, no build step, no backend.

**Tech Stack:** Plain HTML5, CSS3 (custom properties), vanilla JS (`IntersectionObserver`). Google Fonts: Fraunces (display) + Karla (body).

## Global Constraints

- Palette (exact hex, from spec): background cream `#FBF3E7`, peach gradient `#F7E4CC`, text dark `#4A342A`, text muted `#8A6A56`, accent terracotta `#D9714B`, glow `rgba(217,119,87,0.35)`.
- Typography: Fraunces for all headings/display text, Karla for body/UI text. Never substitute Inter or Playfair.
- No em-dashes anywhere in copy (headlines, body text, buttons, alt text). Use commas or periods instead.
- No fabricated testimonials or client quotes anywhere on the page.
- WhatsApp CTA number: `5512997304566`. Every CTA button/link on the page must point to `https://wa.me/5512997304566?text=<url-encoded message>`.
- Page must stay a single `index.html`, no multi-page routing, no CMS, no build tooling.
- Responsive down to 360px mobile width. All interactive elements need a visible `:focus-visible` outline. All CSS animation must be wrapped in `@media (prefers-reduced-motion: no-preference)`.
- Nine sections in this exact order: Hero, Credibility strip, Problem, Método, Sobre a Agatha, Como funciona, Oferta, FAQ, Final CTA + footer. No testimonials section.

---

## Task 1: Project skeleton, design tokens, base styles

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/script.js`

**Interfaces:**
- Produces: CSS custom properties `--color-bg-cream`, `--color-bg-peach`, `--color-text-dark`, `--color-text-muted`, `--color-accent`, `--color-glow`, `--font-display`, `--font-body`. Every later task's CSS must use these variables, never raw hex values.
- Produces: `index.html` `<body>` skeleton with nine empty `<section>` tags carrying the IDs `#hero`, `#credibility`, `#problem`, `#method`, `#about`, `#journey`, `#offer`, `#faq`, `#final-cta`, in that order. Later tasks fill each section's inner markup.

- [ ] **Step 1: Create `index.html` with document skeleton and empty sections**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agatha Vidal | Coaching de Inteligência Emocional</title>
  <meta name="description" content="Coaching de inteligência emocional com o método CIS (Febracis). Agende sua conversa gratuita com Agatha Vidal.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Karla:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <section id="hero"></section>
  <section id="credibility"></section>
  <section id="problem"></section>
  <section id="method"></section>
  <section id="about"></section>
  <section id="journey"></section>
  <section id="offer"></section>
  <section id="faq"></section>
  <section id="final-cta"></section>
  <script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `css/style.css` with reset and design tokens**

```css
:root {
  --color-bg-cream: #FBF3E7;
  --color-bg-peach: #F7E4CC;
  --color-text-dark: #4A342A;
  --color-text-muted: #8A6A56;
  --color-accent: #D9714B;
  --color-glow: rgba(217, 119, 87, 0.35);
  --font-display: 'Fraunces', serif;
  --font-body: 'Karla', sans-serif;
  --max-width: 1080px;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--color-bg-cream);
  color: var(--color-text-dark);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }

h1, h2, h3 {
  font-family: var(--font-display);
  line-height: 1.15;
  margin: 0 0 0.5em;
}

p { margin: 0 0 1em; }

a { color: inherit; }

section {
  padding: 64px 24px;
}

.section-inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.cta-button {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-bg-cream);
  font-family: var(--font-body);
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 52, 42, 0.2);
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #D9C3A8, transparent);
  border: none;
  margin: 0;
}

@media (max-width: 480px) {
  section { padding: 40px 20px; }
}
```

- [ ] **Step 3: Create empty `js/script.js` placeholder file**

```js
// Populated in Task 11 with scroll-reveal, glow animation, and WhatsApp link setup.
```

- [ ] **Step 4: Verify the skeleton renders**

Open `index.html` directly in a browser (double-click the file, or run a local static server). Confirm: page loads with no console errors, background is cream (`#FBF3E7`), and the Fraunces/Karla fonts network-load successfully (check DevTools Network tab for 200 responses from `fonts.gstatic.com`).

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/script.js
git commit -m "Scaffold landing page skeleton with design tokens"
```

---

## Task 2: Hero section

**Files:**
- Modify: `index.html` (fill `<section id="hero">`)
- Modify: `css/style.css` (append hero styles)

**Interfaces:**
- Consumes: `--color-bg-peach`, `--color-bg-cream`, `--color-accent`, `--color-glow`, `--font-display`, `.cta-button` from Task 1.
- Produces: `.hero-photo-frame` element (the circular photo container). Task 11 attaches the ambient glow animation to this class.
- Produces: CTA link with class `.js-whatsapp-cta`. Task 11's WhatsApp URL-building script selects all elements with this class.

- [ ] **Step 1: Fill in the hero markup**

`assets/agatha-hero.jpg` does not exist yet (flagged as an open item in the spec: Agatha still needs to supply a high-resolution photo). Use a CSS-drawn placeholder `<div>` instead of an `<img>` for now, so the page never shows a broken image icon. It needs no binary asset and is trivially swappable for a real `<img>` tag once a high-resolution photo is supplied:

```html
<section id="hero">
  <div class="section-inner hero-inner">
    <div class="hero-photo-frame">
      <div class="hero-photo hero-photo--placeholder" role="img" aria-label="Foto da Agatha Vidal (a substituir por uma foto em alta resolução)"></div>
    </div>
    <p class="eyebrow">Coaching de Inteligência Emocional</p>
    <h1>Você não precisa sentir menos. Precisa decidir melhor com o que sente.</h1>
    <p class="hero-subhead">Coaching de inteligência emocional com o método CIS (Febracis), unindo fé, neurociência e hábitos para você viver de forma mais intencional.</p>
    <a href="#" class="cta-button js-whatsapp-cta" data-message="Oi Agatha! Vi sua landing page e quero agendar minha conversa gratuita sobre coaching de inteligência emocional.">Agendar minha conversa gratuita</a>
  </div>
</section>
```

- [ ] **Step 2: Style the hero section**

```css
.hero-inner {
  text-align: center;
  padding-top: 40px;
}

#hero {
  background: linear-gradient(155deg, var(--color-bg-peach) 0%, var(--color-bg-cream) 60%);
  padding-bottom: 56px;
}

.hero-photo-frame {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 24px;
}

.hero-photo,
.hero-photo--placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-bg-cream);
  box-shadow: 0 4px 20px rgba(74, 52, 42, 0.2);
}

.hero-photo--placeholder {
  background: radial-gradient(circle at 35% 30%, #E8C3A6, #D9A184);
}

.eyebrow {
  font-family: var(--font-body);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 13px;
  color: var(--color-accent);
  margin-bottom: 12px;
}

#hero h1 {
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 500;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subhead {
  font-size: 18px;
  color: var(--color-text-muted);
  max-width: 560px;
  margin: 16px auto 32px;
}
```

- [ ] **Step 3: Verify visually**

Open `index.html` in a browser. Confirm: hero has a peach-to-cream diagonal gradient background, a circular photo placeholder is centered above the headline, headline uses Fraunces at a large size, and the CTA button is terracota-colored with rounded pill shape.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css assets/
git commit -m "Add hero section"
```

---

## Task 3: Credibility strip

**Files:**
- Modify: `index.html` (fill `<section id="credibility">`)
- Modify: `css/style.css` (append credibility styles)

**Interfaces:**
- Consumes: `--color-text-dark`, `--color-bg-cream`, `.divider` from Task 1.

- [ ] **Step 1: Fill in the credibility markup**

```html
<section id="credibility">
  <div class="section-inner credibility-inner">
    <p>Coach formada pela Febracis <span class="dot">·</span> Método de Paulo Vieira (CIS) <span class="dot">·</span> <a href="https://www.instagram.com/euagathavidal" target="_blank" rel="noopener">@euagathavidal</a></p>
  </div>
  <hr class="divider">
</section>
```

- [ ] **Step 2: Style the credibility strip**

```css
#credibility {
  padding: 20px 24px;
  background: var(--color-bg-cream);
}

.credibility-inner {
  text-align: center;
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 500;
}

.credibility-inner .dot {
  margin: 0 8px;
  color: var(--color-accent);
}

.credibility-inner a {
  color: var(--color-text-dark);
  text-decoration: underline;
}
```

- [ ] **Step 3: Verify visually**

Confirm the strip renders as a single centered line beneath the hero, with a thin horizontal divider immediately below it, and that the Instagram link is underlined and opens in a new tab.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add credibility strip"
```

---

## Task 4: Problem section

**Files:**
- Modify: `index.html` (fill `<section id="problem">`)
- Modify: `css/style.css` (append problem section styles)

- [ ] **Step 1: Fill in the problem markup**

```html
<section id="problem">
  <div class="section-inner">
    <h2>Você já fez de tudo certo e ainda se sente travada?</h2>
    <ul class="problem-list">
      <li>Reage no automático nos momentos mais importantes, e se arrepende depois.</li>
      <li>Sabe o que deveria fazer, mas a emoção decide antes da razão.</li>
      <li>Sente que já fez todo o trabalho interno e, mesmo assim, continua no mesmo lugar.</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Style the problem section**

```css
#problem h2 {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
  max-width: 640px;
  margin-bottom: 28px;
}

.problem-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
  max-width: 640px;
}

.problem-list li {
  position: relative;
  padding-left: 28px;
  font-size: 17px;
  color: var(--color-text-muted);
}

.problem-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
}
```

- [ ] **Step 3: Verify visually**

Confirm the heading reads correctly, and the three pain points display as a vertical list with small terracota dot markers, not default browser bullets.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add problem section"
```

---

## Task 5: Método section (4 pillars)

**Files:**
- Modify: `index.html` (fill `<section id="method">`)
- Modify: `css/style.css` (append method section styles)

- [ ] **Step 1: Fill in the method markup**

```html
<section id="method">
  <div class="section-inner">
    <h2>Um método que une ciência, hábito e propósito</h2>
    <div class="method-grid">
      <div class="method-card">
        <h3>Fé</h3>
        <p>Um chão espiritual que sustenta suas decisões, mesmo nos dias mais difíceis.</p>
      </div>
      <div class="method-card">
        <h3>Neurociência</h3>
        <p>Entenda o que acontece no seu cérebro antes de tentar mudar o comportamento.</p>
      </div>
      <div class="method-card">
        <h3>Hábitos</h3>
        <p>Pequenas mudanças diárias que sustentam a transformação a longo prazo.</p>
      </div>
      <div class="method-card">
        <h3>Decisão consciente</h3>
        <p>Aprenda a pausar entre o gatilho e a resposta, e a escolher com mais clareza.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the method section**

```css
#method {
  background: var(--color-bg-peach);
}

#method h2 {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
  max-width: 560px;
  margin-bottom: 32px;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.method-card {
  background: var(--color-bg-cream);
  border-radius: 16px;
  padding: 24px;
}

.method-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-accent);
}

.method-card p {
  font-size: 15px;
  color: var(--color-text-muted);
  margin: 0;
}

@media (max-width: 640px) {
  .method-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify visually**

Confirm the section has a peach background, four cream cards in a 2x2 grid on desktop that stacks to a single column below 640px width, and each card's title is terracota-colored.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add method section with four pillars"
```

---

## Task 6: Sobre a Agatha section

**Files:**
- Modify: `index.html` (fill `<section id="about">`)
- Modify: `css/style.css` (append about section styles)

- [ ] **Step 1: Fill in the about markup**

```html
<section id="about">
  <div class="section-inner about-inner">
    <div class="about-photo about-photo--placeholder" role="img" aria-label="Foto da Agatha Vidal (a substituir por uma foto em alta resolução)"></div>
    <div>
      <h2>Sobre a Agatha</h2>
      <p>Eu sou a Agatha Vidal, coach formada pela Febracis, aplicando o método de Paulo Vieira (Coaching Integral Sistêmico) nas minhas sessões. Acredito que inteligência emocional não é sentir menos, é decidir melhor.</p>
      <p>Minha missão é te ajudar a construir uma vida mais intencional, unindo fé, neurociência e hábitos no dia a dia.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the about section**

```css
.about-inner {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: center;
}

.about-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.about-photo--placeholder {
  background: radial-gradient(circle at 35% 30%, #E8C3A6, #D9A184);
}

#about h2 {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
}

#about p {
  color: var(--color-text-muted);
  font-size: 16px;
}

@media (max-width: 640px) {
  .about-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .about-photo { margin: 0 auto; }
}
```

- [ ] **Step 3: Verify visually**

Confirm a circular photo placeholder sits beside (desktop) or above (mobile, below 640px) the bio text, and the two paragraphs read as a personal, first-person bio.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add about section"
```

---

## Task 7: Como funciona section (numbered journey)

**Files:**
- Modify: `index.html` (fill `<section id="journey">`)
- Modify: `css/style.css` (append journey section styles)

- [ ] **Step 1: Fill in the journey markup**

```html
<section id="journey">
  <div class="section-inner">
    <h2>Como funciona</h2>
    <ol class="journey-list">
      <li>
        <span class="journey-number">1</span>
        <div>
          <h3>Conversa gratuita</h3>
          <p>Entendemos juntas onde você está e onde quer chegar.</p>
        </div>
      </li>
      <li>
        <span class="journey-number">2</span>
        <div>
          <h3>Diagnóstico e plano</h3>
          <p>Eu monto um plano de sessões pensado para a sua realidade.</p>
        </div>
      </li>
      <li>
        <span class="journey-number">3</span>
        <div>
          <h3>12 sessões individuais online</h3>
          <p>Acompanhamento contínuo até a transformação se sustentar sozinha.</p>
        </div>
      </li>
    </ol>
  </div>
</section>
```

- [ ] **Step 2: Style the journey section**

```css
#journey {
  background: var(--color-bg-peach);
}

#journey h2 {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
  margin-bottom: 32px;
}

.journey-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 24px;
  counter-reset: none;
}

.journey-list li {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.journey-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-bg-cream);
  font-family: var(--font-display);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.journey-list h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.journey-list p {
  color: var(--color-text-muted);
  margin: 0;
}
```

- [ ] **Step 3: Verify visually**

Confirm three numbered steps (1, 2, 3) display in order, each with a terracota circular number badge, on a peach background.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add journey section"
```

---

## Task 8: Oferta section

**Files:**
- Modify: `index.html` (fill `<section id="offer">`)
- Modify: `css/style.css` (append offer section styles)

**Interfaces:**
- Consumes: `.js-whatsapp-cta` pattern from Task 2 (repeat the same `data-message` attribute so Task 11's script wires this button too).

- [ ] **Step 1: Fill in the offer markup**

```html
<section id="offer">
  <div class="section-inner offer-inner">
    <h2>Programa de Coaching de Inteligência Emocional</h2>
    <p class="offer-detail">12 sessões individuais, 100% online</p>
    <p class="offer-price">R$ 6.000 <span>(equivalente a R$500 por sessão)</span></p>
    <a href="#" class="cta-button js-whatsapp-cta" data-message="Oi Agatha! Quero saber mais sobre o programa de 12 sessões de coaching de inteligência emocional.">Quero agendar minha conversa gratuita</a>
  </div>
</section>
```

- [ ] **Step 2: Style the offer section**

```css
.offer-inner {
  text-align: center;
  max-width: 560px;
}

#offer h2 {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
}

.offer-detail {
  font-size: 18px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.offer-price {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 28px;
}

.offer-price span {
  display: block;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: Verify visually**

Confirm the price displays prominently in terracota, with the per-session equivalent shown as a smaller muted line beneath it, and a CTA button below.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add offer section"
```

---

## Task 9: FAQ section

**Files:**
- Modify: `index.html` (fill `<section id="faq">`)
- Modify: `css/style.css` (append FAQ section styles)

- [ ] **Step 1: Fill in the FAQ markup using native `<details>`/`<summary>` (no JS required for the accordion behavior)**

```html
<section id="faq">
  <div class="section-inner">
    <h2>Perguntas frequentes</h2>
    <div class="faq-list">
      <details>
        <summary>As sessões são realmente online?</summary>
        <p>Sim, todas as sessões acontecem por videochamada, então você pode participar de onde estiver.</p>
      </details>
      <details>
        <summary>Preciso ter um problema grande para procurar coaching?</summary>
        <p>Não. A maioria das minhas clientes já está bem e sente que pode decidir e viver com mais clareza. Coaching não é para uma crise, é direção para quem já quer ir além.</p>
      </details>
      <details>
        <summary>Quanto tempo dura cada sessão?</summary>
        <p>A duração é combinada com você no início do processo, geralmente entre 50 e 60 minutos por sessão.</p>
      </details>
      <details>
        <summary>Como faço para agendar?</summary>
        <p>Basta clicar em qualquer botão desta página e me chamar no WhatsApp. Vamos combinar juntas o melhor horário para a sua conversa gratuita.</p>
      </details>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the FAQ section**

```css
.faq-list {
  display: grid;
  gap: 12px;
  max-width: 680px;
}

.faq-list details {
  background: var(--color-bg-peach);
  border-radius: 12px;
  padding: 16px 20px;
}

.faq-list summary {
  font-family: var(--font-body);
  font-weight: 700;
  cursor: pointer;
  list-style: none;
}

.faq-list summary::-webkit-details-marker {
  display: none;
}

.faq-list summary::after {
  content: '+';
  float: right;
  color: var(--color-accent);
  font-family: var(--font-display);
}

.faq-list details[open] summary::after {
  content: '−';
}

.faq-list details p {
  margin: 12px 0 0;
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: Verify visually**

Confirm four collapsed FAQ items display with a `+` marker, and clicking one expands it (switching the marker to `−`) using only native HTML behavior, no JavaScript.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add FAQ section"
```

---

## Task 10: Final CTA and footer

**Files:**
- Modify: `index.html` (fill `<section id="final-cta">`)
- Modify: `css/style.css` (append final CTA and footer styles)

**Interfaces:**
- Consumes: `.js-whatsapp-cta` pattern from Task 2/8.

- [ ] **Step 1: Fill in the final CTA and footer markup**

```html
<section id="final-cta">
  <div class="section-inner final-cta-inner">
    <h2>Pronta para decidir melhor com o que você sente?</h2>
    <a href="#" class="cta-button js-whatsapp-cta" data-message="Oi Agatha! Vi sua landing page e quero agendar minha conversa gratuita sobre coaching de inteligência emocional.">Agendar minha conversa gratuita</a>
  </div>
  <footer class="site-footer">
    <p>Agatha Vidal &middot; Coach de Inteligência Emocional &middot; <a href="https://www.instagram.com/euagathavidal" target="_blank" rel="noopener">@euagathavidal</a></p>
  </footer>
</section>
```

- [ ] **Step 2: Style the final CTA and footer**

```css
#final-cta {
  background: var(--color-text-dark);
  color: var(--color-bg-cream);
  padding-bottom: 0;
}

.final-cta-inner {
  text-align: center;
}

#final-cta h2 {
  color: var(--color-bg-cream);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
  max-width: 480px;
  margin: 0 auto 24px;
}

.site-footer {
  text-align: center;
  padding: 24px;
  font-size: 13px;
  color: #C9AF9B;
}

.site-footer a {
  color: #E8CBB0;
}
```

- [ ] **Step 3: Verify visually**

Confirm the final section has a dark brown background with cream text, a centered headline and CTA button, and a footer beneath it with the Instagram link.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add final CTA and footer"
```

---

## Task 11: JS behavior, scroll reveal, ambient glow, WhatsApp links

**Files:**
- Modify: `js/script.js` (replace placeholder content)
- Modify: `css/style.css` (append animation styles)
- Modify: `index.html` (add `data-reveal` attributes to section inner wrappers)

**Interfaces:**
- Consumes: `.js-whatsapp-cta` elements with `data-message` attributes (Tasks 2, 8, 10).
- Consumes: `.hero-photo-frame` element (Task 2).

- [ ] **Step 1: Add `data-reveal` to each `.section-inner` in `index.html`**

Add the attribute to every element with class `section-inner` across the file, e.g.:

```html
<div class="section-inner hero-inner" data-reveal>
```

Repeat for the `.section-inner` divs in `#credibility`, `#problem`, `#method`, `#about`, `#journey`, `#offer`, `#faq`, and `.final-cta-inner` in `#final-cta`.

- [ ] **Step 2: Write `js/script.js`**

```js
// Scroll reveal
const revealTargets = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// WhatsApp CTA links
const WHATSAPP_NUMBER = '5512997304566';

document.querySelectorAll('.js-whatsapp-cta').forEach((link) => {
  const message = link.dataset.message || 'Oi Agatha! Quero agendar minha conversa gratuita.';
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  link.target = '_blank';
  link.rel = 'noopener';
});
```

- [ ] **Step 3: Append reveal and glow animation CSS to `css/style.css`**

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .hero-photo-frame::before {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-glow) 0%, transparent 70%);
    animation: breathe 4s ease-in-out infinite;
    z-index: -1;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(0.92); opacity: 0.7; }
    50% { transform: scale(1.08); opacity: 1; }
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; }
}
```

- [ ] **Step 4: Verify in browser**

Reload `index.html`. Confirm: sections fade/slide into view as you scroll down, the hero photo frame has a soft pulsing terracota glow behind it, and every CTA button, when clicked, opens `https://wa.me/5512997304566?text=...` with the correct URL-encoded message (check the browser's address bar or a new tab). Then enable "reduce motion" in OS accessibility settings, reload, and confirm sections appear immediately with no fade/slide and no glow pulse.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/script.js
git commit -m "Add scroll reveal, ambient glow, and WhatsApp CTA wiring"
```

---

## Task 12: Responsive and accessibility pass

**Files:**
- Modify: `css/style.css` (add/adjust mobile breakpoints)
- Modify: `index.html` (accessibility attribute fixes if any are found)

- [ ] **Step 1: Add a global mobile breakpoint for section headings and hero type scale**

Append to `css/style.css`:

```css
@media (max-width: 480px) {
  .hero-subhead { font-size: 16px; }
  .offer-price { font-size: 26px; }
  .journey-list li { gap: 14px; }
}
```

- [ ] **Step 2: Verify responsive behavior**

Open `index.html` in a browser, open DevTools, and test at 360px, 768px, and 1280px viewport widths. Confirm: no horizontal scrollbar appears at any width, the method grid collapses to one column below 640px, the about section stacks vertically below 640px, and all text stays readable (no overlapping elements).

- [ ] **Step 3: Verify keyboard accessibility**

Tab through the entire page using only the keyboard. Confirm every link, button, and FAQ `<summary>` receives a visible terracota focus outline (from the `:focus-visible` rule in Task 1), and the tab order follows the visual top-to-bottom section order.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Responsive and accessibility fixes"
```

---

## Task 13: Final QA against spec

**Files:**
- None (verification-only task, no code changes expected unless issues are found)

- [ ] **Step 1: Full-page visual QA checklist**

Open `index.html` in a browser and confirm, in order:
1. Hero: peach-to-cream gradient, pulsing glow behind photo placeholder, Fraunces headline, terracota CTA pill button.
2. Credibility strip: Febracis / Paulo Vieira (CIS) / @euagathavidal, single centered line.
3. Problem: three pain points with terracota dot markers.
4. Método: four cards (Fé, Neurociência, Hábitos, Decisão consciente) on peach background.
5. Sobre a Agatha: photo placeholder + two-paragraph first-person bio.
6. Como funciona: three numbered steps in order (1, 2, 3).
7. Oferta: R$ 6.000 / 12 sessões / R$500 per session equivalent, CTA button.
8. FAQ: four expandable questions, native accordion behavior.
9. Final CTA + footer: dark brown background, CTA button, Instagram link.
10. No testimonials section anywhere on the page.

- [ ] **Step 2: Copy QA, search for forbidden characters**

Run a search across `index.html` for em-dashes:

```bash
grep -n "—" index.html
```

Expected: no matches. If any are found, replace them with commas or periods and re-run.

- [ ] **Step 3: Confirm every CTA points to the correct WhatsApp number**

```bash
grep -n "js-whatsapp-cta" index.html
```

Expected: exactly 3 matches (hero, offer, final CTA), each with a `data-message` attribute and no hardcoded `href` other than `#` (the real `href` is set by `js/script.js` at runtime).

- [ ] **Step 4: Record open items for the user**

Confirm the following are still open (per the spec) and communicate them back to Agatha rather than guessing at resolutions:
- Hero and about-section photos are CSS placeholders; a high-resolution photo needs to be supplied and swapped in (`assets/agatha-hero.jpg` plus updating the `.hero-photo-frame` and `.about-photo` markup to use an `<img>` instead of the placeholder `<div>`).
- Hosting/deployment target is not yet chosen (spec listed this as undecided).

- [ ] **Step 5: Commit any fixes found during QA**

```bash
git add -A
git commit -m "Final QA fixes"
```
