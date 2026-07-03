import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: () => 'crawl-kit.js'
        },
        sourcemap: true,
        minify: false
    },
    server: {
        cors: true
    }
});