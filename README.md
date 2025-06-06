# Smart Online Games

一个基于 GameMonetize Feed 的在线游戏聚合网站，提供丰富的游戏分类和流畅的游戏体验。

## 功能特性

### 游戏展示
- 响应式游戏卡片布局，支持多设备显示
- 游戏分类导航，快速找到感兴趣的游戏
- 游戏详情页面，包含完整游戏信息和操作说明
- 游戏缩略图预览，直观了解游戏内容

### 分类系统
- 预设游戏分类，包括动作、冒险、益智等
- 分类快速切换，左侧固定导航栏
- 分类数据缓存，提升加载速度

### 数据管理
- 基于 GameMonetize Feed 的游戏数据获取
- 本地数据缓存，减少重复请求
- 分页加载，优化性能
- 自动错误处理和重试机制

### 用户体验
- 加载状态提示
- 错误信息友好展示
- 响应式设计，支持各种设备
- 流畅的动画效果

## 技术栈

- HTML5
- CSS3 (自定义样式)
- JavaScript (ES6+)
- GameMonetize Feed API

## 项目结构

```
smart_online_games/
├── index.html          # 主页
├── game.html          # 游戏详情页
├── css/
│   └── styles.css     # 样式文件
├── js/
│   └── rss-fetcher.js # 数据获取模块
└── README.md          # 项目说明
```

## 使用说明

1. 克隆项目到本地
2. 使用本地服务器运行项目（如 Python 的 SimpleHTTPServer）
3. 在浏览器中访问 index.html

### 本地运行

使用 Python 启动本地服务器：

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后在浏览器中访问：`http://localhost:8000`

## 开发说明

### 数据获取
- 使用 GameMonetize Feed API 获取游戏数据
- 支持分类过滤和分页加载
- 实现本地缓存机制，提升性能

### 样式设计
- 自定义 CSS 样式，不依赖外部框架
- 响应式布局，适配各种屏幕尺寸
- 现代化的 UI 设计，提供良好的用户体验

### 性能优化
- 图片懒加载
- 数据分页加载
- 本地数据缓存
- 错误重试机制

## 待优化项目

- [ ] 添加游戏搜索功能
- [ ] 实现游戏收藏功能
- [ ] 添加用户评分系统
- [ ] 优化移动端体验
- [ ] 添加更多游戏分类
- [ ] 实现游戏推荐系统

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License 