/**
 * @desc 多边形编辑组件
 */
import { MapContext, useEventListener } from 'tlbs-map-react';
import React, { useContext, useEffect, useImperativeHandle, useState, type FC } from 'react';
import './index.css';

type EditorType = 'POLYLINE' | 'POLYGON' | 'CIRCLE' | 'RECTANGLE' | 'ELLIPSE';
type GeometryOverlay = TMap.MultiPolyline | TMap.MultiPolygon | TMap.MultiCircle | TMap.MultiRectangle | TMap.MultiEllipse;

interface EditableOverlay {
  overlay: GeometryOverlay;
  id: string;
  name?: string;
  drawingStyleId?: string;
  selectedStyleId?: string;
}

interface EditorProps {
  /**
   * 编辑器类型，可传入多个一次性创建多个编辑器
   */
  editors: EditorType[];
  /**
   * 是否开启吸附
   */
  snappable?: boolean;
  /**
   * 是否开启点选功能
   */
  selectable?: boolean;
  /**
   * 绘制完成后的回调函数
   */
  onDrawComplete?: Function;
}

export const Editor = React.forwardRef<any, EditorProps>((props, ref) => {
  const {
    editors,
    snappable = false,
    selectable = false,
    onDrawComplete,
  } = props;

  const EDITOR_ICON = {
    POLYLINE: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polyline.png',
    POLYGON: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polygon.png',
    CIRCLE: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/circle.png',
    RECTANGLE: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/rectangle.png',
    ELLIPSE: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/ellipse.png',
  };

  const ACTION_MODE = {
    DRAW: TMap.tools.constants.EDITOR_ACTION.DRAW,
    INTERACT: TMap.tools.constants.EDITOR_ACTION.INTERACT,
  };

  const map = useContext(MapContext); // 获取地图实例
  const overlayList: EditableOverlay[] = []; // 存储可编辑图层
  const [activeEditor, setActiveEditor] = useState<EditorType>(editors[0]); // 当前激活的编辑器
  const [isActived, setIsActived] = useState<boolean>(true); // 是否处于激活状态
  const [editorInstance, setEditorInstance] = useState<TMap.tools.GeometryEditor>(); // 存储编辑器实例

  const initEditor = () => {
    if (!map) return;

    const editor = new TMap.tools.GeometryEditor({
      map,
      overlayList,
      actionMode: ACTION_MODE.DRAW,
      activeOverlayId: editors[0], // 默认激活第一个
      snappable,
    });
    setEditorInstance(editor);
    editorInstance?.setSelectable(selectable);
  };

  const createOverlay = (overLay: string) => {
    switch (overLay) {
      case 'POLYLINE':
        return new TMap.MultiPolyline({ map });
      case 'POLYGON':
        return new TMap.MultiPolygon({ map });
      case 'CIRCLE':
        return new TMap.MultiCircle({ map });
      case 'RECTANGLE':
        return new TMap.MultiRectangle({ map });
      case 'ELLIPSE':
        return new TMap.MultiEllipse({ map });
      default:
        return undefined;
    }
  };

  editors.forEach((editor) => {
    const overlay = createOverlay(editor);
    if (overlay) {
      // 创建编辑器实例
      const overlayInstance = {
        overlay,
        id: editor,
      };
      overlayList.push(overlayInstance);
    }
  });

  // @hook 初始化编辑器
  useEffect(() => {
    if (!editorInstance) initEditor();
  }, [map, editorInstance]);

  useEventListener(editorInstance, props as unknown as Record<string, unknown>);

  // @hook 给父组件暴露实例
  useImperativeHandle(ref, () => editorInstance, [editorInstance]);

  /** 切换编辑器或关闭编辑器 */
  const changeEditor = (editor: EditorType) => {
    if (isActived && editor === activeEditor) {
      // 如果点击的是当前激活的编辑器，则关闭
      setIsActived(false);
      editorInstance?.setActionMode(ACTION_MODE.INTERACT);
      editorInstance?.setSelectable(selectable);
      return;
    }

    // 切换编辑器并激活
    setActiveEditor(editor);
    setIsActived(true);
    editorInstance?.setActiveOverlay(editor);
    editorInstance?.setActionMode(ACTION_MODE.DRAW);
  };

  if (editorInstance && onDrawComplete) {
    // 监听绘制完成事件
    editorInstance.on('draw_complete', (geometries: any) => {
      onDrawComplete(geometries);
    });
  }

  return (
    <div
      className='toolbar'
      style={{ width: `${editors.length * 40}px` }}
    >
      {editors.map(editor => (
        <button
          key={editor}
          type="button"
          style={{
            backgroundImage: `url(${EDITOR_ICON[editor]})`,
            backgroundColor: `${isActived && activeEditor === editor ? '#d5dff2' : '#fff'}`,
          }}
          onClick={() => changeEditor(editor)}
          className="editor-btn"
        ></button>
      ))}
    </div>
  );
});

export default Editor;
