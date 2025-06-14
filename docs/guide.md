---
title: 快速上手
---

# 快速上手

本文介绍如何在 React 项目中使用地图组件库 tlbs-map-react

## 1. 申请开发 Key

前往腾讯位置服务官网申请开发 Key。申请地址：https://lbs.qq.com/dev/console/application/mine

## 2. 安装组件库

```bash
$ npm install tlbs-map-react
```

## 3. 使用组件

```jsx | pure
// 1. 引入组件
import { MultiMarker, TMap } from 'tlbs-map-react';

// 样式
const styles = {
  multiMarkerStyle: {
    width: 20,
    height: 30,
    anchor: { x: 10, y: 30 },
  },
};

// 数据
const geometries = [
  {
    styleId: 'multiMarkerStyle',
    position: { lat: 40.0404, lng: 116.2735 },
  },
];

export default () => {
  // 获取地图实例 mapRef.current
  const mapRef = useRef(null);
  // 获取点标记图层实例 markerRef.current
  const markerRef = useRef(null);

  const clickHandler = useCallback((event: TMap.MapEvent) => {
    console.log('🚀🚀🚀 点标记图层点击事件', event);
  }, []);

  return(
    <>
      <!-- 2. 写组件标签 -->
      <TMap ref={mapRef} apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77">
        <MultiMarker
          ref={markerRef}
          styles={styles}
          geometries={geometries}
          onClick={clickHandler}
        />
      </TMap>
    </>,
  );
};
```

## 4. 注意事项

- 使用该组件前建议先浏览腾讯位置服务官网
  - [JavaScript GL API](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview)
  - [Visualization API](https://lbs.qq.com/webApi/visualizationApi/visualizationGuide/visualizationOverview)
- 在项目无需通过 script 标签引入地图资源，TMap 组件内部会自动异步加载地图资源
