# 地图 TMap

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 `</>` 可展开代码
:::

**2. 组件 Props**

| 属性        | 类型                                                                     | 说明               | 可选性 | 默认值                            |
| :---------- | :----------------------------------------------------------------------- | :----------------- | :----- | :-------------------------------- |
| apiKey      | string                                                                   | 地图 Key           | 必填   |                                   |
| libraries   | string                                                                   | 地图附加库         | 可选   | 'visualization,geometry,tools'    |
| className   | string                                                                   | 地图容器类名       | 可选   | tmap-container                    |
| style       | Record<string, string>                                                   | 地图容器样式       | 可选   | { height: '100%', width: '100%' } |
| control     | ControlProps                                                             | 地图控件           | 可选   | undefined                         |
| duration    | number                                                                   | 动画时间           | 可选   | 500                               |
| **options** | [MapOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/docIndexMap#2) | 地图配置参数(官网) | 可选   | 官网默认值                        |

**MapOptions**
| 属性名称 | 类型 | 说明 |
| :-------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| center | LatLng | 地图中心点经纬度。 |
| zoom | Number | 地图缩放级别，支持 3 ～ 20。 |
| minZoom | Number | 地图最小缩放级别，默认为 3。 |
| maxZoom | Number | 地图最大缩放级别，默认为 20。 |
| rotation | Number | 地图在水平面上的旋转角度，顺时针方向为正，默认为 0。 |
| pitch | Number | 地图俯仰角度，取值范围为 0~80，默认为 0。 |
| scale | Number | 地图显示比例，默认为 1。 |
| offset | Object | 地图中心与容器的偏移量，Object 的格式为 {x:Number, y:Number}（右方下方为正，单位为像素）。 |
| draggable | Boolean | 是否支持拖拽移动地图，默认为 true。 |
| scrollable | Boolean | 是否支持鼠标滚轮缩放地图，默认为 true。 |
| touchZoomable | Boolean | 是否允许手势捏合缩放；默认为 true。 |
| pitchable | Boolean | 是否允许设置俯仰角度；默认为 true。在 2D 视图下，此属性无效。 |
| rotatable | Boolean | 是否允许设置旋转角度；默认为 true。在 2D 视图下，此属性无效。 |
| doubleClickZoom | Boolean | 是否支持双击缩放地图，默认为 true。 |
| mapZoomType | MAP_ZOOM_TYPE | 地图缩放焦点控制。 |
| boundary | LatLngBounds | 地图边界，设置后拖拽、缩放等操作无法将地图移动至边界外，默认为 null。 |
| mapStyleId | String | 地图样式 ID，有效值为”style[编号]”，与 key 绑定，详见个性化地图配置页面++。 |
| baseMap | BaseMap I BaseMap[] | 地图底图，BaseMap 目前只支持矢量底图、卫星底图、路况底图，可以使用数组形式实现多种底图叠加。默认为矢量底图，如果传入 null 地图不显示任何地物。 |
| viewMode | String | 地图视图模式，支持 2D 和 3D，默认为 3D。2D 模式下不可对地图进行拖拽旋转，pitch 和 rotation 始终保持为 0。 |
| showControl | Boolean | 是否显示地图上的控件，默认 true。 |
| renderOptions | MapRenderOptions | 地图渲染配置参数 |
| clip | ClipOptions | clip 区域掩膜配置参数 |

```ts
interface ControlProps {
  scale?: ControlConfig;
  zoom?: ControlConfig;
  rotate?: ControlConfig;
}

interface ControlConfig {
  position?: string;
  className?: string;
  numVisible?: boolean;
}
```

:::info{title=注意}
监听事件时需在官网提供的事件名前加字符串“on”，也可把事件名的首个字符转换成大写，其他不可改变

如：`onclick | onClick | onrightclick | onRightclick | oncenter_changed | onCenter_changed`

通过 props 传入的事件的回调函数不可改变
:::
