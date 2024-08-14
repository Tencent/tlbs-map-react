// dumi 编译时配置
import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/',
  publicPath: '/web/tlbs-map-react/',
  outputPath: 'docs-dist',
  history: {
    type: 'hash',
  },
  // 主题配置
  themeConfig: {
    name: '腾讯位置服务', // 导航栏上的站点名称
    logo: false, // 导航栏上的站点 LOGO
    // 顶部导航
    nav: [
      {
        title: '快速上手',
        link: '/guide',
      },
      {
        title: '组件 Demo',
        link: '/components/t-map',
      },
    ],
    // 侧边菜单栏
    sidebar: {
      '/components': [
        {
          title: '地图组件',
          children: [{ title: '地图', link: '/components/t-map' }],
        },
        {
          title: '标记组件',
          children: [
            { title: '点标记', link: '/components/multi-marker' },
            { title: '文本标记', link: '/components/multi-label' },
            { title: '矢量折线', link: '/components/multi-polyline' },
            { title: '矢量多边形', link: '/components/multi-polygon' },
            { title: '信息窗体', link: '/components/info-window' },
          ],
        },
        {
          title: '可视化组件',
          children: [
            { title: '热力图', link: '/components/heat' },
            { title: '网格图', link: '/components/grid' },
            { title: '区域图', link: '/components/area' },
            { title: '弧线图', link: '/components/arc' },
          ],
        },
      ],
    },
    // 展示代码行号
    showLineNum: true,
    // 站点的主题色
    prefersColor: { default: 'auto', switch: true },
    // 站点底部信息
    footer: false
  },
  // 自定义样式
  styles: [
    `
      .dumi-default-header-content .dumi-default-header-left {
        width: 220px;
        .dumi-default-logo {
          font-family: TencentSans-W7;
          font-size: 24px;
          img {
            height: 30px;
          }
        }
      }
      main .dumi-default-sidebar {
        width: 220px;
      }
      .dumi-default-doc-layout {
        .dumi-default-hero::before {
          background: none;
        }
        .dumi-default-hero-title span{
          color: #0052D9;
          font-family: TencentSans-W7;
          font-size: 144px;
          text-shadow: none;
          background: none;
        }
      }
    `,
  ]
});
