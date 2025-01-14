import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteEjsPlugin } from "vite-plugin-ejs";
// import appendHeadScriptsAtBody from "./appendHeadScriptsAtBody";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    return {
      base: "./", 
      root: './src',
      build: {
        outDir: '../dist',
        emptyOutDir: true,
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
        emptyOutDir: true,
        assetsInlineLimit: 0,
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              let extType = assetInfo.name.split('.')[1];
              if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
                extType = 'fonts';
              }
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                extType = 'images';
              }
              if(extType === 'css') {
                return `assets/css/style.css`;
              }
              return `assets/${extType}/[name][extname]`;
            },
            chunkFileNames: 'assets/js/[name].js',
            entryFileNames: 'assets/js/[name].js',
          },
          input: {
            main: resolve(__dirname, 'src/index.html'),
            page: resolve(__dirname, 'src/page.html'),
          },
        },
      },
      plugins: [
        // appendHeadScriptsAtBody(),
        ViteEjsPlugin(),
      ],
    }
  }
});