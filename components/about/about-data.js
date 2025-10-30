// components/about/about-data.js

export async function loadAboutData() {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const isRender = window.location.hostname.includes('onrender.com');

    const aboutUrl = isGitHubPages
        ? 'https://portfolio-awnu.onrender.com/data/about.json'
        : isRender
        ? '/data/about.json'
        : 'http://localhost:2000/data/about.json';

    try {
        const response = await fetch(aboutUrl, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error('Failed to load about.json:', err);
        return null;
    }
}
