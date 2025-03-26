# 椭圆 MultiEllipse

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                                                                                                                  | 说明                          | 可选性 | 默认值     |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :----- | :--------- |
| id          | string                                                                                                                                                                | 图层 id，若没有会自动分配一个 | 可选   |            |
| styles      | [MultiEllipseStyleHash](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#MultiEllipseStyleHash)                                                               | 椭圆相关样式                  | 可选   | {}         |
| geometries  | [EllipseGeometry[]](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#EllipseGeometry)                                                                         | 椭圆数据数组                  | 可选   | []         |
| **options** | [Omit<TMap.MultiEllipseOptions, 'map' &#124; 'id' &#124; 'styles' &#124; 'geometries'>](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#MultiEllipseOptions) | 椭圆配置参数(官网)            | 可选   | 官网默认值 |

**MultiEllipseOptions**
| 属性名称 | 类型 | 说明 |
| :--------- | :-------------------- | :------------------------------ |
| id | String | 图层 id，若没有会自动分配一个。 |
| map | Map | 显示椭圆图层的底图。 |
| zIndex | Number | 图层绘制顺序。 |
| styles | MultiEllipseStyleHash | 椭圆的相关样式。 |
| geometries | PolygonGeometry[] | 椭圆数据数组。 |
