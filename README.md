# 技能五子棋

一个基于纯前端的五子棋对战网页游戏，包含角色选择和技能系统。

## 游戏特色

- 3个可选角色：张呈、技能五、子棋
- 每个角色拥有独特的技能组合
- 随机分配黑白棋
- AI对手自动对战
- 技能克制系统

## 项目结构

```
Gobang/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── game.js             # 游戏逻辑
├── assets/
│   ├── characters/
│   │   ├── portraits/  # 角色形象图（9:16）
│   │   │   ├── zhangcheng.png
│   │   │   ├── jineunwu.png
│   │   │   └── ziqi.png
│   │   └── avatars/    # 角色头像（1:1）
│   │       ├── zhangcheng.png
│   │       ├── jineunwu.png
│   │       └── ziqi.png
│   └── audio/
│       └── victory.mp3  # 胜利音乐
└── README.md
```

## 需要添加的资源文件

### 角色形象图（9:16比例）
放置在 `assets/characters/portraits/` 目录：
- `zhangcheng.png` - 张呈的形象图
- `jineunwu.png` - 技能五的形象图
- `ziqi.png` - 子棋的形象图

### 角色头像（1:1比例）
放置在 `assets/characters/avatars/` 目录：
- `zhangcheng.png` - 张呈的头像
- `jineunwu.png` - 技能五的头像
- `ziqi.png` - 子棋的头像

### 技能特效图片
放置在 `assets/characters/` 目录：
- `zhangcheng-shame.png` - 张呈羞耻照片（用于两极反转技能）

### 音频文件
放置在 `assets/audio/` 目录：
- `character-hover.wav` - 鼠标悬停在角色卡片上的音效
- `place-piece.wav` - 下棋音效（玩家和对手通用）
- `skill-activate.wav` - 技能发动音效
- `victory-sound.wav` - 胜利音效（短音效）
- `victory.WAV` - 胜利背景音乐（长音乐）
- `gun.wav` - 【滚！】技能语音
- `ni-zhe-ge-chusheng.wav` - 【你这个畜生】技能语音
- `ni-ma-laoren.wav` - 【你骂老人】技能语音

## 角色技能

### 张呈
- 飞沙走石
- 拾金不昧
- 擒拿
- 静如止水
- 力拔山兮
- 东山再起
- 滚！
- 你这辈子别跟我说话

### 技能五
- 飞沙走石
- 拾金不昧
- 棒球呀累呀累
- 力拔山兮
- 调呈离山
- 你骂老人
- 保洁上门
- 你这个畜生
- 两极反转

### 子棋
- 飞沙走石
- 拾金不昧
- 静如止水
- 水滴石穿
- 力拔山兮
- 调呈离山
- 两极反转

## 部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 main 分支作为源
4. 访问 `https://<username>.github.io/<repository-name>/`

## 本地运行

直接用浏览器打开 `index.html` 文件即可运行游戏。

注意：某些浏览器可能会限制本地文件访问，建议使用本地服务器运行：

```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Python 2
python -m SimpleHTTPServer 8000

# 使用 Node.js (需要先安装 http-server)
npx http-server
```

然后访问 `http://localhost:8000`

## 技术栈

- 纯HTML/CSS/JavaScript
- Canvas API 绘制棋盘
- 响应式设计

## 游戏规则

1. 选择角色后开始游戏
2. 随机分配黑白棋，黑棋先手
3. 每回合可以选择下棋或使用技能
4. 每个技能只能使用一次
5. 某些技能可以克制对手的技能
6. 先连成五子者获胜

