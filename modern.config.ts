import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  source: {
    enableAsyncEntry: true,
  },
  buildConfig: {
    esbuildOptions: options => {
      return options;
    },
  },
  plugins: [moduleTools()],
  buildPreset: 'npm-library',
});
