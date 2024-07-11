# 折线 MultiPolyline

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                                 | 说明                          | 可选性 | 默认值     |
| :---------- | :----------------------------------------------------------------------------------- | :---------------------------- | :----- | :--------- |
| id          | string                                                                               | 图层 id，若没有会自动分配一个 | 可选   |            |
| styles      | [MultiPolylineStyleHash](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#4) | 折线相关样式                  | 可选   | {}         |
| geometries  | [PolylineGeometry[]](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#6)     | 折线数据数组                  | 可选   | []         |
| **options** | [MultiPolylineOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#2)   | 折线配置参数(官网)            | 可选   | 官网默认值 |

**MultiPolylineOptions**
| 名称 | 类型 | 说明 |
| :------------- | :--------------------- | :-------------------------------------------------------- |
| id | String | 图层 id，若没有会自动分配一个。 |
| map | Map | 显示折线图层的底图。 |
| zIndex | Number | 图层绘制顺序 |
| styles | MultiPolylineStyleHash | 折线的相关样式。 |
| enableGeodesic | Boolean | 绘制折线是否是大圆航线， 默认为 false。 |
| enableSimplify | Boolean | 是否开启抽稀, 默认为 true（开启大圆航线后将默认关闭抽稀） |
| geometries | PolylineGeometry[] | 折线数据数组。 |
:::info{title=提示}
`id styles geometries`属性在外层传入，options 中传入无效；无需传入 `map`
:::
