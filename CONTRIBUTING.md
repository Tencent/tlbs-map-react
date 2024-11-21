## 参与贡献

本组件库项目基于 [dumi](https://d.umijs.org/) 开发，详细开发指南可参考官网

### 1. 启动项目

```bash
# 安装依赖
$ npm install

# 启动服务
$ npm run dev
```

完成以上步骤，浏览器访问 http://localhost:8000/ 即可调试该项目

### 2. 目录结构

```bash
├── src                     # 组件库源码目录
│   ├── TMap                # 单个组件
│   │   ├── index.tsx       # 组件源码
│   │   ├── demo.tsx        # 组件示例代码
│   │   └── index.md        # 组件文档
│   ├── utils.ts            # 公共工具函数
│   ├── index.ts            # 组件库入口文件
└── .dumirc.ts              # dumi 配置文件
```

### 3. 注意事项

- src 中每个文件夹代表一个组件，文件夹命名使用大驼峰命名法（PascalCase）
- 每个组件文件夹中包含三个文件：
  - index.tsx 组件源码
  - demo.tsx 组件示例代码
  - index.md 组件文档（在组件文档中通过 `<code src="./demo.tsx"></code>` 即可引用组件示例）
- 新增组件后需在 `src/index.ts` 中 暴露组件
- 在 `.dumirc.ts` 中配置 `sidebar` 来控制组件文档的显示，注意这里的 `link` 要用短横线命名法（kebab-case）
- 在组件文档中说明组件 props
- 在项目根目录执行`npm run new`能够快速创建上述组件文件

### 4. 分支规范

- 新组件分支从 `dev checkout`
- 如果是贡献组件，则从 `dev checkout` 分支如：`feat/marker-cluster`

### 5. 提交规范

遵守 Angular 团队的 [Commit Message 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)，保持项目的一致性。

### 6. 其他

欢迎通过提交 [pull requests]() 或创建 GitHub [issue]() 来分享
