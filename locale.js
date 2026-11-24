export const isPortuguese = document.documentElement.lang.toLowerCase().startsWith('pt');

const portuguese = {
  'Pause motion': 'Pausar animações',
  'Motion paused': 'Animações pausadas',
  'Open navigation': 'Abrir menu de navegação',
  'Close navigation': 'Fechar menu de navegação',
  'Play background transitions': 'Retomar transições das imagens de fundo',
  'Pause background transitions': 'Pausar transições das imagens de fundo',
  'Site infrastructure': 'Infra-estruturas de sites',
  'The physical foundation: towers, mounting systems and equipment installation.': 'A base física: torres, sistemas de fixação e instalação de equipamentos.',
  'Radio & transmission': 'Rádio e transmissão',
  'The links between sites: radio systems, antennas and microwave transmission equipment.': 'As ligações entre sites: sistemas rádio, antenas e equipamentos de transmissão por micro-ondas.',
  'Fibre optic connectivity': 'Conectividade em fibra óptica',
  'The physical connections that carry information between equipment and network infrastructure.': 'As ligações físicas que transportam informação entre os equipamentos e as infra-estruturas de rede.',
  'Maintenance & support': 'Manutenção e assistência',
  'Hands-on technical assistance and field interventions that help support the connection.': 'Assistência técnica prática e intervenções no terreno que ajudam a manter a ligação.',
  'Supplied field photography': 'Fotografia de campo fornecida pela empresa',
  'Hello JAL TELECOM,': 'Olá, equipa da JAL TELECOM,',
  'I would like to discuss: ': 'Gostaria de obter informações sobre: ',
  'Contact details': 'Dados de contacto',
  'Name: ': 'Nome: ',
  'Organisation: ': 'Empresa / organização: ',
  'Email: ': 'Email: ',
  'Phone: ': 'Telefone: ',
  'Project enquiry — ': 'Pedido de informação sobre projecto — ',
  'Enquiry prepared. Review it below and choose how to send.': 'Pedido preparado. Reveja o texto abaixo e escolha como pretende enviá-lo.',
  'Enquiry copied. Paste it into your preferred messaging app.': 'Pedido copiado. Cole o texto na aplicação de mensagens que preferir.',
  'Select and copy the enquiry text using your device’s copy command.': 'Seleccione e copie o texto do pedido com a função de cópia do seu dispositivo.',
};

export const t = value => isPortuguese ? (portuguese[value] ?? value) : value;
export const photographCount = count => isPortuguese ? `${count} fotografia${count === 1 ? '' : 's'}` : `${count} photograph${count === 1 ? '' : 's'}`;

export function localizeValidation(form) {
  if (!isPortuguese) return;
  for (const field of form.querySelectorAll('input, select, textarea')) {
    const clear = () => field.setCustomValidity('');
    field.addEventListener('input', clear);
    field.addEventListener('change', clear);
    field.addEventListener('invalid', () => {
      clear();
      if (field.validity.valueMissing) {
        field.setCustomValidity(field.type === 'checkbox' ? 'Confirme que concorda em partilhar estes dados antes de continuar.' : field.tagName === 'SELECT' ? 'Seleccione um serviço.' : 'Preencha este campo.');
      } else if (field.validity.typeMismatch) {
        field.setCustomValidity('Introduza um endereço de email válido.');
      } else if (field.validity.tooShort) {
        field.setCustomValidity(`Escreva pelo menos ${field.minLength} caracteres.`);
      }
    });
  }
}

// Keep enquiry parameters and section anchors when visitors switch language.
for (const link of document.querySelectorAll('[data-language]')) {
  const destination = new URL(link.href);
  destination.search = location.search;
  destination.hash = location.hash;
  link.href = destination.href;
  link.addEventListener('click', () => {
    try { window.localStorage.setItem('jal-preferred-language', link.dataset.language); } catch {}
  });
}
