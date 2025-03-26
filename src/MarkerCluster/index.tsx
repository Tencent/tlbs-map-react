/**
 * @desc 点聚合组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomPointGeometry } from 'tlbs-map-react/interfaces';

/**
 * 生成几何信息数组
 * @param geos 几何信息数组
 */
const getGeometries = (geos: CustomPointGeometry[]) => geos.map((item) => {
  const { position, ...rest } = item;
  return {
    ...rest,
    position: new TMap.LatLng(item.position.lat, item.position.lng),
  };
});

interface MarkerClusterProps {
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  /**
   * 点聚合数据数组
   */
  geometries?: CustomPointGeometry[]
  /**
   * GL API 参数
   */
  options?: Omit<TMap.MarkerClusterOptions, 'map' | 'id' | 'geometries'>;
  [key: string]: any;
}

const MarkerClusterComponent: React.FC<MarkerClusterProps> = React.forwardRef((props, ref) => {
  const {
    id,
    geometries = [],
    options = {},
  } = props as MarkerClusterProps;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MarkerCluster>(); // 存储点聚合图层实例

  /** 初始化点聚合图层 */
  const initMarkerCluster = () => {
    if (!map) return;

    const markerClusterInstance = new TMap.MarkerCluster({
      ...options,
      map,
      id,
      geometries: getGeometries(geometries),
    });
    setInstance(markerClusterInstance);
  };

  // @hook 初始化点聚合图层
  useEffect(() => {
    if (!instance) initMarkerCluster();

    return () => {
      instance?.setMap(null);
    };
  }, [map, instance]);

  // @hook 绑定事件
  useEventListener(instance, props);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  return null;
});

export default MarkerClusterComponent;
