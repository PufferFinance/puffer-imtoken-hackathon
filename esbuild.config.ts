import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/index.js',
  // When using the `packages: 'external'` option, esbuild will not
  // bundle the dependencies. So we need to `pnpm install --prod` for
  // build to work.
  packages: 'external',
  target: 'node20',
  loader: {
    // These come from Sentry for node profiling.
    '.node': 'copy',
  },
});
