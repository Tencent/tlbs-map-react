# 文本标记 MultiLabel

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                             | 说明                          | 可选性 | 默认值     |
| :---------- | :------------------------------------------------------------------------------- | :---------------------------- | :----- | :--------- |
| id          | string                                                                           | 图层 id，若没有会自动分配一个 | 可选   |            |
| styles      | [MultiLabelStyleHash](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocLabel#3) | 点标记的相关样式              | 可选   | {}         |
| geometries  | [LabelGeometry[]](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocLabel#5)     | 点标记数据数组                | 可选   | []         |
| **options** | [MultiLabelOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocLabel#2)   | 文本标记配置参数(官网)        | 可选   | 官网默认值 |

**MultiLabelOptions**
| 属性名称 | 类型 | 说明 |
| :---------------- | :------------------- | :------------------------------- |
| id | String | 图层 id，若没有会自动分配一个。 |
| map | Map | 显示文本标注图层的底图。 |
| styles | MultiLabelStyleHash | 文本标注的相关样式。 |
| collisionOptions | CollisionOptions | 图层碰撞配置参数 |
| geometries | LabelGeometry[] | 文本标注数据数组。 |
:::info{title=提示}
`id styles geometries`属性在外层传入，options 中传入无效；无需传入 `map`
:::
