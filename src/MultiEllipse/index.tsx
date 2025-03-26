/**
 * @desc 椭圆组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomEllipseGeometry } from 'tlbs-map-react/interfaces';
import { getStyle } from 'tlbs-map-react/utils';

/**
 * 生成几何信息数组
 * @param geos 几何信息数组
 */
const getGeometries = (geos: CustomEllipseGeometry[]) => geos.map((item) => {
  const { center, ...rest } = item;
  return {
    ...rest,
    center: new TMap.LatLng(center.lat, center.lng),
  };
});

interface MultiEllipseProps {
  /**
   * 是否显示椭圆组件
   */
  visible?: boolean;
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  /**
   * 椭圆相关样式
   */
  styles?: TMap.MultiEllipseStyleHash;
  /**
   * 椭圆数据数组
   */
  geometries?: CustomEllipseGeometry[]
  /**
   * GL API 参数
   */
  options?: Omit<TMap.MultiEllipseOptions, 'map' | 'id' | 'styles' | 'geometries'>;
  [key: string]: any;
}

const MultiEllipseComponent: React.FC<MultiEllipseProps> = React.forwardRef((props, ref) => {
  const {
    visible = true,
    id,
    styles = {},
    geometries = [],
    options = {},
  } = props as MultiEllipseProps;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MultiEllipse>(); // 存储椭圆图层实例

  /** 初始化椭圆图层 */
  const initMultiEllipse = () => {
    if (!map) return;

    const multiEllipseInstance = new TMap.MultiEllipse({
      ...options,
      id,
      map,
      styles: getStyle('ellipse', styles),
      geometries: getGeometries(geometries),
    });
    setInstance(multiEllipseInstance);
  };

  // @hook 初始化椭圆图层
  useEffect(() => {
    if (!instance) initMultiEllipse();

    return () => {
      // NOTE tmap-gl-types 库中 MultiEllipse 类定义错误，没有 extends GeometryOverlay
      // @ts-ignore
      instance?.setMap(null);
    };
  }, [map, instance]);

  // @hook 绑定事件
  useEventListener(instance, props);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听样式改变
  useEffect(() => {
    instance?.setStyles(getStyle('ellipse', styles));
  }, [styles]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  // @hook 监听图层可见性改变
  useEffect(() => {
    // NOTE tmap-gl-types 库中 MultiEllipse 类定义错误，没有 extends GeometryOverlay
    // @ts-ignore
    instance?.setVisible(visible);
  }, [visible, instance]);

  return null;
});

export default MultiEllipseComponent;
