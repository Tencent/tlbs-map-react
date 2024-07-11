/**
 * @desc 文本标记组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomLabelGeometry } from 'tlbs-map-react/interfaces';
import { getStyle } from 'tlbs-map-react/utils';

/**
 * 生成几何信息数组
 * @param geos 几何信息数组
 */
const getGeometries = (geos: CustomLabelGeometry[]) => geos.map((item) => {
  const { position, ...rest } = item;
  return {
    ...rest,
    position: new TMap.LatLng(item.position.lat, item.position.lng),
  };
});

interface MultiLabelProps {
  /**
   * 图层id，若没有会自动分配一个
   */
  id?: string;
  /**
     * 文本标注的相关样式
     */
  styles?: TMap.MultiLabelStyleHash;
  /**
     * 文本标注数据数组
     */
  geometries?: CustomLabelGeometry[]
  /**
     * GL API 参数
     */
  options?: Omit<TMap.MultiLabelOptions, 'id' | 'styles' | 'geometries'>;
  [key: string]: any;
}

const MultiLabelComponent: FC<MultiLabelProps> = React.forwardRef((props, ref) => {
  const {
    id,
    styles = {},
    geometries = [],
    options = {},
  } = props;

  const {
    zIndex,
    collisionOptions,
  }: Omit<TMap.MultiLabelOptions, 'id' | 'styles' | 'geometries'> = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.MultiLabel>();

  /**  初始化文本标记图层 */
  const initMultiLabel = () => {
    if (!map) return;

    const multiLabelInstance = new TMap.MultiLabel({
      id,
      zIndex,
      map,
      styles: getStyle('label', styles),
      collisionOptions,
      geometries: getGeometries(geometries),
    });
    setInstance(multiLabelInstance);
  };

  // @hook 初始化文本标记图层
  useEffect(() => {
    if (!instance) initMultiLabel();

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
    instance?.setStyles(getStyle('label', styles));
  }, [styles]);

  // @hook 监听几何信息改变
  useEffect(() => {
    instance?.setGeometries(getGeometries(geometries));
  }, [geometries]);

  return null;
});

export default MultiLabelComponent;
