# 点标记 MultiMarker

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                               | 说明                          | 可选性 | 默认值     |
| :---------- | :--------------------------------------------------------------------------------- | :---------------------------- | :----- | :--------- |
| id          | string                                                                             | 图层 id，若没有会自动分配一个 | 可选   |            |
| styles      | [MultiMarkerStyleHash](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker#4) | 点标记的相关样式              | 可选   | {}         |
| geometries  | [PointGeometry[]](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker#7)      | 点标记数据数组                | 可选   | []         |
| **options** | [MultiMarkerOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker#2)   | 点标记配置参数(官网)          | 可选   | 官网默认值 |

**MultiMarkerOptions**
| 属性名称 | 类型 | 说明 |
| :---------------- | :-------------------- | :------------------------------------------------------------- |
| id | String | 图层 id，若没有会自动分配一个。 |
| map | Map | 显示 Marker 图层的底图。 |
| zIndex | Number | 图层绘制顺序。 |
| styles | MultiMarkerStyleHash | 点标注的相关样式。 |
| enableCollision | Boolean | 是否开启图层内部的 marker 标注碰撞。 |
| collisionOptions | CollisionOptions | 图层碰撞配置参数。 |
| geometries | PointGeometry[] | 点标注数据数组。 |
| minZoom | Number | 最小缩放层级，当地图缩放层级小于该值时该图层不显示，默认为 3 |
| maxZoom | Number | 最大缩放层级，当地图缩放层级大于该值时该图层不显示，默认为 20 |
:::info{title=提示}
`id styles geometries`属性在外层传入，options 中传入无效；无需传入 `map`
:::
