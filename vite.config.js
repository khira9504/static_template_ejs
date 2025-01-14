import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteEjsPlugin } from "vite-plugin-ejs";
import appendHeadScriptsAtBody from "./appendHeadScriptsAtBody";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    return {
      base: "./", 
      root: './src',
      build: {
        outDir: '../dist',
      },
      plugins: [
        ViteEjsPlugin(),
      ],
    }
  } else {
    return {
      base: "./", 
      root: './src',
      build: {
        outDir: '../dist',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'src/index.html'),
            page: resolve(__dirname, 'src/page.html'),
          },
        },
      },
      plugins: [
        appendHeadScriptsAtBody(),
        ViteEjsPlugin(),
      ],
    }
  }
});