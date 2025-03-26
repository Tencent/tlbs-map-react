import React, { useEffect } from 'react';

// 通过上下文在组件之间传递地图实例
export const MapContext = React.createContext<TMap.Map | undefined>(undefined);

// 处理事件的钩子
export const useEventListener = (
  // instance: TMap.Map | TMap.GeometryOverlay | undefined,
  instance: any,
  props: Record<string, unknown>,
) => {
  useEffect(() => {
    if (!instance) {
      return;
    }

    const eventsMap: {[key: string]: () => void} = {};

    Object.keys(props).forEach((attr) => {
      if (attr.indexOf('on') === 0) {
        const eventName = attr.slice(2).toLowerCase();
        const eventCallback = props[attr];
        if (typeof eventCallback === 'function') {
          eventsMap[eventName] = eventCallback as () => void;
        }
      }
    });

    // 绑定事件
    Object.keys(eventsMap).forEach((eventName) => {
      instance.on(eventName, eventsMap[eventName]);
    });

    // 卸载事件
    return () => {
      Object.keys(eventsMap).forEach((eventName) => {
        instance.on(eventName, eventsMap[eventName]);
      });
    };
  }, [instance]);
};

/**
 * 生成样式对象
 * @param stylesObj 样式对象
 */
export const getStyle = (
  type: string,
  stylesObj: TMap.MultiMarkerStyleHash
  | TMap.MultiLabelStyleHash
  | TMap.MultiPolylineStyleHash
  | TMap.MultiPolygonStyleHash
  | TMap.MultiCircleStyleHash
  | TMap.MultiRectangleStyleHash
  | TMap.MultiEllipseStyleHash,
) => {
  const styles: any = {};

  Object.keys(stylesObj).forEach((item) => {
    switch (type) {
      case 'marker':
        styles[item] = new TMap.MarkerStyle(stylesObj[item]);
        break;
      case 'label':
        styles[item] = new TMap.LabelStyle(stylesObj[item]);
        break;
      case 'polyline':
        styles[item] = new TMap.PolylineStyle(stylesObj[item]);
        break;
      case 'polygon':
        if ((stylesObj[item] as TMap.MultiPolygonStyleHash).extrudeHeight) {
          styles[item] = new TMap.ExtrudablePolygonStyle(stylesObj[item]);
        } else {
          styles[item] = new TMap.PolygonStyle(stylesObj[item]);
        }
        break;
      case 'circle':
        styles[item] = new TMap.CircleStyle(stylesObj[item]);
      case 'rectangle':
        styles[item] = new TMap.RectangleStyle(stylesObj[item]);
        break;
      case 'ellipse':
        styles[item] = new TMap.EllipseStyle(stylesObj[item]);
        break;
      default:
        break;
    }
  });
  return styles;
};

/**
 * 矢量折线和多边形坐标转换
 * @param paths 坐标数组
 */
export const getPaths = (paths: TMap.LatLngData[] | TMap.LatLngData[][] | TMap.LatLngData[][][]) => {
  const convertLatLng: any = (coord: TMap.LatLngData | TMap.LatLngData[] | TMap.LatLngData[][]) => {
    // 带洞多边形 多条不相连的折线
    if (Array.isArray(coord)) {
      return coord.map(point => convertLatLng(point));
    }
    // 简单多边形 一条连续的折线
    return new TMap.LatLng(coord.lat, coord.lng);
  };
  return paths.map(item => convertLatLng(item));
};
