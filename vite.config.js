import { defineConfig } from 'vite';

// Detect GitHub Pages build by environment variable
const isGitHubPages = process.env.BUILD_TARGET === 'github';

export default defineConfig({
    base: isGitHubPages ? '/Portfolio/' : '/',   //root locally, subpath on GH Pages
    server: {
        port: 5173,
        open: true,
        proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true
        }
        }
    },
    build: {
        outDir: 'docs',
        emptyOutDir: true
    }
});