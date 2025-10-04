// 游戏配置
const BOARD_SIZE = 15;
const CELL_SIZE = 40;
const PIECE_RADIUS = 16;

// 角色配置
const CHARACTERS = {
    zhangcheng: {
        name: '张呈',
        portrait: 'assets/characters/portraits/zhangcheng.png',
        avatar: 'assets/characters/avatars/zhangcheng.png',
        skills: ['飞沙走石', '拾金不昧', '擒拿', '静如止水', '力拔山兮', '东山再起', '滚！', '你这辈子别跟我说话']
    },
    jineunwu: {
        name: '技能五',
        portrait: 'assets/characters/portraits/jineunwu.png',
        avatar: 'assets/characters/avatars/jineunwu.png',
        skills: ['飞沙走石', '拾金不昧', '棒球呀累呀累', '力拔山兮', '调呈离山', '你骂老人', '保洁上门', '你这个畜生', '两极反转']
    },
    ziqi: {
        name: '子棋',
        portrait: 'assets/characters/portraits/ziqi.png',
        avatar: 'assets/characters/avatars/ziqi.png',
        skills: ['飞沙走石', '拾金不昧', '静如止水', '水滴石穿', '力拔山兮', '调呈离山', '两极反转']
    }
};

// 技能配置
const SKILLS = {
    '飞沙走石': {
        description: '把对手棋盘上的一颗棋子直接扔进什刹海',
        canUse: (game) => game.getOpponentPieces().length > 0,
        effect: (game) => {
            const pieces = game.getOpponentPieces();
            if (pieces.length > 0) {
                const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
                game.removePiece(randomPiece.x, randomPiece.y);
                return true;
            }
            return false;
        }
    },
    '拾金不昧': {
        description: '击飞扔来的棋子，回到原来位置',
        canUse: (game) => game.getOpponentLastSkillUsed() === '飞沙走石',
        effect: (game) => {
            if (game.lastRemovedPiece) {
                game.board[game.lastRemovedPiece.y][game.lastRemovedPiece.x] = game.lastRemovedPiece.color;
                game.lastRemovedPiece = null;
            }
            return true;
        }
    },
    '棒球呀累呀累': {
        description: '击飞扔来的棋子，回到原来位置',
        canUse: (game) => game.getOpponentLastSkillUsed() === '飞沙走石',
        effect: (game) => {
            if (game.lastRemovedPiece) {
                game.board[game.lastRemovedPiece.y][game.lastRemovedPiece.x] = game.lastRemovedPiece.color;
                game.lastRemovedPiece = null;
            }
            return true;
        }
    },
    '擒拿': {
        description: '阻止扔棋子，棋子回到原来位置',
        canUse: (game) => game.getOpponentLastSkillUsed() === '飞沙走石',
        effect: (game) => {
            if (game.lastRemovedPiece) {
                game.board[game.lastRemovedPiece.y][game.lastRemovedPiece.x] = game.lastRemovedPiece.color;
                game.lastRemovedPiece = null;
            }
            return true;
        }
    },
    '静如止水': {
        description: '对手本回合与下一回合都无法行动',
        canUse: () => true,
        effect: (game) => {
            game.frozenTurns = 2;
            return true;
        }
    },
    '水滴石穿': {
        description: '解除，继续行动',
        canUse: (game) => game.getOpponentLastSkillUsed() === '静如止水',
        effect: (game) => {
            game.frozenTurns = 0;
            return true;
        }
    },
    '力拔山兮': {
        description: '摔坏棋盘，直接获胜',
        note: '第二回合起可用',
        canUse: (game) => game.turnCount >= 2,
        effect: (game) => {
            // 设置待结算的获胜者
            game.pendingWinner = game.currentPlayer;
            return true;
        }
    },
    '东山再起': {
        description: '捡起棋盘，对局继续',
        canUse: (game) => game.getOpponentLastSkillUsed() === '力拔山兮',
        effect: (game) => {
            // 阻止力拔山兮的获胜
            game.pendingWinner = null;
            return true;
        }
    },
    '调呈离山': {
        description: '把对手挪走，本回合与下一回合都无法行动',
        canUse: (game) => {
            // 判断对手是谁
            let opponentChar;
            if (game.gameMode === 'pvp') {
                // 双人模式：黑棋对手是白棋，白棋对手是黑棋
                opponentChar = game.currentPlayer === 'black' ? game.playerCharacter : game.opponentCharacter;
            } else {
                // 人机模式
                opponentChar = game.currentPlayer === game.playerColor ? game.opponentCharacter : game.playerCharacter;
            }
            return opponentChar === 'zhangcheng';
        },
        effect: (game) => {
            game.frozenTurns = 2;
            return true;
        }
    },
    '滚！': {
        description: '呵斥对手一下',
        canUse: () => true,
        effect: (game) => {
            game.playSound('gun');
            return true;
        }
    },
    '你骂老人': {
        description: '道德施压',
        canUse: (game) => game.getOpponentLastSkillUsed() === '滚！',
        effect: (game) => {
            game.playSound('maLaoren');
            return true;
        }
    },
    '保洁上门': {
        description: '随机扫走对手的一颗棋子',
        canUse: (game) => game.getOpponentPieces().length > 0,
        effect: (game) => {
            const pieces = game.getOpponentPieces();
            if (pieces.length > 0) {
                const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
                game.removePiece(randomPiece.x, randomPiece.y);
                return true;
            }
            return false;
        }
    },
    '你这个畜生': {
        description: '呵斥对手一下',
        canUse: () => true,
        effect: (game) => {
            game.playSound('chusheng');
            return true;
        }
    },
    '你这辈子别跟我说话': {
        description: '呵斥对手一下',
        canUse: () => true,
        effect: () => true
    },
    '两极反转': {
        description: '放出张呈羞耻照片',
        canUse: (game) => {
            // 判断对手是谁
            let opponentChar;
            if (game.gameMode === 'pvp') {
                // 双人模式：黑棋对手是白棋，白棋对手是黑棋
                opponentChar = game.currentPlayer === 'black' ? game.playerCharacter : game.opponentCharacter;
            } else {
                // 人机模式
                opponentChar = game.currentPlayer === game.playerColor ? game.opponentCharacter : game.playerCharacter;
            }
            return opponentChar === 'zhangcheng' && game.getOpponentLastSkillUsed() === '力拔山兮';
        },
        effect: (game) => {
            // 阻止力拔山兮的获胜
            game.pendingWinner = null;
            // 标记需要显示图片
            game.showShamePhoto = true;
            return true;
        }
    }
};

// 游戏类
class GobangGame {
    constructor() {
        this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
        this.currentPlayer = null; // 'black' or 'white'
        this.gameMode = null; // 'ai' or 'pvp'
        this.playerColor = null;
        this.playerCharacter = null;
        this.opponentCharacter = null;
        this.player1Character = null; // 双人模式玩家1
        this.player2Character = null; // 双人模式玩家2
        this.usedSkills = new Set(); // 人机模式使用的技能记录
        this.player1UsedSkills = new Set(); // 双人模式玩家1使用的技能
        this.player2UsedSkills = new Set(); // 双人模式玩家2使用的技能
        this.lastSkillUsed = null;
        this.opponentLastSkill = null;
        this.frozenTurns = 0;
        this.lastRemovedPiece = null;
        this.gameOver = false;
        this.pendingPlayerSwitch = false; // 是否有待处理的玩家切换
        this.pendingWinner = null; // 待结算的获胜者（力拔山兮使用后）
        this.turnCount = 0; // 回合计数器
        
        this.canvas = document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');
        
        // 初始化音效
        this.sounds = {
            characterHover: document.getElementById('character-hover-audio'),
            placePiece: document.getElementById('place-piece-audio'),
            skillActivate: document.getElementById('skill-activate-audio'),
            victorySound: document.getElementById('victory-sound-audio'),
            victoryMusic: document.getElementById('victory-music-audio'),
            gun: document.getElementById('gun-audio'),
            chusheng: document.getElementById('chusheng-audio'),
            maLaoren: document.getElementById('ma-laoren-audio')
        };
        
        this.audioInitialized = false; // 音频是否已初始化
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // 模式选择
        document.getElementById('ai-mode-btn').addEventListener('click', () => {
            this.gameMode = 'ai';
            document.getElementById('mode-select').classList.remove('active');
            document.getElementById('character-select').classList.add('active');
            document.getElementById('select-subtitle').textContent = '选择你的角色';
        });
        
        document.getElementById('pvp-mode-btn').addEventListener('click', () => {
            this.gameMode = 'pvp';
            this.player1Character = null;
            this.player2Character = null;
            document.getElementById('mode-select').classList.remove('active');
            document.getElementById('character-select').classList.add('active');
            document.getElementById('select-subtitle').textContent = '玩家1选择角色';
        });
        
        // 角色选择
        document.querySelectorAll('.character-card').forEach(card => {
            // 鼠标悬停音效
            card.addEventListener('mouseenter', () => {
                // 第一次交互时初始化音频
                if (!this.audioInitialized) {
                    this.initAudio();
                }
                this.playSound('characterHover');
            });
            
            card.addEventListener('click', () => {
                // 确保音频已初始化
                if (!this.audioInitialized) {
                    this.initAudio();
                }
                
                const character = card.dataset.character;
                
                if (this.gameMode === 'ai') {
                    // 人机模式
                    document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    this.startGame(character);
                } else if (this.gameMode === 'pvp') {
                    // 双人模式
                    if (!this.player1Character) {
                        // 玩家1选择
                        this.player1Character = character;
                        card.classList.add('selected');
                        card.style.opacity = '0.5';
                        document.getElementById('select-subtitle').textContent = '玩家2选择角色';
                    } else if (!this.player2Character && character !== this.player1Character) {
                        // 玩家2选择（不能选同一个角色）
                        this.player2Character = character;
                        this.startPvPGame();
                    } else if (character === this.player1Character) {
                        alert('请选择不同的角色！');
                    }
                }
            });
        });
        
        // 棋盘点击
        this.canvas.addEventListener('click', (e) => this.handleBoardClick(e));
        
        // 重新开始
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
        
        // 技能模态窗关闭
        document.getElementById('skill-modal-close').addEventListener('click', () => {
            document.getElementById('skill-modal').classList.remove('active');
            // 如果技能使用后需要切换玩家，在关闭弹窗后执行
            if (this.pendingPlayerSwitch) {
                this.pendingPlayerSwitch = false;
                setTimeout(() => {
                    this.switchPlayer();
                    // 切换后检查是否有待结算的获胜
                    this.checkPendingWin();
                }, 300);
            }
        });
        
        // 图片模态窗关闭
        document.getElementById('image-modal-close').addEventListener('click', () => {
            document.getElementById('image-modal').classList.remove('active');
            // 如果技能使用后需要切换玩家，在关闭弹窗后执行
            if (this.pendingPlayerSwitch) {
                this.pendingPlayerSwitch = false;
                setTimeout(() => {
                    this.switchPlayer();
                    // 切换后检查是否有待结算的获胜
                    this.checkPendingWin();
                }, 300);
            }
        });
    }
    
    startGame(playerCharacter) {
        this.playerCharacter = playerCharacter;
        
        // 随机选择对手
        const allCharacters = ['zhangcheng', 'jineunwu', 'ziqi'];
        const opponents = allCharacters.filter(c => c !== playerCharacter);
        this.opponentCharacter = opponents[Math.floor(Math.random() * opponents.length)];
        
        // 随机分配颜色
        this.playerColor = Math.random() < 0.5 ? 'black' : 'white';
        const opponentColor = this.playerColor === 'black' ? 'white' : 'black';
        
        // 黑棋先手
        this.currentPlayer = 'black';
        
        // 更新UI
        this.updatePlayerInfo();
        this.updateSkills();
        this.drawBoard();
        
        // 切换到游戏界面
        document.getElementById('character-select').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        // 如果对手先手，让AI下棋
        if (this.currentPlayer !== this.playerColor) {
            setTimeout(() => this.aiMove(), 500);
        }
        
        this.updateTurnIndicator();
    }
    
    startPvPGame() {
        // 双人模式启动
        // playerCharacter 对应右侧（玩家2，白棋）
        // opponentCharacter 对应左侧（玩家1，黑棋）
        this.playerCharacter = this.player2Character;
        this.opponentCharacter = this.player1Character;
        
        // 玩家1是黑棋，玩家2是白棋
        this.playerColor = 'black';
        
        // 黑棋先手
        this.currentPlayer = 'black';
        
        // 更新UI
        this.updatePlayerInfo();
        this.updateSkills();
        this.drawBoard();
        
        // 切换到游戏界面
        document.getElementById('character-select').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        this.updateTurnIndicator();
    }
    
    updatePlayerInfo() {
        const playerChar = CHARACTERS[this.playerCharacter];
        const opponentChar = CHARACTERS[this.opponentCharacter];
        
        document.getElementById('player-avatar').src = playerChar.avatar;
        document.getElementById('opponent-avatar').src = opponentChar.avatar;
        
        if (this.gameMode === 'pvp') {
            // 双人模式
            document.getElementById('player-name').textContent = playerChar.name + '【玩家2】';
            document.getElementById('player-color').textContent = '白棋';
            
            document.getElementById('opponent-name').textContent = opponentChar.name + '【玩家1】';
            document.getElementById('opponent-color').textContent = '黑棋';
        } else {
            // 人机模式
            document.getElementById('player-name').textContent = playerChar.name + '【我方】';
            document.getElementById('player-color').textContent = this.playerColor === 'black' ? '黑棋' : '白棋';
            
            document.getElementById('opponent-name').textContent = opponentChar.name + '【电脑】';
            document.getElementById('opponent-color').textContent = this.playerColor === 'black' ? '白棋' : '黑棋';
        }
    }
    
    updateSkills() {
        // 更新右侧技能（玩家2/我方）
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        
        const playerSkills = CHARACTERS[this.playerCharacter].skills;
        
        playerSkills.forEach(skillName => {
            const button = document.createElement('button');
            button.className = 'skill-button';
            button.textContent = skillName;
            button.dataset.skill = skillName;
            button.dataset.owner = 'player';
            
            const skill = SKILLS[skillName];
            // 设置鼠标悬停提示，如果有note则显示
            button.title = skill.note 
                ? `${skill.description}（${skill.note}）` 
                : skill.description;
            // 根据游戏模式检查是否已使用
            const isUsed = this.gameMode === 'pvp' 
                ? this.player2UsedSkills.has(skillName)  // 玩家2（白棋）
                : this.usedSkills.has(skillName);
            const canUse = skill && skill.canUse(this);
            
            if (this.gameMode === 'pvp') {
                // 双人模式：不是玩家2回合时禁用
                if (this.currentPlayer !== 'white') {
                    button.disabled = true;
                    button.classList.add('disabled');
                } else if (isUsed) {
                    button.disabled = true;
                    button.classList.add('used');
                } else if (!canUse) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
            } else {
                // 人机模式
                if (isUsed) {
                    button.disabled = true;
                    button.classList.add('used');
                } else if (!canUse) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
            }
            
            button.addEventListener('click', () => this.useSkill(skillName));
            skillsList.appendChild(button);
        });
        
        // 更新左侧技能（玩家1/对手）
        const opponentSkillsList = document.getElementById('opponent-skills-list');
        opponentSkillsList.innerHTML = '';
        
        const opponentSkills = CHARACTERS[this.opponentCharacter].skills;
        
        opponentSkills.forEach(skillName => {
            const button = document.createElement('button');
            button.className = 'skill-button';
            button.textContent = skillName;
            button.dataset.skill = skillName;
            button.dataset.owner = 'opponent';
            
            const skill = SKILLS[skillName];
            // 设置鼠标悬停提示，如果有note则显示
            button.title = skill.note 
                ? `${skill.description}（${skill.note}）` 
                : skill.description;
            // 根据游戏模式检查是否已使用
            const isUsed = this.gameMode === 'pvp' 
                ? this.player1UsedSkills.has(skillName)  // 玩家1（黑棋）
                : this.usedSkills.has(skillName);
            const canUse = skill && skill.canUse(this);
            
            if (this.gameMode === 'pvp') {
                // 双人模式：玩家1可以在自己回合使用技能
                if (this.currentPlayer !== 'black') {
                    button.disabled = true;
                    button.classList.add('disabled');
                } else if (isUsed) {
                    button.disabled = true;
                    button.classList.add('used');
                } else if (!canUse) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
                
                button.addEventListener('click', () => this.useSkill(skillName));
            } else {
                // 人机模式：只显示状态，不可点击
                button.disabled = true;
                if (isUsed) {
                    button.classList.add('used');
                } else {
                    button.classList.add('opponent-skill');
                }
            }
            
            opponentSkillsList.appendChild(button);
        });
    }
    
    updateTurnIndicator() {
        const indicator = document.getElementById('current-turn');
        if (this.gameMode === 'pvp') {
            // 双人模式
            if (this.currentPlayer === 'black') {
                indicator.textContent = '玩家1回合';
                indicator.style.color = '#667eea';
            } else {
                indicator.textContent = '玩家2回合';
                indicator.style.color = '#764ba2';
            }
        } else {
            // 人机模式
            if (this.currentPlayer === this.playerColor) {
                indicator.textContent = '你的回合';
                indicator.style.color = '#667eea';
            } else {
                indicator.textContent = '对手回合';
                indicator.style.color = '#999';
            }
        }
    }
    
    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制棋盘网格
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < BOARD_SIZE; i++) {
            // 横线
            this.ctx.beginPath();
            this.ctx.moveTo(CELL_SIZE / 2, CELL_SIZE / 2 + i * CELL_SIZE);
            this.ctx.lineTo(this.canvas.width - CELL_SIZE / 2, CELL_SIZE / 2 + i * CELL_SIZE);
            this.ctx.stroke();
            
            // 竖线
            this.ctx.beginPath();
            this.ctx.moveTo(CELL_SIZE / 2 + i * CELL_SIZE, CELL_SIZE / 2);
            this.ctx.lineTo(CELL_SIZE / 2 + i * CELL_SIZE, this.canvas.height - CELL_SIZE / 2);
            this.ctx.stroke();
        }
        
        // 绘制星位
        const stars = [[3, 3], [3, 11], [11, 3], [11, 11], [7, 7]];
        stars.forEach(([x, y]) => {
            this.ctx.beginPath();
            this.ctx.arc(CELL_SIZE / 2 + x * CELL_SIZE, CELL_SIZE / 2 + y * CELL_SIZE, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = '#000';
            this.ctx.fill();
        });
        
        // 绘制棋子
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (this.board[y][x]) {
                    this.drawPiece(x, y, this.board[y][x]);
                }
            }
        }
    }
    
    drawPiece(x, y, color) {
        const centerX = CELL_SIZE / 2 + x * CELL_SIZE;
        const centerY = CELL_SIZE / 2 + y * CELL_SIZE;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, PIECE_RADIUS, 0, Math.PI * 2);
        
        if (color === 'black') {
            this.ctx.fillStyle = '#000';
        } else {
            this.ctx.fillStyle = '#fff';
        }
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    
    handleBoardClick(e) {
        if (this.gameOver) return;
        
        // 双人模式下所有玩家都可以点击，人机模式下只有玩家回合可以点击
        if (this.gameMode === 'ai' && this.currentPlayer !== this.playerColor) return;
        
        if (this.frozenTurns > 0) {
            const playerName = this.gameMode === 'pvp' 
                ? (this.currentPlayer === 'black' ? '玩家1' : '玩家2')
                : '你';
            alert(`${playerName}被冻结了，无法行动！`);
            return;
        }
        
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        const x = Math.round((clickX - CELL_SIZE / 2) / CELL_SIZE);
        const y = Math.round((clickY - CELL_SIZE / 2) / CELL_SIZE);
        
        if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE && !this.board[y][x]) {
            this.placePiece(x, y, this.currentPlayer);
        }
    }
    
    placePiece(x, y, color) {
        this.board[y][x] = color;
        this.drawBoard();
        
        // 播放下棋音效
        this.playSound('placePiece');
        
        // 检查胜利
        if (this.checkWin(x, y, color)) {
            this.endGame(color);
            return;
        }
        
        // 切换玩家
        this.switchPlayer();
    }
    
    switchPlayer() {
        // 增加回合计数
        this.turnCount++;
        
        // 切换玩家前，清除"即将行动的玩家"在上上回合的技能记录
        // 保留"刚行动完的玩家"的技能记录，供对方反制使用
        if (this.gameMode === 'pvp') {
            // 双人模式：基于黑白棋判断
            if (this.currentPlayer === 'black') {
                // 当前是黑棋回合，即将切换到白棋
                // 清除白棋上上回合的技能记录
                this.lastSkillUsed = null;
            } else {
                // 当前是白棋回合，即将切换到黑棋
                // 清除黑棋上上回合的技能记录
                this.opponentLastSkill = null;
            }
        } else {
            // 人机模式
            if (this.currentPlayer === this.playerColor) {
                // 当前是玩家回合，即将切换到对手
                // 清除对手上上回合的技能记录
                this.opponentLastSkill = null;
            } else {
                // 当前是对手回合，即将切换到玩家
                // 清除玩家上上回合的技能记录
                this.lastSkillUsed = null;
            }
        }
        
        this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
        
        // 处理冻结状态
        if (this.frozenTurns > 0) {
            this.frozenTurns--;
            if (this.frozenTurns > 0) {
                // 还被冻结，继续跳过
                setTimeout(() => this.switchPlayer(), 500);
                return;
            }
        }
        
        this.updateTurnIndicator();
        this.updateSkills(); // 更新技能状态
        
        // 人机模式下的AI回合
        if (this.gameMode === 'ai' && this.currentPlayer !== this.playerColor) {
            setTimeout(() => this.aiMove(), 800);
        }
    }
    
    aiMove() {
        if (this.gameOver) return;
        
        // 简单的AI：随机选择可用位置或使用技能
        const useSkill = Math.random() < 0.3; // 30%概率使用技能
        
        if (useSkill) {
            const opponentSkills = CHARACTERS[this.opponentCharacter].skills;
            // 人机模式使用统一的技能记录
            const availableSkills = opponentSkills.filter(skill => 
                !this.usedSkills.has(skill) && SKILLS[skill].canUse(this)
            );
            
            if (availableSkills.length > 0) {
                const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
                this.useSkill(randomSkill, true);
                return;
            }
        }
        
        // 下棋
        const emptySpaces = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (!this.board[y][x]) {
                    emptySpaces.push({x, y});
                }
            }
        }
        
        if (emptySpaces.length > 0) {
            const randomSpace = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
            this.placePiece(randomSpace.x, randomSpace.y, this.currentPlayer);
        }
    }
    
    useSkill(skillName, isAI = false) {
        if (this.gameOver) return;
        
        // 双人模式下不检查回合，人机模式下检查
        if (this.gameMode === 'ai' && !isAI && this.currentPlayer !== this.playerColor) return;
        
        if (this.usedSkills.has(skillName)) return;
        
        const skill = SKILLS[skillName];
        if (!skill.canUse(this)) {
            if (!isAI) {
                alert('当前无法使用该技能！');
            }
            return;
        }
        
        // 播放技能音效
        this.playSound('skillActivate');
        
        // 执行技能效果
        this.showShamePhoto = false; // 重置标记
        const success = skill.effect(this);
        
        // 如果是两极反转，显示图片而不是技能描述
        if (success && this.showShamePhoto) {
            this.showImageModal('两极反转', 'assets/characters/zhangcheng-shame.png');
        } else {
            // 显示技能描述
            if (this.gameMode === 'pvp') {
                // 双人模式
                const currentChar = this.currentPlayer === 'black' 
                    ? CHARACTERS[this.opponentCharacter] 
                    : CHARACTERS[this.playerCharacter];
                const playerName = this.currentPlayer === 'black' ? '玩家1' : '玩家2';
                this.showSkillModal(skillName, `${playerName}（${currentChar.name}）使用了技能：${skill.description}`, false);
            } else {
                // 人机模式
                if (isAI) {
                    const opponentChar = CHARACTERS[this.opponentCharacter];
                    this.showSkillModal(skillName, `${opponentChar.name}使用了技能：${skill.description}`, true);
                } else {
                    this.showSkillModal(skillName, skill.description, false);
                }
            }
        }
        
        if (success) {
            // 根据游戏模式和当前玩家记录技能使用
            if (this.gameMode === 'pvp') {
                // 双人模式：记录到对应玩家的技能集合
                if (this.currentPlayer === 'black') {
                    this.player1UsedSkills.add(skillName);
                    // 黑棋（玩家1）使用技能，记录到opponentLastSkill
                    this.opponentLastSkill = skillName;
                } else {
                    this.player2UsedSkills.add(skillName);
                    // 白棋（玩家2）使用技能，记录到lastSkillUsed
                    this.lastSkillUsed = skillName;
                }
            } else {
                // 人机模式：统一记录到usedSkills
                this.usedSkills.add(skillName);
                
                if (!isAI) {
                    this.lastSkillUsed = skillName;
                } else {
                    this.opponentLastSkill = skillName;
                }
            }
            
            this.drawBoard();
            this.updateSkills();
            
            // 技能使用后需要切换玩家，等待弹窗关闭
            if (!this.gameOver) {
                this.pendingPlayerSwitch = true;
            }
        }
    }
    
    showSkillModal(title, description, isOpponent = false) {
        document.getElementById('skill-modal-title').textContent = title;
        document.getElementById('skill-modal-description').textContent = description;
        const modal = document.getElementById('skill-modal');
        modal.classList.add('active');
    }
    
    showImageModal(title, imagePath) {
        document.getElementById('image-modal-title').textContent = title;
        document.getElementById('image-modal-img').src = imagePath;
        const modal = document.getElementById('image-modal');
        modal.classList.add('active');
    }
    
    getOpponentPieces() {
        const pieces = [];
        const opponentColor = this.currentPlayer === 'black' ? 'white' : 'black';
        
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (this.board[y][x] === opponentColor) {
                    pieces.push({x, y, color: opponentColor});
                }
            }
        }
        
        return pieces;
    }
    
    getOpponentLastSkillUsed() {
        // 根据游戏模式返回对手上一回合使用的技能
        if (this.gameMode === 'pvp') {
            // 双人模式：黑棋的对手是白棋，白棋的对手是黑棋
            if (this.currentPlayer === 'black') {
                // 黑棋回合，返回白棋（玩家2）上一回合的技能
                return this.lastSkillUsed;
            } else {
                // 白棋回合，返回黑棋（玩家1）上一回合的技能
                return this.opponentLastSkill;
            }
        } else {
            // 人机模式
            if (this.currentPlayer === this.playerColor) {
                return this.opponentLastSkill;
            } else {
                return this.lastSkillUsed;
            }
        }
    }
    
    removePiece(x, y) {
        this.lastRemovedPiece = {
            x, y, color: this.board[y][x]
        };
        this.board[y][x] = null;
    }
    
    checkWin(x, y, color) {
        const directions = [
            [[0, 1], [0, -1]],   // 垂直
            [[1, 0], [-1, 0]],   // 水平
            [[1, 1], [-1, -1]],  // 对角线\
            [[1, -1], [-1, 1]]   // 对角线/
        ];
        
        for (const [dir1, dir2] of directions) {
            let count = 1;
            count += this.countInDirection(x, y, dir1[0], dir1[1], color);
            count += this.countInDirection(x, y, dir2[0], dir2[1], color);
            
            if (count >= 5) {
                return true;
            }
        }
        
        return false;
    }
    
    countInDirection(x, y, dx, dy, color) {
        let count = 0;
        let newX = x + dx;
        let newY = y + dy;
        
        while (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE) {
            if (this.board[newY][newX] === color) {
                count++;
                newX += dx;
                newY += dy;
            } else {
                break;
            }
        }
        
        return count;
    }
    
    endGame(winner) {
        this.gameOver = true;
        
        // 播放胜利音效和背景音乐
        this.playSound('victorySound');
        setTimeout(() => {
            this.playSound('victoryMusic');
        }, 500);
        
        // 显示结果
        let resultTitle, winnerChar;
        
        if (this.gameMode === 'pvp') {
            // 双人模式：显示获胜者
            if (winner === 'black') {
                resultTitle = '玩家1胜利！';
                winnerChar = CHARACTERS[this.opponentCharacter]; // 玩家1（黑棋）
            } else {
                resultTitle = '玩家2胜利！';
                winnerChar = CHARACTERS[this.playerCharacter]; // 玩家2（白棋）
            }
        } else {
            // 人机模式：显示你是胜利还是失败
            const isPlayerWin = winner === this.playerColor;
            resultTitle = isPlayerWin ? '胜利！' : '失败！';
            winnerChar = isPlayerWin ? CHARACTERS[this.playerCharacter] : CHARACTERS[this.opponentCharacter];
        }
        
        document.getElementById('result-title').textContent = resultTitle;
        
        const winnerPortrait = document.getElementById('winner-portrait');
        winnerPortrait.innerHTML = `<img src="${winnerChar.avatar}" alt="${winnerChar.name}">`;
        
        setTimeout(() => {
            document.getElementById('game-screen').classList.remove('active');
            document.getElementById('result-screen').classList.add('active');
        }, 1000);
    }
    
    restart() {
        // 重置游戏状态
        this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
        this.usedSkills = new Set();
        this.player1UsedSkills = new Set();
        this.player2UsedSkills = new Set();
        this.lastSkillUsed = null;
        this.opponentLastSkill = null;
        this.frozenTurns = 0;
        this.lastRemovedPiece = null;
        this.gameOver = false;
        this.pendingPlayerSwitch = false;
        this.pendingWinner = null;
        this.turnCount = 0;
        
        // 停止所有音效
        Object.values(this.sounds).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        // 返回模式选择界面
        document.getElementById('result-screen').classList.remove('active');
        document.getElementById('mode-select').classList.add('active');
        
        // 清除角色选择
        document.querySelectorAll('.character-card').forEach(c => {
            c.classList.remove('selected');
            c.style.opacity = '1';
        });
        
        // 重置模式和角色
        this.gameMode = null;
        this.player1Character = null;
        this.player2Character = null;
    }
    
    initAudio() {
        if (this.audioInitialized) return;
        
        // 预加载所有音频
        Object.values(this.sounds).forEach(audio => {
            if (audio) {
                audio.load();
            }
        });
        
        this.audioInitialized = true;
    }
    
    checkPendingWin() {
        if (!this.pendingWinner || this.gameOver) return;
        
        // 检查当前玩家是否有可以破解力拔山兮的技能
        const counterSkills = ['东山再起', '两极反转'];
        
        // 根据游戏模式获取当前玩家的角色和技能
        let currentPlayerSkills;
        let usedSkillsSet;
        
        if (this.gameMode === 'pvp') {
            // 双人模式：根据currentPlayer确定是玩家1还是玩家2
            if (this.currentPlayer === 'black') {
                // 黑棋 = 玩家1 = opponentCharacter
                currentPlayerSkills = CHARACTERS[this.opponentCharacter].skills;
                usedSkillsSet = this.player1UsedSkills;
            } else {
                // 白棋 = 玩家2 = playerCharacter
                currentPlayerSkills = CHARACTERS[this.playerCharacter].skills;
                usedSkillsSet = this.player2UsedSkills;
            }
        } else {
            // 人机模式
            currentPlayerSkills = this.currentPlayer === this.playerColor 
                ? CHARACTERS[this.playerCharacter].skills 
                : CHARACTERS[this.opponentCharacter].skills;
            usedSkillsSet = this.usedSkills;
        }
        
        const availableCounterSkills = counterSkills.filter(skillName => 
            currentPlayerSkills.includes(skillName) && 
            !usedSkillsSet.has(skillName) &&
            SKILLS[skillName].canUse(this)
        );
        
        if (availableCounterSkills.length > 0) {
            // 有可以破解的技能
            if (this.gameMode === 'pvp') {
                // 双人模式，询问当前玩家
                const playerName = this.currentPlayer === 'black' ? '玩家1' : '玩家2';
                const skillNames = availableCounterSkills.join('、');
                const useCounter = confirm(`对手使用了力拔山兮！${playerName}有可用的破解技能：${skillNames}\n\n是否使用破解技能？`);
                
                if (useCounter) {
                    this.useSkill(availableCounterSkills[0], false);
                } else {
                    this.endGame(this.pendingWinner);
                    this.pendingWinner = null;
                }
            } else if (this.currentPlayer === this.playerColor) {
                // 人机模式，玩家有破解技能
                const skillNames = availableCounterSkills.join('、');
                const useCounter = confirm(`对手使用了力拔山兮！你有可用的破解技能：${skillNames}\n\n是否使用破解技能？`);
                
                if (useCounter) {
                    this.useSkill(availableCounterSkills[0], false);
                } else {
                    this.endGame(this.pendingWinner);
                    this.pendingWinner = null;
                }
            } else {
                // 人机模式，AI有破解技能，30%概率使用
                if (Math.random() < 0.3) {
                    const randomSkill = availableCounterSkills[Math.floor(Math.random() * availableCounterSkills.length)];
                    this.useSkill(randomSkill, true);
                } else {
                    this.endGame(this.pendingWinner);
                    this.pendingWinner = null;
                }
            }
        } else {
            // 没有破解技能，直接结算
            this.endGame(this.pendingWinner);
            this.pendingWinner = null;
        }
    }
    
    playSound(soundName) {
        const audio = this.sounds[soundName];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log(`Failed to play ${soundName}:`, e));
        }
    }
}

// 初始化游戏
const game = new GobangGame();

