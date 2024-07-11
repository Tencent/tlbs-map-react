/**
 * @desc 折线组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomPolylineGeometry } from 'tlbs-map-react/interfaces';
import { getPaths, getStyle } from 'tlbs-map-react/utils';

/**
 * 生成几何信息数组
 * @param geos 几何信息数组
 */
const getGeometries = (geos: CustomPolylineGeometry[]) => geos.map((item) => {
  const { paths, rainbowPaths, ...rest } = item;
  // 普通折线
  if (!rainbowPaths) {
    return {
      ...rest,
      paths: getPaths(paths || []),
    };
  }
  // 彩虹折线
  return {
    ...rest,
    rainbowPaths: rainbowPaths.map((rainbowPath) => {
      const { path, ...args } = rainbowPath;
      return {
        ...args,
        path: getPaths(rainbowPath.path),
      };
    }),
  };
});

interface MultiPolylineProps {
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  /**
     * 折线相关样式
     */
  styles?: TMap.MultiPolylineStyleHash;
  /**
     * 折线数据数组
     */
  geometries?: CustomPolylineGeometry[]
  /**
   * GL API 参数
   */
  options?: Omit<TMap.MultiPolylineOptions, 'id' | 'styles' | 'geometries'>;
  [key: string]: any;
}

const MultiPolylineComponent: FC<MultiPolylineProps> = React.forwardRef((props, ref) => {
  const {
    id,
    styles = {},
    geometries = [],
    options = {},
  }: MultiPolylineProps = props;

  const {
    zIndex,
    enableGeodesic,
    enableSimplify,
  }: Omit<TMap.MultiPolylineOptions, 'id' | 'styles' | 'geometries'> = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MultiPolyline>();

  /** 初始化折线图层 */
  const initMultiPolyline = () => {
    if (!map) return;

    const multiPolylineInstance = new TMap.MultiPolyline({
      id,
      map,
      zIndex,
      styles: getStyle('polyline', styles),
      geometries: getGeometries(geometries),
      enableGeodesic,
      enableSimplify,
    });
    setInstance(multiPolylineInstance);
  };

  // @hook 初始化折线图层
  useEffect(() => {
    if (!instance) initMultiPolyline();

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
    instance?.setStyles(getStyle('polyline', styles));
  }, [styles]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  return null;
});

export default MultiPolylineComponent;
