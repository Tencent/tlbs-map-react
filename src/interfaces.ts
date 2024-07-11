/* ------------------------- TMap ------------------------- */
// @type 地图控件配置类型
export interface ControlConfig {
  position?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  className?: string;
  numVisible?: boolean;
}

// @type 地图控件参数类型
export interface ControlProps {
  scale?: ControlConfig;
  zoom?: ControlConfig;
  rotation?: ControlConfig;
}

// @type 地图实例类型
export interface CustomMapOptions extends Omit<TMap.MapOptions, 'center' | 'boundary'> {
  center?: TMap.LatLngData;
  boundary?: { sw: TMap.LatLngData; ne: TMap.LatLngData };
}

/* ------------------------- Marker ------------------------- */
export interface CustomPointGeometry extends Omit<TMap.PointGeometry, 'position'> {
  position: TMap.LatLngData;
}

/* ------------------------- Label ------------------------- */
export interface CustomLabelGeometry extends Omit<TMap.LabelGeometry, 'position'> {
  position: TMap.LatLngData;
}

/* ------------------------- Polyline ------------------------- */
export interface CustomPolylineGeometry extends Omit<TMap.PolylineGeometry, 'paths' | 'rainbowPaths'> {
  paths?: TMap.LatLngData[] | TMap.LatLngData[][];
  rainbowPaths?: Array<{
    path: TMap.LatLngData[];
    color?: string;
    borderColor?: string;
  }>;
}

/* ------------------------- Polygon ------------------------- */
export interface CustomPolygonGeometry extends Omit<TMap.PolygonGeometry, 'paths'> {
  paths: TMap.LatLngData[] | TMap.LatLngData[][] | TMap.LatLngData[][][];
}

/* ------------------------- Arc ------------------------- */
export interface CustomArcLine extends Omit<TMap.visualization.ArcLine, 'from' | 'to'> {
  from: TMap.LatLngData;
  to: TMap.LatLngData;
}
