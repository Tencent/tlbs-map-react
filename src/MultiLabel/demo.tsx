/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 文本标记组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'tdesign-react';
import { MultiLabel, TMap } from 'tlbs-map-react';

/** 样式 */
const styles = {
  multiLabelStyle1: {
    color: '#3777FF',
    size: 20,
  },
  multiLabelStyle2: {
    color: '#D54440',
    size: 20,
  },
};

/** 数据 */
const geometriesData1 = [{
  styleId: 'multiLabelStyle1',
  position: { lat: 40.0404, lng: 116.2735 },
  content: '腾讯北京总部大楼',
}];
const geometriesData2 = [{
  styleId: 'multiLabelStyle2',
  position: { lat: 40.008352, lng: 116.389672 },
  content: '亚洲金融大厦',
}];

export default () => {
  const labelRef: any = useRef(null);
  const [geometries, setGeometries] = useState(geometriesData1);

  /**
   * 图层点击事件处理器
   * @param event
   */
  const clickHandler = useCallback((event: TMap.MapEvent) => {
    console.log('🚀🚀🚀 图层点击事件', event);
  }, []);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', labelRef.current);
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
          亚洲金融大厦
        </Button>
      </div>
      <TMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 12,
        }}
      >
        <MultiLabel
          ref={labelRef}
          styles={styles}
          geometries={geometries}
          onClick={clickHandler}
        />
      </TMap>
    </div>
  );
};
