# 弧线图 Arc

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                                           | 说明                 | 可选性 | 默认值     |
| :---------- | :--------------------------------------------------------------------------------------------- | :------------------- | :----- | :--------- |
| data        | [ArcLine[]](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocArc#3) | 弧线图数据           | 必填   |            |
| mode        | string                                                                                         | 弧线模式             | 可选   | 'vertical' |
| **options** | [ArcOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocArc)  | 弧线图配置参数(官网) | 可选   | 官网默认值 |

**GridOptions**
| 属性名称 | 类型 | 说明 |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| pickStyle | Function | 轨迹图样式映射函数，接收 ArcLine 数据返回对应样式，样式对象规范详见  ArcStyle 。 |
| animatable | Boolean | 是否开启动画，默认为 true(即将下线，请使用 processAnimation 设置 enable 属性)。 |
| opacity | Number | 弧线透明度，取值范围(0, 1]，默认 0.5，(即将下线，请在 ArcStyle 中使用 rgba 格式设置透明度)。 |
| width | Number | 弧线的宽度，默认为 1，单位是屏幕像素，(即将下线，请在 ArcStyle 定义弧线宽度)。 |
| mode | String | 弧线模式，horizontal 代表贴地的弧线，vertical 代表弧线所在平面会垂直于底图平面，默认为 vertical。 |
| curvature | Number | 弧线曲度，取值范围(0, 1]，默认为 0.6。 |
| selectOptions | [VisualSelectOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualEvent#4) | 拾取配置，可设置拾取动作、选中样式、是否使用高亮效果，其中选中样式需符合 ArcStyle 对象规范。 |
| enableBloom | Boolean | 弧线图呈现泛光效果，默认为 false。 |
| enableGeodesic | Boolean | 弧线是否开启大地曲线绘制模式，当线段起始端点经度跨度大于 180 度时，开启后则两端点连线会跨越 180 度经线进行连线，不开启则跨越 0 度经线进行连线，默认为 false |
| toggleAnimation | [AnimationOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualBasicClass#1) | 开关动画配置参数，不配置则无开关动画效果。支持 animationType 为‘fade’淡入淡出，‘grow’生长两种类型，默认 animationType 为‘fade’淡入淡出。 |
| processAnimation | [ArcAnimationOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocArc#5) | 过程动画配置参数，不配置则启用默认流动动画。 |
| zIndex | Number | 图层绘制顺序。 |
| minZoom | Number | 图层最小缩放层级，当地图缩放层级小于该值时该图层不显示，默认为 3。 |
| maxZoom | Number | 图层最大缩放层级，当地图缩放层级大于该值时该图层不显示，默认为 20。 |
:::info{title=提示}
`mode`属性在外层传入，options 中传入无效
:::
