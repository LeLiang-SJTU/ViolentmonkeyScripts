---
layout: post
---

# 浏览器脚本库

*这是一个我个人的油猴脚本库*
项目地址： https://github.com/LeLiang-SJTU/ViolentmonkeyScripts

## 使用方法

1. 首先安装 Tampermonkey 浏览器扩展
   - [Chrome 商店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox 商店](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge 商店](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. 安装脚本
   - 点击你想安装的脚本文件（.js 结尾）
   - 点击 "Raw" 按钮查看源代码
   - Tampermonkey 会自动识别并提示安装
   - 点击 "安装" 即可

3. 使用脚本
   - 脚本会在匹配的网页上自动运行
   - 可以在 Tampermonkey 的管理面板中开启/关闭脚本

## 脚本列表

### 1. 页面导航及目录 (PagesNav.js)

功能特点：
- 自动生成页面目录
- 快速导航按钮（回到顶部/底部）
- 可拖动的目录面板
- 支持目录项展开/折叠
- 智能高亮当前阅读位置

使用说明：
- 📖 按钮：显示/隐藏目录面板
- ↑ 按钮：快速回到页面顶部
- ↓ 按钮：快速到达页面底部
- 单击目录项：跳转到对应标题
- 双击目录项：展开/折叠该项
- 拖动目录面板：可自由调整位置

适用网站：所有网站