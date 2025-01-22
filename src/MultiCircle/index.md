# 圆形 MultiCircle

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**
| 属性 | 类型 | 说明 | 可选性 | 默认值 |
| :---------- | :--------------------------------------------------------------------------------- | :---------------------------- | :----- | :--------- |
id | string | 图层 id，若没有会自动分配一个 | 可选 | |
| styles | [MultiCircleStyleHash](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#15) | 圆形相关样式 | 可选 | {} |
| geometries | [CircleGeometry[]](<https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#16](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#13)>) | 圆形数据数组 | 可选 | [] |
| **options** | [MultiCircleOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#14) | 圆形配置参数(官网) | 可选 | 官网默认值 |
