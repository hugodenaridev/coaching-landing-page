/* ==========================================================================
   Configuração central do site — contatos, mensagens de WhatsApp e preços.
   Edite SÓ aqui: o script.js monta os links e os cards de investimento a
   partir destes dados.

   PENDÊNCIAS DE CONFIRMAÇÃO (ver relatório de entrega):
   - whatsappNumber: número que já constava no projeto; confirmar que é o oficial.
   - pricing: valores e condições copiados do site anterior; confirmar antes de
     divulgar de forma definitiva.
   ========================================================================== */
window.SITE_CONFIG = {
  whatsappNumber: '5512997304566',
  instagramUrl: 'https://www.instagram.com/euagathavidal',

  whatsappMessages: {
    geral: 'Olá, Ágatha! Conheci sua mentoria pelo site e gostaria de saber como funciona o acompanhamento individual.',
    presencial: 'Olá, Ágatha! Conheci sua mentoria pelo site e gostaria de saber mais sobre o acompanhamento presencial.',
    online: 'Olá, Ágatha! Conheci sua mentoria pelo site e gostaria de saber mais sobre o acompanhamento online.'
  },

  pricing: {
    // true  = mostra os dois cards de investimento na página Mentoria.
    // false = mostra o bloco discreto "Conheça as modalidades da mentoria"
    //         (a estrutura abaixo continua guardada, pronta para reativar).
    enabled: true,

    plans: [
      {
        id: 'presencial',
        name: 'Presencial',
        sessions: '12 sessões de 1h30.',
        perSession: 'R$ 600',
        total: 'R$ 7.200',
        cash: 'R$ 6.840',
        installments: 'até 12 vezes, sujeito às condições de pagamento.',
        cta: 'Quero saber mais sobre a mentoria presencial',
        message: 'presencial'
      },
      {
        id: 'online',
        name: 'Online',
        sessions: '12 sessões de 1h30.',
        perSession: 'R$ 545',
        total: 'R$ 6.540',
        cash: 'R$ 6.213',
        installments: 'até 12 vezes, sujeito às condições de pagamento.',
        cta: 'Quero saber mais sobre a mentoria online',
        message: 'online'
      }
    ]
  }
};
