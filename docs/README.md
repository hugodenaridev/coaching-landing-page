# Documentação interna — site Ágatha Vidal

Fatos **oficiais e vigentes** do projeto (atualizado em 02/11/2026). Em caso de conflito com qualquer outro
documento desta pasta, vale este arquivo.

## Posicionamento

- Marca: **Ágatha Vidal** — desenvolvimento pessoal e **mentoria individual**.
- Posicionamento: "Ajudo pessoas inteligentes a saírem do automático e colocarem seus planos em prática."
- Assinatura: "Se leva a sério."
- Público: homens e mulheres adultos que querem evoluir pessoal ou profissionalmente.

## Oferta e valores oficiais

Acompanhamento individual de **12 encontros** de aproximadamente 1h30 (podem se estender pontualmente até 2 horas),
semanais ou quinzenais, **online** (de qualquer lugar do mundo) ou **presencial em São José dos Campos (SP)**,
conforme a disponibilidade.

| Modalidade | Por sessão | 12 sessões |
|---|---|---|
| Online | R$ 347 | R$ 4.164 |
| Presencial em São José dos Campos | R$ 447 | R$ 5.364 |

- Fonte única no código: `js/config.js` (`pricing`). Os valores só aparecem no quiz, na etapa comercial.
- **Não** há desconto à vista nem parcelamento aprovados: formas de pagamento e condições são apresentadas antes da
  contratação, após a confirmação de disponibilidade. Não prometer nem divulgar condições não aprovadas.
- Valores de versões anteriores do site estão **obsoletos**; não reutilizar.

## Credenciais (somente o que está confirmado)

- Engenharia pela **UNIFEI**.
- **MBA em Marketing Digital** pela Conquer Business School.
- Mais de cinco anos na **Unilever** (liderança de equipes, planejamento, indicadores, gestão de projetos e melhoria de processos).
- Formação em coaching pela **Febracis**.
- **Estuda** comportamento humano, hábitos e neurociência aplicada ao comportamento.

**Não afirmar:** pós-graduação ou especialização (concluída) em Neurociência; psicologia ou atuação clínica;
"aplicação de método de terceiros" nas sessões; resultados, números de clientes ou tempo de atuação como coach.
Depoimentos de clientes só com autorização e depois de existirem.

## Jornada de contratação (site atual)

1. Quiz **"A mentoria é para mim?"** (`quiz.html`): perguntas → resultado personalizado → pergunta de qualificação
   financeira (faixa de investimento) → valores exatos → decisão.
2. Opção "quero investir": escolha da modalidade → **solicitação** (formulário) → confirmação do servidor →
   botão que abre o WhatsApp com mensagem pronta (a pessoa confirma o envio no aplicativo).
3. Disponibilidade de agenda e próximos passos são informados à pessoa **depois** da solicitação.
4. O botão de WhatsApp do site é para **dúvidas gerais**; não substitui o quiz para quem quer contratar.

## Estado das integrações

| Item | Estado |
|---|---|
| Backend / banco de dados | **Não existe.** `quiz.requestEndpoint = null`: a solicitação mostra "integração pendente" e não envia nada. |
| Cadastros de aviso (cursos digitais / informações futuras) | Desligados (`quiz.leadsEnabled = false`). |
| E-mail, contrato, assinatura eletrônica, pagamento | Não implementados. |
| Política de Privacidade | Versão informativa; **requer revisão jurídica** antes de ligar qualquer coleta. |

## Documentos históricos nesta pasta

`superpowers/specs/2026-08-12-coaching-landing-page-design.md` e `superpowers/plans/2026-08-12-coaching-landing-page.md`
descrevem a **primeira versão** (página única, "coaching de inteligência emocional"). Foram mantidos como registro
e tiveram as informações comerciais e profissionais corrigidas; a estrutura e o texto de marca ali descritos
**não** representam o site atual.
