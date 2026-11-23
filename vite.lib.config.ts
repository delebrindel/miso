import { defineConfig } from 'vite';

// Library build for npm. Output is ESM in dist/; React stays external so
// consumers use their own copy. Types are emitted separately by tsconfig.build.json.
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [/^react(\/|$)/, /^react-dom(\/|$)/],
    },
  },
});
