/**
 * @desc 热力图组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';

interface AreaProps {
  /**
   * 区域图数据
   */
  data: TMap.visualization.AreaPlane[];
  /**
   * 区域图样式
   */
  styles?: TMap.visualization.AreaStyleHash;
  /**
   * GL API 参数
   */
  options?: Omit<TMap.visualization.AreaOptions, 'styles'>;
  [key: string]: any;
}

const AreaComponent: FC<AreaProps> = React.forwardRef((props, ref) => {
  const {
    data = [],
    styles,
    options = {},
  }: AreaProps = props as AreaProps;

  const {
    selectOptions,
    enableBloom,
    toggleAnimation,
    zIndex,
    minZoom,
    maxZoom,
  } = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.visualization.Area>(); // 存储图层实例

  /** 初始化区域图图层 */
  const initArea = () => {
    if (!map) return;
    const areaInstance = new TMap.visualization.Area({
      styles,
      selectOptions,
      enableBloom,
      toggleAnimation,
      zIndex,
      minZoom,
      maxZoom,
    }).setData(data)
      .addTo(map);
    setInstance(areaInstance);
  };

  // @hook 初始化区域图图层
  useEffect(() => {
    if (!instance) initArea();

    return () => {
      instance?.remove();
      instance?.destroy();
    };
  }, [map, instance]);

  // @hook 绑定事件
  useEventListener(instance, props);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听数据改变
  useEffect(() => {
    instance?.setData(data);
  }, [data]);

  // @hook 监听样式集合改变
  useEffect(() => {
    if (instance && styles) {
      instance.setStyles(styles);
    }
  }, [styles]);

  // @hook 监听拾取配置改变
  useEffect(() => {
    if (instance && selectOptions) {
      instance?.setSelectOptions(selectOptions);
    }
  }, [selectOptions]);

  // @hook 监听图层最小缩放层级改变
  useEffect(() => {
    instance?.setMinZoom(minZoom || 3);
  }, [minZoom]);

  // @hook 监听图层最大缩放改变
  useEffect(() => {
    instance?.setMaxZoom(maxZoom || 20);
  }, [maxZoom]);

  return null;
});

export default AreaComponent;
