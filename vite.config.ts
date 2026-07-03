import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        sourcemap: true,
        minify: false,
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: () => 'crawl-kit.js'
        }
    },
    preview: {
        cors: true,
        port: 4173
    }
});
