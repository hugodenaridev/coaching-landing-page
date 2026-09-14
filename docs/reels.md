# Reels em destaque na landing page

A seção `#reels` do `index.html` não é automática: os três reels são fixos no HTML.
Este documento registra quais estão lá, por que, e como trocar.

## Reels atuais

Escolhidos por engajamento, medido em 11/09/2026 sobre os 12 reels visíveis no
perfil público:

| Reel | Curtidas | Comentários | Data | Tema |
|---|---|---|---|---|
| [`DdEmNSosbtA`](https://www.instagram.com/reel/DdEmNSosbtA/) | 2.286 | 13 | 09/09/2026 | Crenças limitantes — a história do Wayne |
| [`DcwkWg1Ra-m`](https://www.instagram.com/reel/DcwkWg1Ra-m/) | 1.338 | 16 | 01/09/2026 | Neuroplasticidade e falar em público |
| [`DcmIriLw_rb`](https://www.instagram.com/reel/DcmIriLw_rb/) | 758 | 26 | 28/08/2026 | A batalha da mente — medo, ansiedade, distração |

A separação é confortável: o quarto colocado tem 77 curtidas, então esses três
lideram com folga e a escolha não é sensível a pequenas variações.

**Views não entraram no critério.** O Instagram não expõe contagem de views nas
meta tags públicas — só curtidas e comentários. Para ranquear por views seria
preciso a API (ver "Automatizar" abaixo) ou olhar manualmente no app.

## Por que cards próprios em vez do embed oficial

- Três embeds seriam três `<iframe>` de terceiros carregando na página.
- O embed não é estilizável: entra com a cara do Instagram, não com a da marca.
- Removido o `embed.js`, a página não depende mais de script externo nenhum.

## Como trocar os reels

Para cada reel novo:

1. Pegue o código do permalink: `instagram.com/reel/<CÓDIGO>/`.
2. Baixe a miniatura — ela está na meta tag `og:image` da página do reel:

   ```bash
   curl -s -A "facebookexternalhit/1.1" https://www.instagram.com/reel/<CÓDIGO>/ \
     | grep -o '<meta property="og:image" content="[^"]*"'
   ```

   Salve o JPEG em `assets/reels/<CÓDIGO>.jpg`.

   > A URL do CDN (`scontent.cdninstagram.com`) é assinada e expira em poucos
   > dias. Por isso a imagem é baixada e versionada no repositório em vez de
   > linkada direto — linkar faria a seção quebrar sozinha depois de um tempo.

3. No `index.html`, atualize o `.reel-card`: `href`, `src` e `alt` da imagem, e o
   texto do `.reel-hook`.
4. Apague o JPEG antigo de `assets/reels/`.

O gancho (`.reel-hook`) é um trecho curto da legenda do próprio reel — mantenha
assim, é a voz dela e não uma promessa inventada.

## Automatizar (ainda não feito)

Para a seção se atualizar sozinha seria necessário:

- Conta **Profissional** (Criador ou Empresarial) — conta pessoal não acessa a API.
- App no Meta for Developers e token de longa duração (60 dias).
- Um workflow do GitHub Actions rodando 1×/dia: chama `GET /me/media`, grava os
  três primeiros num JSON, commita, e o Pages republica.

O token fica em GitHub Secrets, nunca no JavaScript da página — numa página
pública ele seria visível para qualquer pessoa no DevTools.

**O ponto que costuma quebrar:** o token expira em 60 dias. Se o mesmo workflow
não renovar a cada execução, a seção para de atualizar em silêncio. Qualquer
implementação precisa incluir a renovação, não só a leitura.
