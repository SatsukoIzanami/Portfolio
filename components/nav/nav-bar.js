// components/nav/nav-bar.js
class AppNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // DOM
        const header = document.createElement('header');

        const wrap = document.createElement('div');
        wrap.className = 'nav-wrap';

        const brand = document.createElement('a');
        brand.className = 'nav-brand';
        brand.href = 'index.html';
        brand.textContent = 'JL • Portfolio';

        // Primary nav
        const nav = document.createElement('nav');
        nav.setAttribute('aria-label', 'Primary');

        const links = [
            { href: 'index.html', file: 'index.html', text: 'Home' },
            { href: 'projects.html', file: 'projects.html', text: 'Projects' },
            { href: 'about.html', file: 'about.html', text: 'About' },
            { href: 'fun.html', file: 'fun.html', text: 'Fun' },
            { href: 'contact.html', file: 'contact.html', text: 'Contact' },
        ];

        const navAnchors = links.map(({ href, file, text }) => {
            const a = document.createElement('a');
            a.href = href;
            a.dataset.file = file;
            a.textContent = text;
            return a;
        });

        nav.append(...navAnchors);

        // Burger button
        const burger = document.createElement('button');
        burger.className = 'nav-burger';
        burger.setAttribute('aria-label', 'Menu');
        burger.setAttribute('aria-expanded', 'false');
        const lines = document.createElement('span');
        lines.className = 'nav-lines';
        burger.appendChild(lines);

        wrap.append(brand, nav, burger);
        header.appendChild(wrap);

        // Sheet overlay + panel (mobile)
        const sheet = document.createElement('div');
        sheet.className = 'nav-sheet';
        sheet.setAttribute('aria-hidden', 'true');

        const panel = document.createElement('div');
        panel.className = 'nav-panel';
        panel.setAttribute('role', 'menu');

        const panelAnchors = links.map(({ href, file, text }) => {
            const a = document.createElement('a');
            a.href = href;
            a.dataset.file = file;
            a.textContent = text;
            a.setAttribute('role', 'menuitem');
            return a;
        });
        panel.append(...panelAnchors);
        sheet.appendChild(panel);

        // Mount into component
        this.appendChild(header);
        this.appendChild(sheet);

        // ----- Behavior -----
        const currentFile = () => {
            const tail = location.pathname.split('/').pop();
            return tail && tail.length ? tail : 'index.html';
        };

        const setActive = () => {
            const file = currentFile();
            [...navAnchors, ...panelAnchors].forEach(a => {
              a.classList.toggle('active', a.dataset.file === file);
            });
        };
        setActive();

        const close = () => {
            sheet.classList.remove('show');
            burger.setAttribute('aria-expanded', 'false');
        };
        const open = () => {
            sheet.classList.add('show');
            burger.setAttribute('aria-expanded', 'true');
        };
        burger.addEventListener('click', () => {
            sheet.classList.contains('show') ? close() : open();
        });

        // Click outside the panel closes
        sheet.addEventListener('click', (e) => { if (e.target === sheet) close(); });
        // Clicking a link closes
        panelAnchors.forEach(a => a.addEventListener('click', close));
        // Escape closes
        this.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });                    
    }
}

customElements.define('app-nav', AppNav);
