/**
 * @desc 多边形组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomPolygonGeometry } from 'tlbs-map-react/interfaces';
import { getPaths, getStyle } from 'tlbs-map-react/utils';

/**
 * 生成几何信息数组
 * @param geos 几何信息数组
 */
const getGeometries = (geos: CustomPolygonGeometry[]) => geos.map((item) => {
  const { paths, ...rest } = item;
  return {
    ...rest,
    paths: getPaths(item.paths || []),
  };
});

interface MultiPolygonProps {
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  /**
     * 多边形相关样式
     */
  styles?: TMap.MultiPolygonStyleHash;
  /**
     * 多边形数据数组
     */
  geometries?: CustomPolygonGeometry[]
  /**
     * GL API 参数
     */
  options?: Omit<TMap.MultiPolylineOptions, 'id' | 'styles' | 'geometries'>;
  [key: string]: any;
}

const MultiPolygonComponent: FC<MultiPolygonProps> = React.forwardRef((props, ref) => {
  const {
    id,
    styles = {},
    geometries = [],
    options = {},
  }: MultiPolygonProps = props;

  const {
    zIndex,
  }: Omit<TMap.MultiPolylineOptions, 'id' | 'styles' | 'geometries'> = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MultiPolygon>(); // 存储多边形图层实例

  /** 初始化多边形图层 */
  const initMultiPolygon = () => {
    if (!map) return;

    const multiPolygonInstance = new TMap.MultiPolygon({
      id,
      map,
      zIndex,
      styles: getStyle('polygon', styles),
      geometries: getGeometries(geometries),
    });
    setInstance(multiPolygonInstance);
  };

  // @hook 初始化多边形图层
  useEffect(() => {
    if (!instance) initMultiPolygon();

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
    instance?.setStyles(getStyle('polygon', styles));
  }, [styles]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  return null;
});

export default MultiPolygonComponent;
