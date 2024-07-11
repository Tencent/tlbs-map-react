# tlbs-map-react

基于 [腾讯位置服务 JavaScript API](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview) 封装的 React 版地图组件库。

# 🎉 特性

- 封装腾讯地图 API 为响应式组件，无需关心复杂的地图 API，只需要修改数据就能改变地图效果
- 扩展性高，提供了地图和图层实例支持调用地图 api

# 安装

```bash
$ npm install tlbs-map-react
```

# 使用

组件库使用文档参考：https://mapapi.qq.com/web/tlbs-map-react/

```jsx
// 1. 引入组件
import { TMap } from 'tlbs-map-react';

export default () => {
  // 获取地图实例 mapRef.current
  const mapRef = useRef(null);

  return(
    <>
      <!-- 2. 写组件标签 -->
      <TMap
        ref={mapRef}
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
      >
      </TMap>
    </>
  );
};
```

# 参与贡献

欢迎任何愿意参与贡献的参与者。如果需要本地运行代码或参与贡献，请先阅读[参与贡献](./CONTRIBUTING.md)。

# 开源协议

tlbs-map-react 遵循 [MIT 协议](./LICENSE)。
