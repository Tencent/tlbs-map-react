/**
 * @desc 热力图组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext } from 'tlbs-map-react';

interface HeatProps {
  /**
   * 热力图数据
   */
  data?: TMap.visualization.HeatPoint[];
  /**
   * 最大辐射半径，默认为50
   */
  radius?: number;
  /**
   * 峰值高度，默认为100
   */
  height?: number;
  /**
   * 渐变颜色
   */
  gradientColor?: TMap.GradientColor;
  /**
   * 热力最弱阈值，小于该值的不显示，默认为0
   */
  min?: number;
  /**
   * 热力最强阈值，大于该值的显示为最强色，默认为数据中的最大值
   */
  max?: number;
  /**
   * 全局透明度，取值范围[0，1]，默认为0.8
   */
  opacity?: number;
  /**
   * GL API 参数
   */
  options?: Omit<TMap.visualization.HeatOptions, 'radius' | 'height' | 'gradientColor' | 'min' | 'max' | 'opacity'>;
  [key: string]: any;
}

const HeatComponent: FC<HeatProps> = React.forwardRef((props, ref) => {
  const {
    data = [],
    radius,
    height,
    gradientColor,
    min,
    max,
    opacity,
    options = {},
  }: HeatProps = props;

  const {
    enableAggregation,
    enableLighting,
    transitAnimation,
    toggleAnimation,
    zIndex,
    minZoom,
    maxZoom,
    offset,
    distanceUnit,
  } = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.visualization.Heat>(); // 存储热力图图层实例

  /** 初始化热力图图层 */
  const initHeat = () => {
    if (!map) return;

    const heatInstance = new TMap.visualization.Heat({
      radius,
      height,
      gradientColor,
      min,
      max,
      opacity,
      enableAggregation,
      enableLighting,
      transitAnimation,
      toggleAnimation,
      zIndex,
      minZoom,
      maxZoom,
      offset,
      distanceUnit,
    }).setData(data)
      .addTo(map);
    setInstance(heatInstance);
  };

  // @hook 初始化热力图图层
  useEffect(() => {
    if (!instance) initHeat();

    return () => {
      instance?.remove();
      instance?.destroy();
    };
  }, [map, instance]);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听数据改变
  useEffect(() => {
    instance?.setData(data);
  }, [data]);

  // @hook 监听辐射半径改变
  useEffect(() => {
    instance?.setRadius(radius || 50);
  }, [radius]);

  // @hook 监听高度改变
  useEffect(() => {
    instance?.setHeight(height || 100);
  }, [height]);

  // @hook 监听渐变颜色改变
  useEffect(() => {
    if (instance && gradientColor) {
      instance.setGradientColor(gradientColor);
    }
  }, [gradientColor]);

  // @hook 监听最弱阈值改变
  useEffect(() => {
    instance?.setMin(min || 0);
  }, [min]);

  // @hook 监听最强阈值改变
  useEffect(() => {
    if (max) {
      instance?.setMax(max);
    }
  }, [max]);

  // @hook 监听透明度改变
  useEffect(() => {
    instance?.setOpacity(opacity || 0.8);
  }, [opacity]);

  // @hook 监听图层最小缩放层级改变
  useEffect(() => {
    instance?.setMinZoom(minZoom || 3);
  }, [minZoom]);

  // @hook 监听图层最大缩放改变
  useEffect(() => {
    instance?.setMaxZoom(maxZoom || 20);
  }, [maxZoom]);

  // @hook 监听图层底部离地高度改变
  useEffect(() => {
    instance?.setOffset(offset || 0);
  }, [offset]);

  return null;
});

export default HeatComponent;
