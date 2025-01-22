
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { getStyle } from 'tlbs-map-react/utils';

export function getGeometries(geometries: TMap.CircleGeometry[]): TMap.CircleGeometry[] {
  return geometries.map((item: TMap.CircleGeometry) => ({
    ...item,
    center: new TMap.LatLng(item.center.lat, item.center.lng),
  }));
}

interface MultiCircleProps {
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  styles?: { [key: string]: TMap.CircleStyleOptions };
  gemeitries?: TMap.CircleGeometry[];
  options?: Omit<TMap.MultiCircleOptions, 'id' | 'styles' | 'gemeitries'>;
  [key: string]: any;
}

const MultiCircleComponent: FC<MultiCircleProps> = React.forwardRef((props, ref) => {
  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MultiCircle>(); // 存储圆形图层实例

  const {
    id,
    styles = {},
    geometries = [],
    options = {},
  }: MultiCircleProps = props as MultiCircleProps;

  /** 初始化图层 */
  const initMultiCircle = () => {
    if (!map) return;
    // 图层初始化代码
    const multiCircleInstance = new TMap.MultiCircle({
      id,
      map,
      styles: getStyle('circle', styles),
      geometries: getGeometries(geometries),
      ...options,
    });
    setInstance(multiCircleInstance);
  };

  // @hook 初始化图层
  useEffect(() => {
    if (!instance) initMultiCircle();

    return () => {
      // 图层销毁
      instance?.setMap(null);
    };
  }, [map, instance]);

  // @hook 绑定事件
  useEventListener(instance, props);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听样式改变
  useEffect(() => {
    instance?.setStyles(getStyle('circle', styles));
  }, [styles]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  return null;
});

export default MultiCircleComponent;
