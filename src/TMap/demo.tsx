/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 地图组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'tdesign-react';
import { BaseMap } from 'tlbs-map-react';

export default () => {
  // 通过 mapRef.current 拿到地图实例，但是需要等待地图加载完成
  const mapRef = useRef<any>();
  const [center, setCenter] = useState({ lat: 40.0404, lng: 116.2735 });
  const [showControl, setShowControl] = useState(true);

  /** 打印地图实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印地图实例', mapRef.current);
  }, []);

  /**
   * 地图初始化完成事件处理器
   * @param event
   */
  const onMapInited = useCallback(() => {
    console.log('🚀🚀🚀 地图加载完成', mapRef.current);
  }, []);

  /**
   * 地图点击事件处理器
   * @param event
   */
  const clickHandler = useCallback((event: TMap.MapEvent) => {
    console.log('🚀🚀🚀 地图点击事件', event);
  }, []);

  return (
    <div className='demo-box'>
      <div className='action-box'>
        <Button type="button" onClick={printInstance}>
          打印地图实例
        </Button>
        <Button type="button" onClick={() => setCenter({ lat: 40.0404, lng: 116.2735 })}>
          腾讯北京总部大楼
        </Button>
        <Button type="button" onClick={() => setCenter({ lat: 40.0415, lng: 116.2763 })}>
          北京新浪总部大楼
        </Button>
        <Button type="button" onClick={() => setShowControl(showControl => !showControl)}>
          切换控件显示与隐藏
        </Button>
      </div>
      <BaseMap
        ref={mapRef}
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        control = {{
          zoom: {
            position: 'topRight',
            className: 'tmap-zoom-control-box',
            numVisible: true,
          },
        }}
        options={{
          center,
          zoom: 17,
          showControl,
        }}
        onClick={clickHandler}
        onMapInited={onMapInited}
      />
    </div>
  );
};
