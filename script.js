// Mobile nav toggle & simple enhancements
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav){
  navToggle.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  primaryNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (primaryNav.classList.contains('open')){
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const y = document.getElementById('year');
if (y){ y.textContent = new Date().getFullYear(); }

(function loadProjects(){
  const dataEl = document.getElementById('projects-data');
  const grid = document.getElementById('projectGrid');
  if(!dataEl || !grid) return;
  try{
    const data = JSON.parse(dataEl.textContent.trim());
    (data.projects || []).forEach(p => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p class="muted">${p.description}</p>
        <div class="card-actions">
          ${p.github ? `<a class="btn" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
          ${p.demo ? `<a class="btn primary" href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });
  }catch(e){
    console.warn('Failed to parse projects JSON', e);
  }
})();