/**
 * @desc 弧线图组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { CustomArcLine } from 'tlbs-map-react/interfaces';

interface ArcProps {
  /**
   * 弧线图数据
   */
  data?: CustomArcLine[];
  /**
   * 弧线模式
   */
  mode?: string;
  /**
   * GL API 参数
   */
  options?: Omit<TMap.visualization.ArcOptions, 'mode'>;
  [key: string]: any;
}

const ArcComponent: FC<ArcProps> = React.forwardRef((props, ref) => {
  const {
    data = [],
    mode,
    options = {},
  }: ArcProps = props;

  const {
    pickStyle,
    curvature,
    selectOptions,
    enableBloom,
    enableGeodesic,
    toggleAnimation,
    processAnimation,
    zIndex,
    minZoom,
    maxZoom,
  } = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.visualization.Arc>();

  /** 初始化弧线图图层 */
  const initArc = () => {
    if (!map) return;

    const arcInstance = new TMap.visualization.Arc({
      pickStyle,
      mode,
      curvature,
      selectOptions,
      enableBloom,
      toggleAnimation,
      enableGeodesic,
      processAnimation,
      zIndex,
      minZoom,
      maxZoom,
    }).setData(data.map(item => ({
      ...item,
      from: new TMap.LatLng(item.from?.lat, item.from?.lng),
      to: new TMap.LatLng(item.to?.lat, item.to?.lng),
    })))
      .addTo(map);
    setInstance(arcInstance);
  };

  // @hook 初始化弧线图图层
  useEffect(() => {
    if (!instance) initArc();

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
    if (instance && data) {
      instance.setData(data.map(item => ({
        ...item,
        from: new TMap.LatLng(item.from?.lat, item.from?.lng),
        to: new TMap.LatLng(item.to?.lat, item.to?.lng),
      })));
    }
  }, [data]);

  // @hook 监听弧线图样式映射函数改变
  useEffect(() => {
    if (pickStyle) {
      instance?.setPickStyle(pickStyle);
    }
  }, [pickStyle]);

  // @hook 监听弧线的曲度改变
  useEffect(() => {
    if (curvature) {
      instance?.setCurvature(curvature);
    }
  }, [curvature]);

  // @hook 监听弧线的模式改变
  useEffect(() => {
    if (mode) {
      instance?.setMode(mode);
    }
  }, [mode]);

  // @hook 监听拾取配置改变
  useEffect(() => {
    if (selectOptions) {
      instance?.setSelectOptions(selectOptions);
    }
  }, [selectOptions]);

  // @hook 监听图层最小缩放层级改变
  useEffect(() => {
    instance?.setMinZoom(minZoom || 3);
  }, [minZoom]);

  // @hook 监听图层最大缩放改变
  useEffect(() => {
    if (maxZoom) {
      instance?.setMaxZoom(maxZoom || 20);
    }
  }, [maxZoom]);

  return null;
});

export default ArcComponent;
