import dotenv from 'dotenv';
import { Plugin } from 'vite';

export default function generateEnvPlugin(): Plugin {
  let isBuild = false;
  const env = dotenv.config().parsed || {};
  const contentScript = `window.__ENV__=${JSON.stringify(env)};`;
  let generatedFileName = 'generated-env.js';

  return {
    name: 'generate-env',
    config(_, { command }) {
      isBuild = command === 'build';
    },
    generateBundle() {
      // Generate random file name for env js (8 chars, base36)
      const randomStr = Math.random().toString(36).substring(2, 10);
      generatedFileName = `${randomStr}.js`;
      this.emitFile({
        type: 'asset',
        fileName: generatedFileName,
        source: contentScript,
      });
    },
    transformIndexHtml(html) {
      if (!isBuild) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              children: contentScript,
              injectTo: 'head',
            },
          ],
        };
      }
      const timestamp = Date.now();
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              src: `generated-env.js?v=${timestamp}`,
            },
            injectTo: 'body',
          },
        ],
      };
    },
  };
}
