import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        sourcemap: true,
        minify: false,
        lib: {
            name: 'CrawlKit',
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'crawl-kit'
        }
    },
    preview: {
        cors: true,
        port: 4173
    }
});
