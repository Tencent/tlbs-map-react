/**
 * compact: true
 * transform: true
 * defaultShowCode: true
 */
/**
 * @desc 网格图组件 demo
 */
import React, { useCallback, useRef, useState } from 'react';
import { Grid, TMap } from 'tlbs-map-react';
import { Button } from 'tdesign-react';
import { GRID_DATA_ARR } from './gridData';

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

export default () => {
  const gridRef: any = useRef(null); // 网格图图层实例
  const [data, setData] = useState(GRID_DATA_ARR);

  /** 打印图层实例 */
  const printInstance = useCallback(() => {
    console.log('🚀🚀🚀  打印图层实例', gridRef.current);
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
        <Button type="button" onClick={() => setData(getRandomElementsFromArray(GRID_DATA_ARR, 2000))}>
          切换数据
        </Button>
      </div>
      <TMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          center: { lat: 39.9841, lng: 116.3075 },
          zoom: 10,
          pitch: 45,
          baseMap: { type: 'vector', features: ['base', 'building3d'] },
        }}
      >
        <Grid
          ref={gridRef}
          data={data}
          extrudable={false}
          options={{
            selectOptions: {
              action: 'hover',
              style: '#E9AB1D',
              enableHighlight: false,
            },
          }}
          onClick={clickHandler}
        />
      </TMap>
    </div>
  );
};
