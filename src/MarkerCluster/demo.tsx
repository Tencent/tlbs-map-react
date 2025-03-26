/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 点聚合组件 demo
 */
import React, { useCallback, useRef } from 'react';
import { Button } from 'tdesign-react';
import { MarkerCluster, BaseMap } from 'tlbs-map-react';

/** 数据 */
const geometries = [
  {
    position: { lat: 39.953416, lng: 116.480945 },
  },
  {
    position: { lat: 39.984104, lng: 116.407503 },
  },
  {
    position: { lat: 39.908802, lng: 116.497502 },
  },
  {
    position: { lat: 40.040417, lng: 116.373514 },
  },
  {
    position: { lat: 39.953416, lng: 116.380945 },
  },
  {
    position: { lat: 39.984104, lng: 116.307503 },
  },
  {
    position: { lat: 39.908802, lng: 116.397502 },
  },
  {
    position: { lat: 40.040417, lng: 116.273514 },
  },
];

export default () => {
  const markerClusterRef: any = useRef(null);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', markerClusterRef.current);
  }, []);

  /**
   * 图层点击事件处理器
   * @param event
   */
  const clickHandler = useCallback((event: TMap.MapEvent) => {
    console.log('🚀🚀🚀 图层点击事件', event);
  }, []);

  return (
    <div className='demo-box'>
      <div className="action-box">
        <Button type="button" onClick={printInstance}>
          打印图层实例
        </Button>
      </div>
      <BaseMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 10,
        }}
      >
        <MarkerCluster
          ref={markerClusterRef}
          geometries={geometries}
          onClick={clickHandler}
        />
      </BaseMap>
    </div>
  );
};
