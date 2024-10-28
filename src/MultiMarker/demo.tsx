/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 点标记组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'tdesign-react';
import { MultiMarker, BaseMap } from 'tlbs-map-react';

/** 样式 */
const styles = {
  multiMarkerStyle1: {
    width: 20,
    height: 30,
    anchor: { x: 10, y: 30 },
  },
  multiMarkerStyle2: {
    width: 20,
    height: 30,
    anchor: { x: 10, y: 30 },
    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png',
  },
};

/** 数据 */
const geometriesData1 = [{
  styleId: 'multiMarkerStyle1',
  position: { lat: 40.0404, lng: 116.2735 },
}];
const geometriesData2 = [{
  styleId: 'multiMarkerStyle2',
  position: { lat: 40.0415, lng: 116.2763 },
}];

export default () => {
  const markerRef: any = useRef(null); // 点标记图层实例
  const [geometries, setGeometries] = useState(geometriesData1);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', markerRef.current);
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
          腾讯北京总部大楼
        </Button>
        <Button type="button" onClick={() => setGeometries(geometriesData2)}>
          北京新浪总部大楼
        </Button>
      </div>
      <BaseMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 17,
        }}
      >
        <MultiMarker
          ref={markerRef}
          styles={styles}
          geometries={geometries}
          onClick={clickHandler}
        />
      </BaseMap>
    </div>
  );
};
