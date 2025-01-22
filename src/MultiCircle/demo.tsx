
import React, { useCallback, useRef, useState } from 'react';
import { MultiCircle, BaseMap } from 'tlbs-map-react';
import { Button } from 'tdesign-react';

/** 样式 */
const styles = {
  circleStyle1: {
    color: 'rgba(41,91,255,0.16)',
    showBorder: true,
    borderColor: 'rgba(41,91,255,1)',
    borderWidth: 2,
  },
  circleStyle2: {
    color: 'rgba(41,91,255, 0.6)',
    showBorder: true,
    borderColor: 'rgba(41,91,255,1)',
    borderWidth: 2,
  },
};

/** 数据 */
const geometriesData1 = [{
  styleId: 'circleStyle1',
  center: { lat: 40.0404, lng: 116.2735 },
  radius: 100,
}];
const geometriesData2 = [{
  styleId: 'circleStyle2',
  center: { lat: 40.0415, lng: 116.2763 },
  radius: 100,
}];


export default () => {
  const layerRef: any = useRef(null); // 图层实例

  const [geometries, setGeometries] = useState(geometriesData1);
  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', layerRef.current);
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
          center: { lat: 40.0404, lng: 116.2735 },
          zoom: 17,
          baseMap: { type: 'vector', features: ['base', 'building3d'] },
        }}
      >
        <MultiCircle
          ref={layerRef}
          geometries={geometries}
          styles={styles}
        />
      </BaseMap>
    </div>
  );
};
