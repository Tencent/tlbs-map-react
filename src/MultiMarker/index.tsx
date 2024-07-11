/**
 * @desc 点标记组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomPointGeometry } from 'tlbs-map-react/interfaces';
import { getStyle } from 'tlbs-map-react/utils';

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

interface MultiMarkerProps {
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  /**
   * 点标注的相关样式
   */
  styles?: TMap.MultiMarkerStyleHash;
  /**
   * 点标注数据数组
   */
  geometries?: CustomPointGeometry[]
  /**
   * GL API 参数
   */
  options?: Omit<TMap.MultiMarkerOptions, 'id' | 'styles' | 'geometries'>;
  [key: string]: any;
}

const MultiMarkerComponent: FC<MultiMarkerProps> = React.forwardRef((props, ref) => {
  const {
    id,
    styles = {},
    geometries = [],
    options = {},
  }: MultiMarkerProps = props;

  const {
    zIndex,
    enableCollision,
    collisionOptions,
    minZoom,
    maxZoom,
  }: Omit<TMap.MultiMarkerOptions, 'id' | 'styles' | 'geometries'> = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MultiMarker>(); // 存储点标记图层实例

  /** 初始化点标记图层 */
  const initMultiMarker = () => {
    if (!map) return;

    const multiMakerInstance = new TMap.MultiMarker({
      id,
      map,
      zIndex,
      styles: getStyle('marker', styles),
      enableCollision,
      collisionOptions,
      geometries: getGeometries(geometries),
      minZoom,
      maxZoom,
    });
    setInstance(multiMakerInstance);
  };

  // @hook 初始化点标记图层
  useEffect(() => {
    if (!instance) initMultiMarker();

    return () => {
      instance?.setMap(null); // 将多个标注点同时从地图中移除
    };
  }, [map, instance]);

  // @hook 绑定事件
  useEventListener(instance, props);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听样式改变
  useEffect(() => {
    instance?.setStyles(getStyle('marker', styles));
  }, [styles]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  return null;
});

export default MultiMarkerComponent;
