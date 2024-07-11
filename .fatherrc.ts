import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'dist',
    ignores: [
      'src/**/demo.tsx', // 避免打包demo.ts文件到npm包里面
      'src/**/*Data.ts', // 避免打包数据文件
    ],
  },
});
