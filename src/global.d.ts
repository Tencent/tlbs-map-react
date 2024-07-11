// 全局类型声明文件
// 引入 TMap 类型包
import MapTypes from 'tmap-gl-types';

declare global {
  interface Window {
    TMap: typeof MapTypes | {};
    initGLMap: () => void;
  }
}
