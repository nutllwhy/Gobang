# GitHub Pages 部署指南

## ✅ 已完成的配置

1. ✅ 初始化 Git 仓库
2. ✅ 创建 `.gitignore` 文件
3. ✅ 创建 GitHub Actions 自动部署工作流
4. ✅ 提交所有代码到本地仓库
5. ✅ 修复双人模式角色显示bug

## 📋 接下来的步骤

### 1. 在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 填写仓库名称，例如：`gobang-game` 或 `skill-gobang`
3. **不要**初始化任何文件（README、.gitignore、license）
4. 点击 "Create repository"

### 2. 推送代码到 GitHub

在终端中执行以下命令（替换 `<username>` 和 `<repository>` 为你的实际信息）：

```bash
git remote add origin https://github.com/<username>/<repository>.git
git branch -M main
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 "Build and deployment" 部分：
   - **Source**: 选择 `GitHub Actions`
5. 保存设置

### 4. 等待部署完成

1. 点击仓库顶部的 **Actions** 标签
2. 你会看到一个 "Deploy to GitHub Pages" 工作流正在运行
3. 等待绿色的 ✓ 标记出现（通常需要 1-2 分钟）

### 5. 访问你的游戏

部署完成后，你的游戏将可以通过以下地址访问：

```
https://<username>.github.io/<repository>/
```

例如：`https://yourname.github.io/gobang-game/`

## 🔄 后续更新

每次你修改代码后，只需要执行：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub Actions 会自动重新部署你的网站。

## 🎮 游戏特色

- ✅ 支持人机对战和双人对战
- ✅ 3个可选角色，每个角色有独特技能
- ✅ 音效和动画效果
- ✅ 技能克制系统
- ✅ 完全响应式设计

## ⚠️ 注意事项

- 首次推送后，GitHub Pages 可能需要几分钟才能生效
- 确保仓库是 **public**（公开），私有仓库需要 GitHub Pro 才能使用 Pages
- 音频文件可能在某些浏览器中需要用户交互后才能播放

## 🐛 已修复的 Bug

- ✅ 双人模式角色显示反转问题（玩家1选择的角色现在正确显示在左侧）

祝你部署顺利！🎉

