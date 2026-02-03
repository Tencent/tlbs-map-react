import React, { useRef } from 'react';
import { Editor, TMap } from 'tlbs-map-react';

export default () => {
  const editorRef: any = useRef(null);
  const callBack = (res: any) => console.log('绘制完成', res);

  return (
    <div className='demo-box'>
      <TMap
        apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        options={{
          zoom: 17,
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
          <Editor
            ref={editorRef}
            editors={['POLYLINE', 'POLYGON', 'CIRCLE', 'RECTANGLE', 'ELLIPSE']} // 一共支持五种编辑器，可按需自选
            snappable={true} // 吸附功能
            selectable={true} // 点选功能
            onDrawComplete={callBack} // 绘制完成回调
          />
        </div>
      </TMap>
    </div>
  );
};
