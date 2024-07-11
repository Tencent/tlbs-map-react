# 信息窗体 InfoWindow

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                          | 说明                           | 可选性 | 默认值     |
| :---------- | :---------------------------------------------------------------------------- | :----------------------------- | :----- | :--------- |
| visible     | boolean                                                                       | 是否显示信息窗体               | 可选   | true       |
| position    | LatLng                                                                        | 信息窗体的经纬度坐标           | 必填   | () => {}   |
| content     | string                                                                        | 信息窗显示内容，默认为空字符串 | 可选   | ''         |
| **options** | [InfoWindowOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocInfo#2) | 信息窗体配置参数(官网)         | 可选   | 官网默认值 |

**InfoWindowOptions**
| 属性名称 | 类型 | 说明 |
| :----------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| map | Map | （必需）显示信息窗的地图。 |
| position | LatLng | （必需）信息窗的经纬度坐标。 |
| content | String | 信息窗显示内容，默认为空字符串。当 enableCustom 为 true 时，需传入信息窗体的 dom 字符串。 |
| zIndex | Number | 信息窗的 z-index 值，默认为 0。 |
| offset | Object | 信息窗相对于 position 对应像素坐标的偏移量，x 方向向右偏移为正值，y 方向向下偏移为正值，默认为{x:0, y:0}。 |
| enableCustom | Boolean | 信息窗体样式是否为自定义，默认为 false。 |
:::info{title=提示}
`position content`属性在外层传入，options 中传入无效；无需传入 `map`
:::
