/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 热力图组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Heat, TMap } from 'tlbs-map-react';
import { Button } from 'tdesign-react';


const loadHeatData = () => new Promise((resolve) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://mapapi.qq.com/web/lbs/visualizationApi/demo/data/heat.js';
  script.addEventListener('load', () => {
    resolve('loaded');
  });
  document.body.appendChild(script);
});

export default () => {
  const heatRef: any = useRef(null); // 热力图图层实例
  const [data, setData] = useState([]);

  loadHeatData().then(() => {
    setData((window as any).heatData);
  });

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', heatRef.current);
  }, []);

  return (
    <div className='demo-box'>
      <div className="action-box">
        <Button type="button" onClick={printInstance}>
          打印图层实例
        </Button>
      </div>
      <TMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          center: { lat: 39.9099, lng: 116.3975 },
          zoom: 12,
          pitch: 45,
          baseMap: { type: 'vector', features: ['base', 'building3d'] },
        }}
      >
        <Heat
          ref={heatRef}
          data={data}
          radius={30}
          height={40}
          min={0}
          max={180}
        />
      </TMap>
    </div>
  );
};
