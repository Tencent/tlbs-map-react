/**
 * @desc 网格图组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';

interface GridProps {
  /**
   * 网格图数据
   */
  data?: TMap.visualization.HeatPoint[];
  /**
   * 单位正方形网格边长, 单位为米, 默认1000
   */
  sideLength?: number;
  /**
   * 网格是否可拔起，默认为true
   */
  extrudable?: boolean;
  /**
   * 颜色层级，颜色支持rgb(), #RRGGBB格式, 默认为[’#D8AFA7’, ‘#842610’, ‘#641200’]
   */
  colorList?: string[];
  /**
   * 高度变化区间，需要传入正整数，默认为[1, 100]，若extrudable为false，则不生效
   */
  heightRange?: number[];
  /**
   * 网格聚合数据显示区间，需要传入正整数，区间外的数据不显示，区间内的数据线性映射到高度区间及颜色层级
   */
  showRange?: number[];
  /**
   * GL API 参数
   */
  options?: Omit<TMap.visualization.GridOptions, 'sideLength' | 'extrudable' | 'colorList' | 'heightRange' | 'showRange'>;
  [key: string]: any;
}

const GridComponent: FC<GridProps> = React.forwardRef((props, ref) => {
  const {
    data = [],
    sideLength,
    extrudable,
    colorList,
    heightRange,
    showRange = [0, 1000],
    options = {},
  }: GridProps = props;

  const {
    selectOptions,
    enableBloom,
    toggleAnimation,
    zIndex,
    minZoom,
    maxZoom,
    heightScale,
  } = options;

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.visualization.Grid>(); // 存储网格图图层实例

  /** 初始化网格图图层 */
  const initGrid = () => {
    if (!map) return;

    const gridInstance = new TMap.visualization.Grid({
      sideLength,
      extrudable,
      colorList,
      heightRange,
      showRange,
      selectOptions,
      enableBloom,
      toggleAnimation,
      zIndex,
      minZoom,
      maxZoom,
      heightScale,
    }).setData(data)
      .addTo(map);
    setInstance(gridInstance);

    gridInstance.setShowRange(gridInstance.getValueRange());
  };

  // @hook 初始化网格图图层
  useEffect(() => {
    if (!instance) initGrid();

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
    instance?.setShowRange(instance.getValueRange());
  }, [data]);

  // @hook 监听网格边长改变
  useEffect(() => {
    instance?.setSideLength(sideLength || 1000);
  }, [sideLength]);

  // @hook 监听网格是否可拔起改变
  useEffect(() => {
    if (instance && extrudable) {
      instance.setExtrudable(extrudable);
    }
  }, [extrudable]);

  // @hook 监听颜色层级改变
  useEffect(() => {
    if (instance && colorList) {
      instance.setColorList(colorList);
    }
  }, [colorList]);

  // @hook 监听高度变化区间改变
  useEffect(() => {
    instance?.setHeightRange(heightRange || [1, 100]);
  }, [heightRange]);

  // @hook 监听聚合数据显示区间范围改变
  useEffect(() => {
    instance?.setShowRange(showRange);
  }, [props.showRange]); // NOTE 如果监听 showRange 会有问题

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

export default GridComponent;
