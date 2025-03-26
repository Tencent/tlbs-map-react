# 点聚合 MarkerCluster

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                                                                                  | 说明                          | 可选性 | 默认值     |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------- | :----- | :--------- |
| id          | string                                                                                                                                | 图层 id，若没有会自动分配一个 | 可选   |            |
| geometries  | [PointGeometry[]](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker#6)                                                         | 点聚合数据数组                | 可选   | []         |
| **options** | [Omit<TMap.MarkerClusterOptions, 'map' &#124; 'id' &#124; 'geometries'>](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocCluster#2) | 点聚合配置参数(官网)          | 可选   | 官网默认值 |

**MarkerClusterOptions**
| 属性名称 | 类型 | 说明 |
| :--------- | :-------------------- | :------------------------------ |
| id | String | 图层 id，若没有会自动分配一个。 |
| map | Map | 显示点聚合图层的底图。 |
| zIndex | Number | 图层绘制顺序。 |
| geometries | PointGeometry[] | 点聚合数据数组。 |
| enableDefaultStyle | Boolean | 是否启用默认的聚合样式。 |
| minimumClusterSize | Number | 形成聚合簇的最小个数，默认为 2。 |
| zoomOnClick | Boolean | 点击已经聚合的标记点时是否实现聚合分离，默认为 true。 |
| gridSize | Number | 聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，默认为 60，以像素为单位，指的是地图 pitch 为 0 时的屏幕像素大小。 |
| averageCenter | Boolean | 每个聚和簇的中心是否应该是聚类中所有标记的平均值，默认为 false。 |
| maxZoom | Number | 采用聚合策略的最大缩放级别，若地图缩放级别大于该值，则不进行聚合。默认为 20。 |
| collisionOptions |[CollisionOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocCluster#4) | 图层碰撞配置参数。 |
