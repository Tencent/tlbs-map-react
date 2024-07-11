/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 折线组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'tdesign-react';
import { MultiPolyline, TMap } from 'tlbs-map-react';

/** 样式 */
const styles = {
  polyline: {
    color: '#2C68FF',
    width: 5,
    borderWidth: 0,
  },
};

/** 数据 */
const geometriesData1 = [
  // 普通折线
  {
    styleId: 'polyline',
    paths: [
      { lat: 40.0411, lng: 116.2722 },
      { lat: 40.0394, lng: 116.2726 },
      { lat: 40.0397, lng: 116.2748 },
      { lat: 40.0414, lng: 116.2744 },
    ],
  },
];
const geometriesData2 = [
  // 彩虹折线
  {
    styleId: 'polyline',
    rainbowPaths: [
      {
        path: [
          { lat: 40.0415, lng: 116.2715 },
          { lat: 40.0385, lng: 116.2721 },
        ],
        color: '#ED273D',
      },
      {
        path: [
          { lat: 40.0385, lng: 116.2721 },
          { lat: 40.0389, lng: 116.2753 },
        ],
        color: '#2C68FF',
      },
      {
        path: [
          { lat: 40.0389, lng: 116.2753 },
          { lat: 40.0419, lng: 116.2746 },
        ],
        color: '#F19D38',
      },
    ],
  },
];

export default () => {
  const polylineRef: any = useRef(null);
  const [geometries, setGeometries] = useState<any>(geometriesData1);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', polylineRef.current);
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
          普通折线
        </Button>
        <Button type="button" onClick={() => setGeometries(geometriesData2)}>
          彩虹线
        </Button>
      </div>
      <TMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 17,
        }}
      >
        <MultiPolyline
          ref={polylineRef}
          styles={styles}
          geometries={geometries}
          onClick={clickHandler}
        />
      </TMap>
    </div>
  );
};
