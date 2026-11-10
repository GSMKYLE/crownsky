/* Shared approved assets also cover images inserted by the existing news galleries. */
(() => {
  const base = 'images/approved/';
  const replacements = {
    'hero-engineering.png': ['cctv-engineer.jpg', 'Crown Sky engineer wearing gloves and a fastened helmet chin strap'],
    'hero-infra.png': ['bonding.jpg', 'Tunnel bonding and associated electrical works'],
    'elec.png': ['switchboard.jpg', 'Crown Sky main switchboard installation'],
    'aa.png': ['busduct.jpg', 'Building services installation and electrical equipment'],
    'svc-maint.png': ['motor-test.jpg', 'Shutter motor maintenance and testing'],
    'safety.png': ['safety-monitor.jpg', 'Gloved safety inspection using a gas detection monitor'],
    'mep.png': ['cctv-engineer.jpg', 'Crown Sky engineer wearing gloves and a fastened helmet chin strap'],
    'workshop.png': ['ahu-plant.jpg', 'Air handling and ventilation equipment'],
    'plant.png': ['ahu-plant.jpg', 'Air handling and ventilation equipment'],
    'maint.png': ['cctv-engineer.jpg', 'Crown Sky engineer wearing gloves and a fastened helmet chin strap'],
    'tunnel.png': ['load-test.jpg', 'Tunnel equipment load testing'],
    'eng-team.png': ['cctv-engineer.jpg', 'Crown Sky engineer wearing gloves and a fastened helmet chin strap'],
    'detail.png': ['cctv-engineer.jpg', 'Crown Sky engineer wearing gloves and a fastened helmet chin strap'],
    'career.png': ['annual-dinner.jpg', 'Crown Sky team at the company annual dinner'],
    'corridor.png': ['annual-dinner.jpg', 'Crown Sky team at the company annual dinner'],
    'toast.png': ['office-toast.jpg', 'Reception at the Crown Sky office opening'],
    'gen_5734c89653_923491c031749afb.png': ['busduct.jpg', 'Crown Sky electrical installation'],
    'gen_a2be35c460_08a34e92f4c18628.png': ['ahu-plant.jpg', 'Air handling equipment for railway station building services'],
    'gen_54bec2570f_af50601a4d8c49e3.png': ['annual-backdrop.jpg', 'Crown Sky anniversary gala backdrop'],
    'gen_c545d13cac_5299a02c2cbcfad8.png': ['office-meeting.jpg', 'Crown Sky office meeting area'],
    '1b4755a1-09db-40f1-9175-bff22ef427ce.png': ['office-meeting.jpg', 'Crown Sky office meeting area'],
    'a0e5a73a-69b8-4d56-a9f2-b3f60810c1f8.png': ['otto-law.jpg', 'Otto Law'],
    'e2e86c11-60db-4e58-81e0-33b78af928d1.png': ['otto-law.jpg', 'Otto Law, Managing Director'],
    '71ce27b7-43bb-44a6-b559-c73566db322d.png': ['kan-leung.jpg', 'Kan Leung'],
    '1bf44496-aa49-476b-8bfc-83c4cd965901.png': ['keith-chow.jpg', 'Keith Chow'],
    '799aec1a-25ea-49db-838e-a456edd72f26.png': ['keith-chow.jpg', 'Keith Chow'],
    '5773b060-efac-4896-b8da-f0beeeaec1a3.png': ['bobo-li.jpg', 'Bobo Li'],
    'fb53067c-0efe-4a8d-87ac-62392bb36761.png': ['crown-sky-colour.png', 'Crown Sky full colour logo'],
    'e046e575-9fbe-4200-b64c-acad71927ebc.png': ['caring-construction.jpg', 'Caring Organisation in Construction'],
    'crown-sky-logo.png': ['crown-sky-colour.png', 'Crown Sky full colour logo'],
    '0727-Crown Sky ISO Logo.png': ['iso-accreditation.jpg', 'ISO 9001, ISO 14001 and ISO 45001 accreditation logos']
  };
  function approveImage(img) {
    const src = decodeURIComponent(img.getAttribute('src') || '');
    if (src.includes('/approved/')) return;
    const entry = Object.entries(replacements).find(([key]) => src.includes(key));
    if (!entry) return;
    img.src = base + entry[1][0];
    img.alt = entry[1][1];
  }
  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.matches('img')) approveImage(node);
    node.querySelectorAll('img').forEach(approveImage);
  }
  // Run before the page is painted, including images created by modal templates.
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') approveImage(record.target);
      else record.addedNodes.forEach(scan);
    }
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
  const campaigns = [
    ['caring-construction.jpg', 'Caring Organisation in Construction'],
    ['cpas.jpg', 'Construction Industry Integrity Charter 2.0'],
    ['heart-caring.jpg', 'Heart Caring Company'],
    ['heart-caring-plus.jpg', 'Heart Caring Company Plus'],
    ['joyful.jpg', 'Joyful@Healthy Workplace'],
    ['outdoor-lighting.jpg', 'Energy Saving Charter on No Incandescent Light Bulbs'],
    ['energy-saving.jpg', 'Energy Saving Charter 2026'],
    ['harmony.jpg', 'Harmony@Workplace Organisation'],
    ['mental-health.jpg', 'Mental Health Friendly Organisation'],
    ['connected.jpg', 'Connected@Workplace Organisation'],
    ['racial-diversity.jpg', 'Racial Diversity and Inclusion in the Workplace']
  ];
  document.addEventListener('DOMContentLoaded', () => {
    scan(document.documentElement);
    const iso = document.getElementById('footer-iso');
    if (iso) {
      const section = document.createElement('section');
      section.id = 'footer-campaigns';
      section.setAttribute('aria-labelledby', 'campaigns-title');
      const heading = document.createElement('h4');
      heading.id = 'campaigns-title';
      heading.className = 'campaign-logos-title';
      heading.textContent = 'Our Campaigns & Commitments';
      const grid = document.createElement('div');
      grid.className = 'campaign-logos';
      campaigns.forEach(([src, alt]) => {
        const item = document.createElement('div');
        item.className = 'campaign-logo';
        const image = document.createElement('img');
        image.src = base + src;
        image.alt = alt;
        image.loading = 'lazy';
        item.append(image);
        grid.append(item);
      });
      section.append(heading, grid);
      iso.before(section);
    }
    const whatsapp = document.querySelector('#footer-connect a[aria-label="WhatsApp"]');
    if (whatsapp) {
      whatsapp.setAttribute('aria-label', 'Instagram');
      whatsapp.innerHTML = '<i class="fa-brands fa-instagram"></i>';
    }
    const socialLinks = {
      Facebook: 'https://www.facebook.com/p/Crown-Sky-Engineering-Limited-61594954906346/',
      Instagram: 'https://www.instagram.com/crownskyhk/',
      LinkedIn: 'https://hk.linkedin.com/company/crown-sky-engineering-limited'
    };
    Object.entries(socialLinks).forEach(([name, url]) => {
      const link = document.querySelector(`#footer-connect a[aria-label="${name}"]`);
      if (!link) return;
      link.href = url;
      link.title = `Crown Sky Engineering Limited on ${name}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  });
})();
