import { defineConfig } from 'vite';
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const jsFiles = Object.fromEntries(
  globSync('src/**/*.ts', { ignore: ['node_modules/**','**/modules/**','**/dist/**']}).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const cssFiles = Object.fromEntries(
  globSync('src/assets/styles/**/*.css', { ignore: ['node_modules/**','**/modules/**','**/dist/**'] }).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const htmlFiles = Object.fromEntries(
  globSync('src/**/*.html', { ignore: ['node_modules/**', '**/dist/**'] }).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const inputObject = { ...jsFiles, ...cssFiles, ...htmlFiles };

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: inputObject,
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetInfo.name)) {
            return 'img/[name].[ext]';
          }
          if (/\.css$/.test(assetInfo.name)) {
            console.log("ok");
            return '[name].css';
          }
          return '[name].[ext]';
        },
      },
    },
  },
  plugins: [
    ViteEjsPlugin(),
  ],
});