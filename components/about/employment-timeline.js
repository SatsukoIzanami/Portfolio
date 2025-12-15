import { loadAboutData } from "./about-data.js";

class EmploymentTimeline extends HTMLElement {
  constructor(){ super(); }

  connectedCallback(){
    const wrap = document.createElement('div');
    wrap.className = 'timeline-wrap';
    const section = document.createElement('section');
    section.className = 'timeline-section';
    section.id = 'card';
    const h2 = document.createElement('h2');
    h2.textContent = 'Employment Timeline';
    const ul = document.createElement('ul');
    ul.id = 'timelineList';
    ul.className = 'timeline-ul';
    ul.setAttribute('aria-label','Employment timeline');

    section.append(h2, ul);
    wrap.appendChild(section);
    this.appendChild(wrap);

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.12 });
    io.observe(section);

    this._load(ul);
  }

  async _load(listEl){
    const data = await loadAboutData();
    if (!data) return;
    this._render(listEl, Array.isArray(data.timeline) ? data.timeline : []);
  }

  _render(listEl, jobs){
    listEl.textContent = '';

    jobs.forEach(j => {
      const li = document.createElement('li');
      li.className = 'timeline-li';
      li.tabIndex = 0;

      const title = document.createElement('div');
      title.className = 'timeline-title';
      // "start — end"
      const when = `${j.start || ''}${j.end ? ' — ' + j.end : ' — Present'}`;
      title.textContent = when;

      const details = document.createElement('div');
      details.className = 'timeline-details';

      const roleCo = [j.role || '', j.company || ''].filter(Boolean).join(' — ');
      if (roleCo){
        const rc = document.createElement('div');
        rc.textContent = roleCo;
        details.appendChild(rc);
      }

      if (Array.isArray(j.bullets) && j.bullets.length){
        const bullets = document.createElement('ul');
        bullets.className = 'timeline-bullets';
        j.bullets.forEach(b => {
          const liB = document.createElement('li');
          liB.textContent = String(b);
          bullets.appendChild(liB);
        });
        details.appendChild(bullets);
      }

      li.append(title, details);
      listEl.appendChild(li);
    });
  }
}
customElements.define('employment-timeline', EmploymentTimeline);
