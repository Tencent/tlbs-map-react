# 网格图 Grid

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                                              | 说明                         | 可选性 | 默认值     |
| :---------- | :------------------------------------------------------------------------------------------------ | :--------------------------- | :----- | :--------- |
| data        | [HeatPoint[]](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocHeat#3) | 网格图数据                   | 必填   |            |
| sideLength  | number                                                                                            | 单位正方形网格边长, 单位为米 | 可选   | 1000       |
| extrudable  | boolean                                                                                           | 网格是否可拔起               | 可选   | true       |
| colorList   | string[]                                                                                          | 颜色层级                     | 可选   | 见官网     |
| heightRange | number[]                                                                                          | 高度变化区间                 | 可选   | [1, 100]   |
| showRange   | number[]                                                                                          | 网格聚合数据显示区间         | 可选   |            |
| **options** | [GridOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocGrid#2) | 网格图配置参数(官网)         | 可选   | 官网默认值 |

**GridOptions**
| 属性名称 | 类型 | 说明 |
| :-------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| sideLength | Number | 单位正方形网格边长, 单位为米, 默认 1000。 |
| extrudable | Boolean | 网格是否可拔起，默认为 true。 |
| colorList | String[] | 颜色层级，颜色支持 rgb(), #RRGGBB 格式, 默认为[’#D8AFA7’, ‘#842610’, ‘#641200’]。 |
| heightRange | Number[] | 高度变化区间，需要传入正整数，默认为[1, 100]，若 extrudable 为 false，则不生效。 |
| showRange | Number[] | 网格聚合数据显示区间，需要传入正整数，区间外的数据不显示，区间内的数据线性映射到高度区间及颜色层级。 |
| selectOptions | [VisualSelectOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualEvent#4) | 拾取配置，可设置拾取动作、选中样式、是否使用高亮效果，其中选中样式为 String 类型的颜色值。 |
| enableBloom | Boolean | 网格热力图呈现泛光效果，默认为 false。 |
| toggleAnimation | [AnimationOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualBasicClass#1) | 开关动画配置参数，不配置则无开关动画效果。支持 animationType 为‘fade’淡入淡出，‘grow’生长两种类型，默认 animationType 为‘fade’淡入淡出。 |
| zIndex | Number | 图层绘制顺序。 |
| minZoom | Number | 图层最小缩放层级，当地图缩放层级小于该值时该图层不显示，默认为 3。 |
| maxZoom | Number | 图层最大缩放层级，当地图缩放层级大于该值时该图层不显示，默认为 20。 |
| heightScale | Number | 网格热力图高度缩放系数，需要传入正数，默认为 1.0。 |
:::info{title=提示}
`sideLength extrudable colorList heightRange showRange`属性在外层传入，options 中传入无效
:::
