/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 区域图组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Area, TMap } from 'tlbs-map-react';
import { AREA_DATA_ARR } from './areaData';
import { Button } from 'tdesign-react';

/**
 * 从数组中随即取元素
 * @param arr
 * @param num
 */
const getRandomElementsFromArray = (arr: any[], num: number) => {
  // 如果数组长度小于等于需要取出的元素数量，则返回整个数组
  if (arr.length <= num) {
    return arr;
  }

  // 将数组中的元素洗牌
  const shuffled = arr.sort(() => 0.5 - Math.random());

  // 返回洗牌后的数组的前 num 个元素
  return shuffled.slice(0, num);
};

/**
 * 设置样式
 * @param opacity
 */
const setStyles = (opacity: number) => ({
  fillColor: `rgba(56, 124, 234, ${opacity})`,
  strokeColor: '#6799EA',
});

export default () => {
  const areaRef: any = useRef(null); // 区域图图层实例
  const [data, setData] = useState(AREA_DATA_ARR);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', areaRef.current);
  }, []);

  /**
   * 图层点击事件处理器
   * @param event
   */
  const clickHandler = useCallback((event: TMap.visualization.VisualEvent) => {
    console.log('🚀🚀🚀 图层点击事件', event);
  }, []);

  return (
    <div className='demo-box'>
      <div className="action-box">
        <Button type="button" onClick={printInstance}>
          打印图层实例
        </Button>
        <Button type="button" onClick={() => setData(getRandomElementsFromArray(AREA_DATA_ARR, 20))}>
          切换数据
        </Button>
      </div>
      <TMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          center: { lat: 40.0460, lng: 116.2868 },
          zoom: 15,
          baseMap: { type: 'vector', features: ['base', 'building3d'] },
        }}
      >
        <Area
          ref={areaRef}
          data={data}
          styles={{
            styel1: setStyles(0.8),
            styel2: setStyles(0.5),
            styel3: setStyles(0.2),
          }}
          options={{
            selectOptions: {
              action: 'hover',
              enableHighlight: false,
              style: {
                fillColor: 'rgba(28,213,255,0.8)',
                strokeColor: '#fff',
                strokeWidth: 1,
                strokeDashArray: [0, 0],
              },
            },
          }}
          onClick={clickHandler}
        />
      </TMap>
    </div>
  );
};
