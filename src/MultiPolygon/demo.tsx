/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 多边形组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'tdesign-react';
import { MultiPolygon, TMap } from 'tlbs-map-react';

/** 样式 */
const styles = {
  polygon1: {
    color: 'rgba(255, 73, 0, 0.2)',
    borderColor: '#FF4900',
    showBorder: true,
  },
  polygon2: {
    color: 'rgba(255, 206, 0, 0.2)',
    borderColor: '#FC0',
    showBorder: true,
  },
};

/** 数据 */
const geometriesData1 = [
  {
    styleId: 'polygon1',
    paths: [
      { lat: 40.0411, lng: 116.2722 },
      { lat: 40.0394, lng: 116.2726 },
      { lat: 40.0397, lng: 116.2748 },
      { lat: 40.0414, lng: 116.2744 },
    ],
  },
];
const geometriesData2 = [
  {
    styleId: 'polygon2',
    paths: [
      { lat: 40.0418, lng: 116.2750 },
      { lat: 40.0408, lng: 116.2752 },
      { lat: 40.0411, lng: 116.2777 },
      { lat: 40.0421, lng: 116.2774 },
    ],
  },
];

export default () => {
  const polygonRef: any = useRef(null);
  const [geometries, setGeometries] = useState<any>(geometriesData1);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', polygonRef.current);
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
        <Button type="button" onClick={() => setGeometries(geometriesData1)}>
          腾讯北京总部大厦
        </Button>
        <Button type="button" onClick={() => setGeometries(geometriesData2)}>
          北京新浪总部大厦
        </Button>
      </div>
      <TMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 17,
        }}
      >
        <MultiPolygon
          ref={polygonRef}
          styles={styles}
          geometries={geometries}
          onClick={clickHandler}
        />
      </TMap>
    </div>
  );
};
