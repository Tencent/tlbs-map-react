/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 信息窗体组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'tdesign-react';
import { InfoWindow, BaseMap } from 'tlbs-map-react';

export default () => {
  const infoWindowRef: any = useRef(null);
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ lat: 40.0404, lng: 116.2735 });

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', infoWindowRef?.current?.InfoWindowLayer);
  }, []);

  return (
    <div className='demo-box'>
      <div className="action-box">
        <Button type="button" onClick={printInstance}>
          打印图层实例
        </Button>
        <Button type="button" onClick={() => setVisible(true)}>
          打开信息窗体
        </Button>
        <Button type="button" onClick={() => setPosition({ lat: 40.0404, lng: 116.2735 })}>
          腾讯北京总部大楼
        </Button>
        <Button type="button" onClick={() => setPosition({ lat: 40.0415, lng: 116.2763 })}>
          北京新浪总部大楼
        </Button>
      </div>
      <BaseMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 17,
        }}
      >
        <InfoWindow
          ref={infoWindowRef}
          visible={visible}
          position={position}
          content='Hello, world !'
          onCloseclick={() => {
            setVisible(false);
            console.log('🚀🚀🚀 关闭信息窗体');
          }}
        />
      </BaseMap>
    </div>
  );
};
