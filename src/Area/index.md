# 区域图 Area

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                                              | 说明                 | 可选性 | 默认值     |
| :---------- | :------------------------------------------------------------------------------------------------ | :------------------- | :----- | :--------- |
| data        | [AreaPlane[]](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocArea#3) | 区域图数据           | 必填   |            |
| styles      | object                                                                                            | 区域图样式           | 可选   |            |
| **options** | [AreaOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualizationDocArea#4) | 区域图配置参数(官网) | 可选   | 官网默认值 |

**AreaOptions**
| 属性名称 | 类型 | 说明 |
| --------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| styles | Object | 区域图样式集合，key-value 形式。key 对应数据中的 styleId，value 为样式对象，需符合 AreaStyle 对象规范。包含 default 属性，其值作为默认样式，可被覆盖。 |
| selectOptions | [VisualSelectOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualEvent#4) | 拾取配置，可设置拾取动作、选中样式，其中选中样式需符合 AreaStyle 对象规范。 |
| enableBloom | Boolean | 区域图呈现泛光效果，默认为 false。 |
| toggleAnimation | [AnimationOptions](https://lbs.qq.com/webApi/visualizationApi/visualizationDoc/visualBasicClass#1) | 开关动画配置参数，不配置则无开关动画效果。支持 animationType 为‘fade’淡入淡出一种类型，默认 animationType 为‘fade’淡入淡出。 |
| zIndex | Number | 图层绘制顺序。 |
| minZoom | Number | 图层最小缩放层级，当地图缩放层级小于该值时该图层不显示，默认为 3。 |
| maxZoom | Number | 图层最大缩放层级，当地图缩放层级大于该值时该图层不显示，默认为 20。 |
:::info{title=提示}
`styles`属性在外层传入，options 中传入无效
:::
