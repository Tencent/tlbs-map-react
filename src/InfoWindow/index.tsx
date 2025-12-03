/**
 * @desc 信息窗体组件
 */
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext } from 'tlbs-map-react';

interface InfoWindowProps {
  /**
   * 是否显示信息窗体
   */
  visible?: boolean;
  /**
   * 信息窗的经纬度坐标
   */
  position?: TMap.LatLngData;
  /**
   * 信息窗显示内容，默认为空字符串。当enableCustom为true时，需传入信息窗体的dom字符串
   */
  content?: string;
  /**
   * GL API 参数
   */
  options?: Omit<TMap.InfoWindowOptions, 'map' | 'position' | 'content'>;
  [key: string]: any;
}

const InfoWindowComponent: FC<InfoWindowProps> = React.forwardRef((props, ref) => {
  const {
    visible = true,
    position = { lat: 40.0404, lng: 116.2735 },
    content = '',
    options = {},
  }: InfoWindowProps = props;

  const {
    zIndex,
    offset,
    enableCustom,
  }: Omit<TMap.InfoWindowOptions, 'map' | 'position' | 'content'> = options || {};

  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState<TMap.InfoWindow>(); // 存储信息窗体图层实例

  /** 初始化信息窗体图层 */
  const initInfoWindow = () => {
    if (!map) return;

    const infoWindowInstance = new TMap.InfoWindow({
      map,
      position: new TMap.LatLng(position.lat, position.lng),
      content,
      zIndex,
      offset,
      enableCustom,
    });

    if (!visible) {
      infoWindowInstance.close();
    }

    setInstance(infoWindowInstance);

    // 绑定事件：点击信息窗的关闭按钮时会触发此事件
    infoWindowInstance.on('closeclick', () => {
      if (typeof props.onClose === 'function') {
        props.onClose();
      }
      if (typeof props.onCloseclick === 'function') {
        props.onCloseclick();
      }
    });
  };

  // @hook 初始化信息窗体图层
  useEffect(() => {
    if (!instance) initInfoWindow();

    return () => {
      instance?.destroy(); // 销毁信息窗体
      instance?.setMap(null); // 将infoWindow从Map中移除
    };
  }, [map, instance]);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => instance, [instance]);

  // @hook 监听图层可见性改变
  useEffect(() => {
    visible ? instance?.open() : instance?.close();
  }, [visible]);

  // @hook 监听位置改变
  useEffect(() => {
    instance?.setPosition(new TMap.LatLng(position?.lat, position?.lng));
  }, [position]);

  // @hook 监听内容改变
  useEffect(() => {
    instance?.setContent(content);
  }, [content]);

  return null;
});

export default InfoWindowComponent;
