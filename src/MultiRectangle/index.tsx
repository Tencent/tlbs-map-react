/**
 * @desc 矩形组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomRectangleGeometry } from 'tlbs-map-react/interfaces';
import { getStyle } from 'tlbs-map-react/utils';

/**
 * 生成几何信息数组
 * @param geos 几何信息数组
 */
const getGeometries = (geos: CustomRectangleGeometry[]) => geos.map((item) => {
  const { center, ...rest } = item;
  return {
    ...rest,
    center: new TMap.LatLng(center.lat, center.lng),
  };
});

interface MultiRectangleProps {
  /**
   * 是否显示矩形组件
   */
  visible?: boolean;
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  /**
   * 矩形相关样式
   */
  styles?: TMap.MultiRectangleStyleHash;
  /**
   * 矩形数据数组
   */
  geometries?: CustomRectangleGeometry[]
  /**
   * GL API 参数
   */
  options?: Omit<TMap.MultiRectangleOptions, 'map' | 'id' | 'styles' | 'geometries'>;
  [key: string]: any;
}

const MultiRectangleComponent: React.FC<MultiRectangleProps> = React.forwardRef((props, ref) => {
  const {
    visible = true,
    id,
    styles = {},
    geometries = [],
    options = {},
  } = props as MultiRectangleProps;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MultiRectangle>(); // 存储矩形图层实例

  /** 初始化矩形图层 */
  const initMultiRectangle = () => {
    if (!map) return;

    const multiRectangleInstance = new TMap.MultiRectangle({
      ...options,
      id,
      map,
      styles: getStyle('rectangle', styles),
      geometries: getGeometries(geometries),
    });
    setInstance(multiRectangleInstance);
  };

  // @hook 初始化矩形图层
  useEffect(() => {
    if (!instance) initMultiRectangle();

    return () => {
      instance?.setMap(null);
    };
  }, [map, instance]);

  // @hook 绑定事件
  useEventListener(instance, props);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听样式改变
  useEffect(() => {
    instance?.setStyles(getStyle('rectangle', styles));
  }, [styles]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  // @hook 监听图层可见性改变
  useEffect(() => {
    instance?.setVisible(visible);
  }, [visible, instance]);

  return null;
});

export default MultiRectangleComponent;
