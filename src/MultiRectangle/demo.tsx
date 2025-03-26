/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 矩形组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'tdesign-react';
import { MultiRectangle, BaseMap } from 'tlbs-map-react';

/** 样式 */
const styles = {
  rectangle1: {
    color: 'rgba(255, 73, 0, 0.2)',
    borderColor: '#FF4900',
    showBorder: true,
  },
  rectangle2: {
    color: 'rgba(255, 206, 0, 0.2)',
    borderColor: '#FC0',
    showBorder: true,
  },
};

/** 数据 */
const geometriesData1 = [
  {
    styleId: 'rectangle1',
    center: { lat: 40.0404, lng: 116.2735 },
    width: 100,
    height: 200,
  },
];
const geometriesData2 = [
  {
    styleId: 'rectangle2',
    center: { lat: 40.0415, lng: 116.2763 },
    width: 200,
    height: 100,
  },
];

export default () => {
  const rectangleRef: any = useRef(null);
  const [geometries, setGeometries] = useState(geometriesData1);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', rectangleRef.current);
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
      <BaseMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 17,
        }}
      >
        <MultiRectangle
          ref={rectangleRef}
          styles={styles}
          geometries={geometries}
          onClick={clickHandler}
        />
      </BaseMap>
    </div>
  );
};
