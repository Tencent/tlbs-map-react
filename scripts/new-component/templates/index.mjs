export const getComponentCode = name => `
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { MapContext } from 'tlbs-map-react';

interface Props {

}

const ${name}Component: FC<Props> = React.forwardRef((props, ref) => {
  const map = useContext(MapContext); // 获取地图实例
  const [instance, setInstance] = useState(); // 存储图层实例

  /** 初始化图层 */
  const init${name} = () => {
    if (!map) return;
    // 图层初始化代码

  };

  // @hook 初始化图层
  useEffect(() => {
    if (!instance) init${name}();

    return () => {
      // 图层销毁
    };
  }, [map, instance]);

  return null;
});

export default ${name}Component;
`;

export const getDocCode = (name, zhName) => `
# ${zhName} ${name}

**1. 组件示例**

<code src="./demo.tsx"></code>
:::info{title=提示}
点击地图下方最右侧图标 \`</>\` 可展开代码
:::

**2. 组件 Props**
| 属性        | 类型  | 说明                          | 可选性 | 默认值     |
| :---------- | :--------------------------------------------------------------------------------- | :---------------------------- | :----- | :--------- |

`;

export const getDemoCode = (name, zhName) => `
import React, { useCallback, useRef, useState } from 'react';
import { ${name}, BaseMap } from 'tlbs-map-react';
import { Button } from 'tdesign-react';

export default () => {
  const layerRef: any = useRef(null); // 图层实例

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
      </div>
      <BaseMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          center: { lat: 37.8079, lng: 112.2690 },
          zoom: 5,
          pitch: 30,
          baseMap: { type: 'vector', features: ['base', 'building3d'] },
        }}
      >
        <${name}
          ref={layerRef}
        />
      </BaseMap>
    </div>
  );
};
`;
