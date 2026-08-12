# Landing page de coaching de inteligência emocional — Agatha Vidal

## Objetivo

Página única (single page) para vender o serviço de coaching de inteligência emocional da Agatha. Objetivo de conversão: levar a visitante a agendar uma conversa gratuita pelo WhatsApp.

## Contexto e fatos do negócio

- Nicho: coaching de inteligência emocional.
- Credencial: coach formada pela Febracis, aplica o método de Paulo Vieira (Coaching Integral Sistêmico / CIS) nas sessões. Essa credencial é um forte sinal de autoridade no mercado brasileiro de coaching e deve aparecer perto do topo da página.
- Instagram de referência: [@euagathavidal](https://www.instagram.com/euagathavidal). Bio atual: "Construa uma vida intencional! Transforme sua forma de pensar, escolher e viver. Fé • Neurociência • Hábitos". O tom da landing page segue essa mesma voz — inteligência emocional é a oferta específica dentro desse universo, não uma marca nova e desconectada.
- Oferta: 12 sessões individuais online, R$ 6.000 (equivalente a ~R$ 500/sessão).
- Sem depoimentos de clientes disponíveis ainda. A seção de prova social não deve inventar nenhum depoimento; a credencial Febracis/Paulo Vieira faz esse papel por enquanto.
- Número de WhatsApp para o CTA: 5512997304566.
- Hospedagem ainda não definida — o site deve ser construído como projeto estático independente, fácil de publicar depois em qualquer serviço (Vercel, Netlify, GitHub Pages etc.).

## Pesquisa de mercado (validação da estrutura)

Comparado com landing pages de referência (Tony Robbins, BetterUp, benchmarks de sales page de coaches solo) e guias de UX de 2026. Conclusões aplicadas:
- Prova social/credibilidade deve vir logo após o hero, não escondida no meio da página.
- Hero deve vender a transformação, não o serviço em si.
- Problema deve ser nomeado com as palavras do público-alvo, logo após a credibilidade.
- Página deve ter um caminho único (uma oferta, um CTA principal), diferente de players com catálogo grande de produtos (que usam múltiplos caminhos segmentados) — não se aplica aqui, pois a oferta é única.

## Sistema visual — conceito "Manhã Intencional"

Aprovado via comparação visual com o conceito alternativo "Bússola Interior".

**Paleta:**
- Base creme: `#FBF3E7`
- Topo em gradiente pêssego: `#F7E4CC`
- Texto/títulos (marrom quente escuro): `#4A342A`
- Texto secundário (marrom acastanhado): `#8A6A56`
- Acento terracota (CTA, links): `#D9714B`
- Glow suave (uso pontual): `rgba(217,119,87,0.35)`

**Tipografia:**
- Display: Fraunces (serifa quente com personalidade, usada com moderação nos títulos)
- Corpo: Karla (sans humanista, legível)
- Evitar o par padrão "serifa genérica + Inter", que é o visual clichê de páginas geradas por IA hoje.

**Elemento de assinatura:** glow suave "respirando" atrás do retrato da Agatha (pulsação lenta via CSS, respeita `prefers-reduced-motion`), e divisórias entre seções em gradiente suave (linha do horizonte) no lugar de bordas retas.

**Movimento:** discreto — fade-in no carregamento do hero, reveal ao rolar a página, hover states nos CTAs. Sem excesso de animação.

## Estrutura da página (aprovada)

1. **Hero** — retrato, headline focada em transformação, subheadline (inteligência emocional + método CIS/Febracis), CTA primário para WhatsApp.
2. **Faixa de credibilidade** — Febracis · método Paulo Vieira (CIS) · @euagathavidal.
3. **O problema** — empatia, dores nomeadas com a voz do público (reagir no automático, decisões travadas pela emoção, sensação de "fazer tudo certo" e continuar preso).
4. **O método** — 4 pilares no estilo da bio do Instagram: Fé · Neurociência · Hábitos · Decisão consciente.
5. **Sobre a Agatha** — bio curta, pessoal, credenciais, foto.
6. **Como funciona** — jornada numerada (sequência real, por isso a numeração é justificada): conversa gratuita → diagnóstico e plano → 12 sessões individuais online.
7. **Oferta** — 12 sessões individuais online, R$ 6.000, CTA novamente.
8. **Perguntas frequentes** — funciona online? preciso ter um "problema grande"? quanto tempo dura? como agendo?
9. **CTA final + rodapé** — WhatsApp CTA repetido, link do Instagram.

Seção de depoimentos **intencionalmente omitida** por enquanto — o layout deve ficar fácil de encaixar essa seção depois, quando houver depoimentos reais.

## Abordagem técnica

- Site estático: `index.html` + `styles.css` + JS mínimo (scroll-reveal, animação do glow, montagem do link do WhatsApp).
- Sem framework ou build step — HTML/CSS/JS puro, fácil de hospedar em qualquer lugar depois.
- CTA do WhatsApp: `https://wa.me/5512997304566?text=<mensagem pré-preenchida, URL-encoded>`.
- Responsivo até mobile, foco de teclado visível, `prefers-reduced-motion` respeitado.
- Foto do hero: a miniatura baixada do Instagram (150x150) está guardada apenas como referência em `.superpowers/brainstorm/`, não deve ser usada como asset final — está em baixa resolução.

## Fora de escopo

- Sem backend ou sistema de agendamento além do link direto do WhatsApp.
- Sem CMS ou site multi-página.
- Sem depoimentos (até serem fornecidos).
- Sem configuração de SEO/analytics (pode ser um passo futuro).

## Pendências antes da construção final

- Foto(s) em resolução mais alta da Agatha (o hero precisa de uma imagem melhor que a miniatura do Instagram).
- Texto exato da mensagem pré-preenchida do WhatsApp — será definido na etapa de copywriting.
