/* eslint-disable @typescript-eslint/naming-convention */
export enum IMAGE_DISPLAY {
  /**
   * 保持图片原状态，不改变图片大小
   */
  ORIGIN = 0,
  /**
   * 拉伸图片以适应显示区域
   */
  SCALE = 1,
  /**
   * 重复图片以铺满显示区域
   */
  REPEAT = 2
}
export enum DEFAULT_CONTROL_ID {
  /**
   * 比例尺控件
   */
  SCALE = 'scale',
  /**
   * 缩放控件
   */
  ZOOM = 'zoom',
  /**
   * 旋转控件
   */
  ROTATION = 'rotation'
}
export enum CONTROL_POSITION {
  /**
   * 左上
   */
  TOP_LEFT = 0,
  /**
   * 顶部中间
   */
  TOP_CENTER = 1,
  /**
   * 右上
   */
  TOP_RIGHT = 2,
  /**
   * 左侧中间
   */
  CENTER_LEFT = 3,
  /**
   * 图区中间
   */
  CENTER = 4,
  /**
   * 右侧中间
   */
  CENTER_RIGHT = 5,
  /**
   * 左下
   */
  BOTTOM_LEFT = 6,
  /**
   * 底部中间
   */
  BOTTOM_CENTER = 7,
  /**
   * 右下
   */
  BOTTOM_RIGHT = 8
}
export enum LAYER_LEVEL {
  /**
   * 地下层，底图下方，默认无图层在此层级
   */
  UNDERGROUND = 0,
  /**
   * 基础底图层，底图平面元素所在层级
   */
  BASE = 1,
  /**
   * 贴地层，用户创建的平面图层所在层级
   */
  GROUND = 2,
  /**
   * 建筑层
   */
  BUILDING = 3,
  /**
   * 需抗锯齿的覆盖物层
   */
  OVERLAY_AA = 4,
  /**
   * 文字层
   */
  TEXT = 6,
  /**
   * 不需抗锯齿的覆盖物层
   */
  OVERLAY_NAA = 7
}
export enum MAP_ZOOM_TYPE {
  /**
   * 默认缩放，双指中心位置（移动端），鼠标的光标位置（PC端）
   */
  DEFAULT = 0,
  /**
   * 	根据地图中心点缩放（移动端和PC端）
   */
  CENTER = 1
}
