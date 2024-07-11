# 热力图 Heat

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**
| 属性 | 类型 | 说明 | 可选性 | 默认值 |
| :------------ | :------------------------------------------------------------------------------------------------ | :----------------------------------- | :----- | :----------- |
| data | [HeatPoint[]](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocHeat#3) | 热力图数据 | 必填 | |
| radius | number | 最大辐射半径 | 可选 | 50 |
| height | number | 峰值高度 | 可选 | 100 |
| gradientColor | [GradientColor](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocClass#4) | 渐变颜色 | 可选 | |
| min | number | 热力最弱阈值，小于该值的不显示 | 可选 | 0 |
| max | number | 热力最强阈值，大于该值的显示为最强色 | 可选 | 数据中最大值 |
| opacity | number | 全局透明度，取值范围[0，1] | 可选 | 0.8 |
| **options** | [HeatOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocHeat#3) | 热力图配置参数(官网) | 可选 | 官网默认值 |

**HeatOptions**
| 属性名称 | 类型 | 说明 |
| :---------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------- |
| radius | Number | 最大辐射半径，默认为 50。 |
| height | Number | 峰值高度，默认为 100。 |
| gradientColor | GradientColor | 渐变颜色，渐变方向由 GradientColor 对象的 angle 属性决定，其中渐变色断点集合需符合 GradientColor 对象规范 |
| min | Number | 热力最弱阈值，小于该值的不显示，默认为 0。 |
| max | Number | 热力最强阈值，大于该值的显示为最强色，默认为数据中的最大值。 |
| opacity | Number | 全局透明度，取值范围[0，1]，默认为 0.8。 |
| enableAggregation | Boolean | 是否启用自动聚合预处理，适用于万级数据量，启用后可优化运行时性能，但对数据分布略有影响。默认为 false。 |
| enableLighting | Boolean | 热力图是否呈现光照效果，默认为 false。 |
| transitAnimation | AnimationOptions | 热力图数据源切换过渡动画配置参数，不配置则无过渡动画。支持 animationType 为‘mix’渐变一种类型，默认 animationType 为‘mix’渐变。 |
| toggleAnimation | AnimationOptions | 开关动画配置参数，不配置则无开关动画效果。支持 animationType 为‘fade’淡入淡出一种类型，默认 animationType 为‘fade’淡入淡出。 |
| zIndex | Number | 图层绘制顺序。 |
| minZoom | Number | 图层最小缩放层级，当地图缩放层级小于该值时该图层不显示，默认为 3。 |
| maxZoom | Number | 图层最大缩放层级，当地图缩放层级大于该值时该图层不显示，默认为 20。 |
| offset | Number | 图层底部离地高度，默认为 0。 |
| distanceUnit | String | radius(半径)、height(峰值高度)、offset(离地高度)三个参数的单位，支持’pixel’ 像素、‘meter’ 米，默认为’pixel’。 |
:::info{title=提示}
`radius height gradientColor min max opacity`属性在外层传入，options 中传入无效
:::
