# 多边形 MultiPolygon

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                                | 说明                          | 可选性 | 默认值     |
| :---------- | :---------------------------------------------------------------------------------- | :---------------------------- | :----- | :--------- |
| id          | string                                                                              | 图层 id，若没有会自动分配一个 | 可选   |            |
| styles      | [MultiPolygonStyleHash](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#9) | 多边形相关样式                | 可选   | {}         |
| geometries  | [PolygonGeometry[]](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#12)    | 多边形数据数组                | 可选   | []         |
| **options** | [MultiPolygonOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#8)   | 多边形配置参数(官网)          | 可选   | 官网默认值 |

**MultiPolygonOptions**
| 属性名称 | 类型 | 说明 |
| :--------- | :-------------------- | :------------------------------ |
| id | String | 图层 id，若没有会自动分配一个。 |
| map | Map | 显示多边形图层的底图。 |
| zIndex | Number | 图层绘制顺序。 |
| styles | MultiPolygonStyleHash | 多边形的相关样式。 |
| geometries | PolygonGeometry[] | 多边形数据数组。 |
:::info{title=提示}
`id styles geometries`属性在外层传入，options 中传入无效；无需传入 `map`
:::
