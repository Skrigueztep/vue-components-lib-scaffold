import path from "path";
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

module.exports = defineConfig({
  plugins: [
    vue()
  ],
  // Esto es para que pueda resolver los alias de vue
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/entry.esm.ts'),
      name: 'Example',
      fileName: (format) => `example.${format}.js`,
      formats: ['es', 'cjs', 'umd', 'iife']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
