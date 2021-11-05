# ac-share

React entry-task

## 使用技术栈

> react, hook, typescript, webpack，sass, axios

### dev

```bash
yarn

npm install

yarn

npm run start

```

### build

```bash

npm run build
```

## 目录

```
├── README.md
├── idea                     运行文件
├── config                   webpack配置
├── public                   入口html模版
├── scripts                  webpack 脚本
├── src
│   ├── App.test.tsx    单元测试
│   ├── App.tsx         入口文件
│   ├── assets          静态资源
│   ├── components      公共组件
│   │  ├── TopBar       顶部条组件
│   ├── config          公用常量配置
│   ├── index.css
│   ├── index.tsx
│   ├── pages           页面组件
│   │  ├── Aclist       列表页
│   │  ├── Detail       详情页
│   ├── routes          路由配置
│   ├── typings         ts变量类型声明文件
├── tsconfig.json       tsconfig
└── yarn.lock
```

### 设计思路及过程

- **移动端适配**

```bash
rem
px2rem
```

- **页面设计**

<img src="https://img-blog.csdnimg.cn/20200720140448841.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MTIzOTg1,size_16,color_FFFFFF,t_70" width="600px">

## 收获技能

- react、typescript 基本使用
- react 页面路由处理 HashRouter、Route、Link
- react 项目合理结构，组件化开发
- 使用 scss 写样式
- 使用 axios 网络请求
- 长列表页面按需加载、分页请求
- rem、px2rem 移动端自适应
