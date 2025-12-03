/**
 * @desc 地图组件
 */
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { MapContext, useEventListener } from 'tlbs-map-react';
import { ControlProps, CustomMapOptions } from 'tlbs-map-react/interfaces';

// 加载地图资源标签
let script: HTMLScriptElement;
// 加载地图资源回调数组
const resolveArr: ((value: unknown) => void)[] = [];

/**
 * 异步加载地图资源
 * @param key 地图 key
 * @param libraries 地图附加库
 */
const loadScript = async (key: string, libraries?: string) => new Promise((resolve) => {
  if (window.TMap) {
    resolve(true);
    return;
  }

  // @important 这种写法可以同时展示多个地图
  resolveArr.push(resolve);

  if (!window.initGLMap) {
    window.initGLMap = () => {
      resolveArr.forEach((resolve) => {
        resolve(true);
      });
    };
  }

  // 防止标签多次加载
  if (!script) {
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = libraries
      ? `https://map.qq.com/api/gljs?v=1.exp&key=${key}&libraries=${libraries}&callback=initGLMap`
      : `https://map.qq.com/api/gljs?v=1.exp&key=${key}&callback=initGLMap`;
    document.body.appendChild(script);
  }
});

/**
 * 设置地图控件的函数
 * @param map 地图实例
 * @param controlId 地图控件 ID
 * @param config 地图控件配置
 */
const setMapControl = (map: TMap.Map, showControl: boolean, control?: ControlProps) => {
  const CONTROL_ID: any = {
    scale: 'scale' as TMap.constants.DEFAULT_CONTROL_ID.SCALE,
    zoom: 'zoom' as TMap.constants.DEFAULT_CONTROL_ID.ZOOM,
    rotation: 'rotation' as TMap.constants.DEFAULT_CONTROL_ID.ROTATION,
  };
  const CONTROL_POSITION = {
    topLeft: TMap.constants.CONTROL_POSITION.TOP_LEFT,
    topCenter: TMap.constants.CONTROL_POSITION.TOP_CENTER,
    topRight: TMap.constants.CONTROL_POSITION.TOP_RIGHT,
    centerLeft: TMap.constants.CONTROL_POSITION.CENTER_LEFT,
    center: TMap.constants.CONTROL_POSITION.CENTER,
    centerRight: TMap.constants.CONTROL_POSITION.CENTER_RIGHT,
    bottomLeft: TMap.constants.CONTROL_POSITION.BOTTOM_LEFT,
    bottomCenter: TMap.constants.CONTROL_POSITION.BOTTOM_CENTER,
    bottomRight: TMap.constants.CONTROL_POSITION.BOTTOM_RIGHT,
  };

  if (!map) return;
  // 不显示控件
  if (!showControl) {
    Object.keys(CONTROL_ID).forEach(item => map.removeControl(CONTROL_ID[item]));
    return;
  }

  // 遍历设置三个控件
  Object.keys(CONTROL_ID).forEach((item) => {
    // 获取控件实例
    const controlIns = map.getControl(CONTROL_ID[item]);
    // 如果控件实例被移除过，则需要重新添加
    // @ts-ignore
    if (!controlIns.map) {
      map.addControl(controlIns);
    }
    if (control) {
      // 如果没有传递该控件位置和类名，则移除该控件
      if (!control[item as 'scale' | 'zoom' | 'rotation']) {
        map.removeControl(CONTROL_ID[item]);
      }
      // 解构控件参数并设置控件位置和类名
      const { position, className, numVisible } = control[item as 'scale' | 'zoom' | 'rotation'] || {};
      position && controlIns.setPosition(CONTROL_POSITION[position]);
      className && controlIns.setClassName(className);
      item === 'zoom' && (controlIns as TMap.ZoomControl).setNumVisible(!!numVisible);
    }
  });
};

// @type 地图实例参数类型
interface TMapProps {
  /**
   * 地图 key
   */
  apiKey: string;
  /**
   * 附加库
   */
  libraries?: string;
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: Record<string, string>;
  /**
   * 地图控件
   */
  control?: ControlProps;
  /**
   * 动画时间
   */
  duration?: number;
  /**
   * GL API 参数
   */
  options?: CustomMapOptions;
  [key: string]: any;
}

// 地图组件
const TMapComponent: React.FC<TMapProps> = React.forwardRef((props, ref) => {
  // 结构 props 并设置默认值
  const {
    apiKey = '',
    libraries = 'visualization,geometry,tools',
    className = 'tmap-container',
    style = { height: '100%', width: '100%' },
    control = undefined,
    duration = 500,
    options = {},
    children,
  }: TMapProps = props as TMapProps;
  const {
    center = { lat: 40.0404, lng: 116.2735 },
    zoom = 12,
    minZoom = 3,
    maxZoom = 20,
    rotation = 0,
    pitch = 0,
    scale = 1,
    offset = { x: 0, y: 0 },
    draggable = true,
    scrollable = true,
    pitchable = true,
    rotatable = true,
    doubleClickZoom = true,
    mapZoomType,
    boundary = undefined,
    mapStyleId,
    baseMap = { type: 'vector' },
    viewMode = '3D',
    showControl = true,
    renderOptions,
    clip,
  }: CustomMapOptions = options;

  const [map, setMap] = useState<TMap.Map>(); // 存储地图实例
  const domRef = useRef<HTMLDivElement>(null); // 地图容器
  let isInitMapInstance = false;

  /** 初始化地图 */
  const initMap = async () => {
    // 加载地图资源
    try {
      const result = await loadScript(apiKey, libraries);
      if (result && domRef.current && !isInitMapInstance) {
        // 创建地图实例
        const mapInstance = new TMap.Map(domRef.current, {
          center: new TMap.LatLng(center.lat, center.lng),
          zoom,
          minZoom,
          maxZoom,
          rotation,
          pitch,
          scale,
          offset,
          draggable,
          scrollable,
          pitchable,
          rotatable,
          doubleClickZoom,
          mapZoomType,
          boundary: boundary ? new TMap.LatLngBounds(
            new TMap.LatLng(boundary.sw.lat, boundary.sw.lng),
            new TMap.LatLng(boundary.ne.lat, boundary.ne.lng),
          ) : undefined,
          mapStyleId,
          baseMap,
          viewMode,
          showControl,
          renderOptions,
          clip,
        });
        isInitMapInstance = true;
        setMap(mapInstance);

        // 设置地图控件
        setMapControl(mapInstance, showControl, control);
        if (props.onMapInited) {
          // 延迟触发，保证在事件回调中获取到地图及图层实例
          setTimeout(() => {
            props.onMapInited(mapInstance);
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // @hook 初始化地图
  useEffect(() => {
    if (!map) initMap();

    return () => map?.destroy();
  }, []);

  // @hook 绑定事件
  useEventListener(map, props);

  // @hook 让父组件能够通过 ref 访问到子组件内部的 map 地图实例
  useImperativeHandle(ref, () => map, [map]);

  // @memo 缓存中心点,避免引用变化导致不必要的地图中心点更新
  const memoizedCenter = useMemo(() => center, [center.lat, center.lng]);

  // @memo 缓存偏移量,避免引用变化导致不必要的更新
  const memoizedOffset = useMemo(() => offset, [offset.x, offset.y]);

  // @memo 缓存边界配置,避免引用变化导致不必要的更新
  const memoizedBoundary = useMemo(() => boundary, [
    boundary?.sw?.lat,
    boundary?.sw?.lng,
    boundary?.ne?.lat,
    boundary?.ne?.lng,
  ]);

  // @hook 监听地图中心点改变
  useEffect(() => {
    map?.panTo(new TMap.LatLng(memoizedCenter.lat, memoizedCenter.lng), { duration });
  }, [memoizedCenter]);

  // @hook 监听地图缩放级别改变
  useEffect(() => {
    map?.zoomTo(zoom, { duration });
  }, [zoom]);

  // @hook 监听地图最小缩放级别改变
  useEffect(() => {
    map?.setMinZoom(minZoom);
  }, [minZoom]);

  // @hook 监听地图最大缩放级别改变
  useEffect(() => {
    map?.setMaxZoom(maxZoom);
  }, [maxZoom]);

  // @hook 监听地图水平旋转角度改变
  useEffect(() => {
    map?.rotateTo(rotation, { duration });
  }, [rotation]);

  // @hook 监听地图俯仰角度改变
  useEffect(() => {
    map?.pitchTo(pitch, { duration: duration! });
  }, [pitch]);

  // @hook 监听地图显示比例改变
  useEffect(() => {
    map?.setScale(scale);
  }, [scale]);

  // @hook 监听地图中心与容器的偏移量改变
  useEffect(() => {
    map?.setOffset(memoizedOffset);
  }, [memoizedOffset]);

  // @hook 监听地图是否可拖拽
  useEffect(() => {
    map?.setDraggable(draggable);
  }, [draggable]);

  // @hook 监听地图是否可鼠标滚轮缩放地图
  useEffect(() => {
    map?.setScrollable(scrollable);
  }, [scrollable]);

  // @hook 监听地图是否可可调节俯仰
  useEffect(() => {
    map?.setPitchable(pitchable);
  }, [pitchable]);

  // @hook 监听地图可调节旋转
  useEffect(() => {
    map?.setRotatable(rotatable);
  }, [rotatable]);

  // @hook 监听地图是否可双击缩放地图
  useEffect(() => {
    map?.setDoubleClickZoom(doubleClickZoom);
  }, [doubleClickZoom]);

  // @hook 监听地图边界改变
  useEffect(() => {
    if (memoizedBoundary) {
      map?.setBoundary(new TMap.LatLngBounds(
        new TMap.LatLng(memoizedBoundary.sw.lat, memoizedBoundary.sw.lng),
        new TMap.LatLng(memoizedBoundary.ne.lat, memoizedBoundary.ne.lng),
      ));
    }
  }, [memoizedBoundary]);

  // @hook 监听地图底图改变
  useEffect(() => {
    map?.setBaseMap(baseMap);
  }, [baseMap]);

  // @hook 监听地图视图模式改变
  useEffect(() => {
    map?.setViewMode(viewMode);
  }, [viewMode]);

  // @hook 监听地图控件改变
  useEffect(() => {
    if (map) {
      setMapControl(map, showControl, control);
    }
  }, [showControl, control]);

  // @component 渲染子组件
  const childrenNode = useMemo(() => React.Children.map(children, (child) => {
    if (!map) return;

    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
  }), [map, children]);

  return (
    <MapContext.Provider value={map}>
      <div ref={domRef} className={className} style={style}>
        {childrenNode}
      </div>
    </MapContext.Provider>
  );
});

export default TMapComponent;


