// components/nav/nav-bar.js
class AppNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const root = this.shadowRoot;

        // style
        const style = document.createElement('style');
        style.textContent = `
            :host { --nav-h: calc(56px + env(safe-area-inset-top)); }

            /* make the nav bar visible + sticky */
            header {
                position: sticky;
                top: 0;
                z-index: 50;
                border-bottom: 1px solid var(--border, #1a2440);
                background: linear-gradient(180deg, var(--surface, #0f172a), var(--elev, #111a2e));
            }

            /* layout wrapper */
            .wrap {
                max-width: 1100px;
                margin: 0 auto;
                padding: 12px 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }

            /* brand link */
                .brand {
                display:flex; align-items:center; gap:10px;
                font-weight:600; letter-spacing:.2px; color:var(--text, #e5e7eb);
                text-decoration:none;
            }

            /* the primary <nav> contains anchors directly */
            nav {
                display:flex; align-items:center; gap:14px;
            }

            nav a {
                color: var(--text, #e5e7eb);
                text-decoration:none;
                padding:8px 10px;
                border-radius:10px;
                border:1px solid transparent;
            }

            nav a:hover { border-color:#2a4478; }

            /* set .active in JS → style it */
            nav a.active { border-color:#25355c; background:#0a1224; }

            /* burger button */
            .burger {
                display:none;
                border:1px solid var(--border, #1a2440);
                background:#0a1224;
                color:var(--text, #e5e7eb);
                border-radius: 10px;
                padding:8px 10px;
                cursor:pointer;
            }

            .burger .lines {
                display:inline-block; width:18px; height:2px; background: currentColor;
                box-shadow: 0 6px 0 currentColor, 0 -6px 0 currentColor;
            }

            /* mobile sheet + panel */
            .sheet {
                position: fixed; inset: 0; display: none;
                background: rgba(0,0,0,.45);
            }

            .sheet.show { display:block; }

            .panel {
                position: absolute; right: 0; top: 0;
                top: var(--nav-h);
                height: calc(100% - var(--nav-h));
                width: 260px; height: 100%;
                background: linear-gradient(180deg, var(--surface, #0f172a), var(--elev, #111a2e));
                border-left: 1px solid var(--border, #1a2440);
                padding: 16px;
                display:flex; flex-direction:column; gap:10px;
            }

            .panel a {
                color: var(--text, #e5e7eb);
                text-decoration:none;
                padding:10px 12px;
                border-radius:10px; border:1px solid transparent;
            }

            .panel a.active { border-color:#25355c; background:#0a1224; }

            @media (max-width: 720px){
                .burger { display:inline-flex; align-items:center; }
                nav { display: none; }
            }
        `;

        // DOM
        const header = document.createElement('header');

        const wrap = document.createElement('div');
        wrap.className = 'wrap';

        const brand = document.createElement('a');
        brand.className = 'brand';
        brand.href = 'index.html';
        brand.textContent = 'JL • Portfolio';

        // Primary nav
        const nav = document.createElement('nav');
        nav.setAttribute('aria-label', 'Primary');

        const links = [
            { href: 'index.html', file: 'index.html', text: 'Home' },
            { href: 'projects.html', file: 'projects.html', text: 'Projects' },
            { href: 'about.html', file: 'about.html', text: 'About' },
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
        burger.className = 'burger';
        burger.setAttribute('aria-label', 'Menu');
        burger.setAttribute('aria-expanded', 'false');
        const lines = document.createElement('span');
        lines.className = 'lines';
        burger.appendChild(lines);

        wrap.append(brand, nav, burger);
        header.appendChild(wrap);

        // Sheet overlay + panel (mobile)
        const sheet = document.createElement('div');
        sheet.className = 'sheet';
        sheet.setAttribute('aria-hidden', 'true');

        const panel = document.createElement('div');
        panel.className = 'panel';
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

        // Mount into shadow root
        root.append(style, header, sheet);

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
