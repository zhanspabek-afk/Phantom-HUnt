/* =====================================================
   ОХОТНИК НА НЕЧИСТЬ — логика игры
   ===================================================== */

// ---------- Редкости ----------
const RARITY = {
    COMMON:    { name: "Обычный",     class: "rarity-common",    hpMult: 1,    dmgMult: 1,    ringA: "#7f8c8d", ringB: "#4a5459" },
    RARE:      { name: "Редкий",      class: "rarity-rare",      hpMult: 1.25, dmgMult: 1.15, ringA: "#4aa3e0", ringB: "#1b4f72" },
    EPIC:      { name: "Эпический",   class: "rarity-epic",      hpMult: 1.5,  dmgMult: 1.3,  ringA: "#b370d9", ringB: "#5b2c6f" },
    LEGENDARY: { name: "Легендарный", class: "rarity-legendary", hpMult: 1.8,  dmgMult: 1.5,  ringA: "#f7c948", ringB: "#935116" },
    BOSS:      { name: "БОСС",        class: "rarity-boss",      hpMult: 2.1,  dmgMult: 1.4,  ringA: "#ff5c5c", ringB: "#7b0f1f" }
};

// Фон медальона по типу существа
const TYPE_MEDALLION_BG = {
    "Призрак": { bg1: "#123a3a", bg2: "#061616" },
    "Демон":   { bg1: "#3a1210", bg2: "#160404" },
    "Игрок":   { bg1: "#3a2f12", bg2: "#161006" }
};

// ---------- Иконка охотника ----------
const PLAYER_ICON = "🏹";

// ---------- База монстров, у каждого — своя иконка-печать ----------
const enemiesDB = [
    // Призраки
    { name: "Полтергейст",       type: "Призрак", baseHp: 45, baseDmg: 7,  weak: "salt",   icon: "👻" },
    { name: "Банши",             type: "Призрак", baseHp: 60, baseDmg: 11, weak: "chains", icon: "😱" },
    { name: "Тень",              type: "Призрак", baseHp: 35, baseDmg: 6,  weak: "salt",   icon: "🌑" },
    { name: "Фантом",            type: "Призрак", baseHp: 65, baseDmg: 9,  weak: "chains", icon: "🫥" },
    { name: "Плачущая Дева",     type: "Призрак", baseHp: 50, baseDmg: 8,  weak: "salt",   icon: "😢" },
    { name: "Дух Шахтёра",       type: "Призрак", baseHp: 75, baseDmg: 11, weak: "chains", icon: "⛏️" },
    { name: "Кикимора",          type: "Призрак", baseHp: 40, baseDmg: 7,  weak: "salt",   icon: "🕸️" },
    { name: "Мара",              type: "Призрак", baseHp: 60, baseDmg: 10, weak: "chains", icon: "🌙" },
    { name: "Упырь-фантом",      type: "Призрак", baseHp: 70, baseDmg: 12, weak: "salt",   icon: "🧟" },
    { name: "Лесной Скиталец",   type: "Призрак", baseHp: 55, baseDmg: 8,  weak: "chains", icon: "🌲" },
    { name: "Утопленник",        type: "Призрак", baseHp: 50, baseDmg: 9,  weak: "salt",   icon: "🌊" },
    { name: "Астральный Проектор", type: "Призрак", baseHp: 45, baseDmg: 10, weak: "chains", icon: "🔮" },
    { name: "Эхо Прошлого",      type: "Призрак", baseHp: 30, baseDmg: 5,  weak: "salt",   icon: "📜" },
    { name: "Жнечик",            type: "Призрак", baseHp: 80, baseDmg: 13, weak: "chains", icon: "💀" },
    { name: "Безликий Дух",      type: "Призрак", baseHp: 85, baseDmg: 12, weak: "salt",   icon: "🎭" },
    { name: "Вендиго",           type: "Призрак", baseHp: 90, baseDmg: 14, weak: "chains", icon: "🦌" },
    { name: "Кровавая Мэри",     type: "Призрак", baseHp: 80, baseDmg: 13, weak: "salt",   icon: "🩸" },
    { name: "Блуждающий Огонек", type: "Призрак", baseHp: 35, baseDmg: 6,  weak: "chains", icon: "🔥" },
    { name: "Проклятая Невеста", type: "Призрак", baseHp: 65, baseDmg: 10, weak: "salt",   icon: "👰" },

    // Демоны
    { name: "Бес",              type: "Демон", baseHp: 55, baseDmg: 9,  weak: "rapier", icon: "😈" },
    { name: "Адская Гончая",    type: "Демон", baseHp: 70, baseDmg: 12, weak: "rapier", icon: "🐺" },
    { name: "Суккуб",           type: "Демон", baseHp: 65, baseDmg: 10, weak: "cross",  icon: "💋" },
    { name: "Инкуб",            type: "Демон", baseHp: 65, baseDmg: 10, weak: "cross",  icon: "🖤" },
    { name: "Азазель",          type: "Демон", baseHp: 85, baseDmg: 14, weak: "rapier", icon: "🐐" },
    { name: "Бельфегор",        type: "Демон", baseHp: 90, baseDmg: 12, weak: "cross",  icon: "🪑" },
    { name: "Маммона",          type: "Демон", baseHp: 80, baseDmg: 11, weak: "cross",  icon: "💰" },
    { name: "Огненный Демон",   type: "Демон", baseHp: 75, baseDmg: 13, weak: "rapier", icon: "🔥" },
    { name: "Кровавый Жрец",    type: "Демон", baseHp: 80, baseDmg: 12, weak: "cross",  icon: "🩸" },
    { name: "Теневой Демон",    type: "Демон", baseHp: 75, baseDmg: 11, weak: "rapier", icon: "🌑" },
    { name: "Разрушитель",      type: "Демон", baseHp: 95, baseDmg: 15, weak: "cross",  icon: "💥" },
    { name: "Кошмар",           type: "Демон", baseHp: 60, baseDmg: 9,  weak: "rapier", icon: "😨" },
    { name: "Падший Ангел",     type: "Демон", baseHp: 100, baseDmg: 16, weak: "cross", icon: "🪽" },
    { name: "Осквернитель",     type: "Демон", baseHp: 80, baseDmg: 12, weak: "rapier", icon: "☠️" },
    { name: "Жнец Душ",         type: "Демон", baseHp: 90, baseDmg: 14, weak: "cross",  icon: "⚰️" },
    { name: "Многоглазый Бес",  type: "Демон", baseHp: 65, baseDmg: 10, weak: "rapier", icon: "👁️" },
    { name: "Лавовый Черт",     type: "Демон", baseHp: 85, baseDmg: 13, weak: "cross",  icon: "🌋" }
];

// Боссы
const bossesDB = [
    { name: "Король Призраков: Лорд Дрейвен", type: "Призрак", baseHp: 150, baseDmg: 14, weak: "chains", icon: "👑" },
    { name: "Архидемон: Бафомет",             type: "Демон",   baseHp: 175, baseDmg: 15, weak: "cross",  icon: "🐐" },
    { name: "Древний Демон: Левиафан",        type: "Демон",   baseHp: 200, baseDmg: 16, weak: "rapier", icon: "🐉" },
    { name: "Владыка Бездны: Люцифер",        type: "Демон",   baseHp: 230, baseDmg: 18, weak: "cross",  icon: "🔥" }
];

// Артефакты
const artifactsDB = [
    { id: "holy_water",    name: "Святая Вода",     desc: "+15% к урону",            icon: "💧", effect: (p) => p.damageMult += 0.15 },
    { id: "amulet",        name: "Амулет Защиты",   desc: "-15% входящего урона",    icon: "🛡️", effect: (p) => p.defense += 0.15 },
    { id: "pendant",       name: "Кулон Жизни",     desc: "+25 к макс. HP",          icon: "❤️", effect: (p) => p.maxHpBonus += 25 },
    { id: "ring",          name: "Кольцо Удачи",    desc: "+10% к критам",           icon: "💍", effect: (p) => p.critBonus += 0.10 },
    { id: "vampire_tooth", name: "Клык Вампира",    desc: "Лечение 5 HP при ударе",  icon: "🦷", effect: (p) => p.lifesteal += 5 },
    { id: "rune",          name: "Руна Скорости",   desc: "+10% уклонения",          icon: "💫", effect: (p) => p.dodgeChance += 0.10 }
];

// Оружие — у каждого своя реликвия-иконка
const weapons = {
    rapier: { name: "Рапира", baseDmg: 22, icon: "🗡️" },
    salt:   { name: "Соль",   baseDmg: 18, icon: "🧂" },
    chains: { name: "Цепи",   baseDmg: 20, icon: "⛓️" },
    cross:  { name: "Крест",  baseDmg: 18, icon: "✝️" }
};

// ---------- Состояние ----------
let player = {
    hp: 100,
    baseMaxHp: 100,
    artifacts: [],
    damageMult: 1.0,
    defense: 0.0,
    maxHpBonus: 0,
    critBonus: 0.0,
    lifesteal: 0,
    dodgeChance: 0.0
};

let currentEnemy = null;
let wins = 0;
let losses = 0;
let stage = 0;
let isBattleActive = false;

// ---------- Утилиты ----------
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRarity() {
    const rand = Math.random() * 100;
    if (rand < 50) return RARITY.COMMON;
    if (rand < 80) return RARITY.RARE;
    if (rand < 95) return RARITY.EPIC;
    return RARITY.LEGENDARY;
}

function recalculatePlayerStats() {
    player.damageMult = 1.0;
    player.defense = 0.0;
    player.maxHpBonus = 0;
    player.critBonus = 0.0;
    player.lifesteal = 0;
    player.dodgeChance = 0.0;
    player.artifacts.forEach(art => art.effect(player));
}

// ---------- Отрисовка медальонов ----------
function paintPlayerMedallion() {
    const wrap = document.getElementById('player-medallion-wrap');
    const med = document.getElementById('player-medallion');
    med.innerText = PLAYER_ICON;
    const bg = TYPE_MEDALLION_BG["Игрок"];
    wrap.style.setProperty('--med-bg-1', bg.bg1);
    wrap.style.setProperty('--med-bg-2', bg.bg2);
    wrap.style.setProperty('--ring-a', "#c9a227");
    wrap.style.setProperty('--ring-b', "#6e551a");
}

function paintEnemyMedallion(enemy) {
    const wrap = document.getElementById('enemy-medallion-wrap');
    const med = document.getElementById('enemy-medallion');
    med.innerText = enemy.icon;

    const bg = TYPE_MEDALLION_BG[enemy.type] || TYPE_MEDALLION_BG["Призрак"];
    wrap.style.setProperty('--med-bg-1', bg.bg1);
    wrap.style.setProperty('--med-bg-2', bg.bg2);
    wrap.style.setProperty('--ring-a', enemy.rarity.ringA);
    wrap.style.setProperty('--ring-b', enemy.rarity.ringB);

    wrap.classList.toggle('boss', enemy.rarity === RARITY.BOSS);
}

function flashMedallion(which, kind) {
    // which: 'player' | 'enemy'; kind: 'hit' | 'crit-flash'
    const wrap = document.getElementById(`${which}-medallion-wrap`);
    wrap.classList.remove(kind);
    // force reflow so the animation can restart
    void wrap.offsetWidth;
    wrap.classList.add(kind);
    setTimeout(() => wrap.classList.remove(kind), 400);
}

// ---------- Основной цикл боя ----------
function startNewBattle() {
    recalculatePlayerStats();

    const maxHp = player.baseMaxHp + player.maxHpBonus;
    player.hp = maxHp;

    stage++;

    let enemyTemplate, selectedRarity;

    if (stage % 10 === 0) {
        enemyTemplate = bossesDB[Math.min(Math.floor(stage / 10) - 1, bossesDB.length - 1)];
        selectedRarity = RARITY.BOSS;
        logBoss(`⚠️ ВНИМАНИЕ! Появился БОСС: ${enemyTemplate.name}!`);
    } else {
        enemyTemplate = enemiesDB[getRandomInt(0, enemiesDB.length - 1)];
        selectedRarity = getRandomRarity();
        logSystem(`Появился враг: <b>${enemyTemplate.name}</b> (${selectedRarity.name})`);
    }

    const enemyMaxHp = Math.round(enemyTemplate.baseHp * selectedRarity.hpMult);
    const enemyDmg = Math.round(enemyTemplate.baseDmg * selectedRarity.dmgMult);

    currentEnemy = {
        ...enemyTemplate,
        maxHp: enemyMaxHp,
        hp: enemyMaxHp,
        dmg: enemyDmg,
        rarity: selectedRarity
    };

    document.getElementById('weapons-box').style.display = 'grid';
    document.getElementById('next-btn').style.display = 'none';

    const enemyTitle = document.getElementById('enemy-name');
    enemyTitle.innerText = currentEnemy.name;
    enemyTitle.className = "combatant-name " + (currentEnemy.type === "Призрак" ? "ghost-title" : "demon-title");

    const rarityBadge = document.getElementById('enemy-rarity');
    rarityBadge.innerText = currentEnemy.rarity.name;
    rarityBadge.className = `rarity-badge ${currentEnemy.rarity.class}`;

    document.getElementById('enemy-type').innerText = `${currentEnemy.type} · слабость: ${weapons[currentEnemy.weak].icon} ${weapons[currentEnemy.weak].name}`;

    paintPlayerMedallion();
    paintEnemyMedallion(currentEnemy);

    updateUI();
    isBattleActive = true;
}

function attack(weaponKey) {
    if (!isBattleActive) return;

    const weapon = weapons[weaponKey];
    let baseDmg = weapon.baseDmg + getRandomInt(-3, 5);
    let isSuperEffective = false;

    if (currentEnemy.weak === weaponKey) {
        baseDmg = Math.round(baseDmg * 1.8);
        isSuperEffective = true;
    }

    let damage = Math.round(baseDmg * player.damageMult);

    let isCrit = Math.random() < (0.10 + player.critBonus);
    if (isCrit) {
        damage = Math.round(damage * 1.5);
    }

    currentEnemy.hp -= damage;
    if (currentEnemy.hp < 0) currentEnemy.hp = 0;

    let logMsg = `Вы применили ${weapon.icon} <b>${weapon.name}</b> и нанесли <b>${damage}</b> урона.`;
    if (isSuperEffective) logMsg += " <span style='color:#6fe0a8;'>(Слабость!)</span>";
    if (isCrit) logMsg += " <span style='color:#e8c35a;'>(КРИТ!)</span>";
    logPlayer(logMsg);

    flashMedallion('enemy', isCrit ? 'crit-flash' : 'hit');

    if (player.lifesteal > 0 && currentEnemy.hp > 0) {
        const maxHp = player.baseMaxHp + player.maxHpBonus;
        player.hp = Math.min(maxHp, player.hp + player.lifesteal);
        logArt(`🦷 Вы восстановили ${player.lifesteal} HP с помощью клыка.`);
    }

    updateUI();

    if (currentEnemy.hp <= 0) {
        wins++;
        logSystem(`🎉 Вы одолели <b>${currentEnemy.name}</b>!`);

        if (currentEnemy.rarity === RARITY.BOSS || Math.random() < 0.40) {
            dropArtifact();
        }

        endBattle();
        return;
    }

    isBattleActive = false;
    setTimeout(enemyAttack, 700);
}

function enemyAttack() {
    if (Math.random() < (0.12 + player.dodgeChance)) {
        logEnemy(`<b>${currentEnemy.name}</b> атакует, но вы уклонились!`);
    } else {
        let enemyDmg = currentEnemy.dmg + getRandomInt(-2, 4);
        enemyDmg = Math.max(1, Math.round(enemyDmg * (1.0 - player.defense)));

        player.hp -= enemyDmg;
        if (player.hp < 0) player.hp = 0;
        logEnemy(`<b>${currentEnemy.name}</b> наносит вам <b>${enemyDmg}</b> урона.`);
        flashMedallion('player', 'hit');
    }

    updateUI();

    if (player.hp <= 0) {
        losses++;
        logSystem(`💀 Вы погибли в бою с <b>${currentEnemy.name}</b>... Прогресс сброшен.`);
        stage = 0;
        player.artifacts = [];
        updateArtifactsUI();
        endBattle();
    } else {
        isBattleActive = true;
    }
}

function dropArtifact() {
    if (player.artifacts.length >= 3) return;

    const available = artifactsDB.filter(a => !player.artifacts.some(pa => pa.id === a.id));
    if (available.length === 0) return;

    const newArt = available[getRandomInt(0, available.length - 1)];
    player.artifacts.push(newArt);
    logArt(`✨ НАХОДКА! Вы нашли артефакт: ${newArt.icon} <b>${newArt.name}</b> (${newArt.desc})!`);
    updateArtifactsUI();
}

function updateArtifactsUI() {
    for (let i = 0; i < 3; i++) {
        const slot = document.getElementById(`art-${i}`);
        if (player.artifacts[i]) {
            const art = player.artifacts[i];
            slot.className = "artifact-card active";
            slot.innerHTML = `<div class="artifact-icon">${art.icon}</div><div class="artifact-name">${art.name}</div><div style="color:#a99b7d;">${art.desc}</div>`;
        } else {
            slot.className = "artifact-card";
            slot.innerHTML = `<div class="artifact-empty">Слот ${i + 1}<br>Пусто</div>`;
        }
    }
    document.getElementById('art-count').innerText = `${player.artifacts.length}/3`;
}

function endBattle() {
    isBattleActive = false;
    document.getElementById('weapons-box').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('wins-count').innerText = wins;
    document.getElementById('losses-count').innerText = losses;
    document.getElementById('stage-count').innerText = stage % 10;
}

function updateUI() {
    const maxHp = player.baseMaxHp + player.maxHpBonus;
    document.getElementById('player-hp-text').innerText = player.hp;
    document.getElementById('player-max-hp-text').innerText = maxHp;
    document.getElementById('player-hp-bar').style.width = `${(player.hp / maxHp) * 100}%`;

    document.getElementById('enemy-hp-text').innerText = currentEnemy.hp;
    document.getElementById('enemy-max-hp').innerText = currentEnemy.maxHp;
    const enemyHpPercent = (currentEnemy.hp / currentEnemy.maxHp) * 100;
    document.getElementById('enemy-hp-bar').style.width = `${enemyHpPercent}%`;
}

function logPlayer(msg) { writeLog(msg, "log-player"); }
function logEnemy(msg)  { writeLog(msg, "log-enemy"); }
function logSystem(msg) { writeLog(msg, "log-system"); }
function logBoss(msg)   { writeLog(msg, "log-boss"); }
function logArt(msg)    { writeLog(msg, "log-art"); }

function writeLog(msg, cssClass) {
    const logBox = document.getElementById('log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${cssClass}`;
    entry.innerHTML = msg;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
}

// ---------- Инициализация ----------
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.relic-btn').forEach(btn => {
        btn.addEventListener('click', () => attack(btn.dataset.weapon));
    });
    document.getElementById('next-btn').addEventListener('click', startNewBattle);
    startNewBattle();
});
