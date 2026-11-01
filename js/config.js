/* ==========================================================================
   Configuração central do site — contatos, mensagens de WhatsApp, preços e
   integração do quiz. Edite SÓ aqui.

   PENDÊNCIAS (ver relatório de entrega):
   - whatsappNumber: número que já constava no projeto; confirmar que é o oficial.
   - quiz.requestEndpoint: backend seguro ainda NÃO configurado. Enquanto estiver
     vazio, o formulário de solicitação mostra "integração pendente" e não envia nada.
   ========================================================================== */
window.SITE_CONFIG = {
  whatsappNumber: '5512997304566',
  instagramUrl: 'https://www.instagram.com/euagathavidal',

  // Mensagens pré-preenchidas (o número é sempre o mesmo):
  //  geral  = botão flutuante e ícone do rodapé (contato geral/administrativo)
  //  duvida = botão "Conversar pelo WhatsApp" da página Contato
  // A mensagem enviada após a solicitação do quiz é montada em js/quiz.js.
  whatsappMessages: {
    geral: 'Olá, Ágatha! Estou no seu site e gostaria de tirar uma dúvida.',
    duvida: 'Olá, Ágatha! Vim pela página de contato do seu site e tenho uma dúvida geral.'
  },

  // Quiz "A mentoria é para mim?" (js/quiz.js)
  quiz: {
    // --- Solicitação de mentoria (opção "Quero investir…") -----------------
    // URL HTTPS do backend que RECEBE a solicitação. Contrato esperado:
    //   POST <requestEndpoint>   Content-Type: application/json
    //   corpo: { version, contact{fullName, age, profession, cityState, email,
    //            whatsapp}, modality, whatsappMayIncludeAge, quiz{...respostas completas} }
    //   resposta de sucesso: HTTP 200/201 com JSON { "id": "<identificador da solicitação>" }
    // O site só mostra "Solicitação recebida" depois dessa confirmação do servidor.
    // Enquanto for null, nada é enviado e a tela diz que a integração está pendente.
    requestEndpoint: null,

    // --- Avisos por e-mail (cursos digitais / informações futuras) ---------
    // false = aparecem como "em breve" e NADA é coletado. Só mude para true depois
    // que existir armazenamento funcional E a função submitLead abaixo.
    leadsEnabled: false,

    // Função que grava o cadastro de avisos quando o banco de dados existir. Recebe
    // { firstName, email, consent, interest, decision } e deve devolver uma
    // Promise. As respostas do quiz (vida emocional, espiritual, relacionamentos
    // etc.) NÃO fazem parte desse pacote e não devem ir para ferramentas de marketing.
    submitLead: null
  },

  // Valores do acompanhamento individual (12 sessões). São mostrados só no quiz,
  // na etapa comercial; não há mais seção de preços nas páginas públicas.
  pricing: {
    enabled: true,
    sessions: 12,
    plans: [
      { id: 'online', name: 'Online', perSession: 'R$ 347', total: 'R$ 4.164' },
      { id: 'presencial', name: 'Presencial', perSession: 'R$ 447', total: 'R$ 5.364' }
    ]
  }
};
