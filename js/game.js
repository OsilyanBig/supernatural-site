/* ============================================
   SUPERNATURAL — AV PEŞİNDE (MİNİ OYUN)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== GAME DATA ====================
    const cases = [
        {
            number: 1,
            title: "Kayıp Sesler",
            description: "Ormanda kampcılar kayboluyor. Son kampçının çadırı paramparça bulundu. Mekanı incele ve canavarı tespit et.",
            background: "assets/backgrounds/forest.jpg",
            clues: [
                {
                    id: "c1_1",
                    x: 15, y: 40, w: 22, h: 20,
                    text: "Çadır içeriden değil, dışarıdan devasa pençelerle yırtılmış. Bu yaratık çok güçlü."
                },
                {
                    id: "c1_2",
                    x: 60, y: 15, w: 20, h: 22,
                    text: "Ağaç dalları yüksekte kırılmış. Saldırgan inanılmaz hızlı hareket edip ağaçların üzerinden gitmiş."
                },
                {
                    id: "c1_3",
                    x: 40, y: 65, w: 22, h: 20,
                    text: "Karanlıktan boğuk bir ses geliyor... 'Yardım edin!' Ama bir şey garip... Bu ses kurbanın kendisi mi yoksa... taklit mi?"
                }
            ],
            correctMonster: "wendigo",
            correctWeapon: "flare_gun",
            solvedText: "Wendigo'yu ateşe verdik! Orman artık güvende."
        },
        {
            number: 2,
            title: "Aynadaki Yabancı",
            description: "Şehirde insanlar sevdiklerinin garip davrandığını bildiriyor. Son kurban bu motel odasında bulundu.",
            background: "assets/backgrounds/motel.jpg",
            clues: [
                {
                    id: "c2_1",
                    x: 10, y: 30, w: 25, h: 25,
                    text: "Lavaboda kan değil... deri döküntüleri var. Sanki biri derisini çıkarmış gibi. İğrenç!"
                },
                {
                    id: "c2_2",
                    x: 55, y: 25, w: 22, h: 20,
                    text: "Laptop ekranındaki güvenlik kamerası görüntüsünde bir kişinin gözleri kameraya parlıyor... Retinal parlama!"
                },
                {
                    id: "c2_3",
                    x: 35, y: 70, w: 20, h: 18,
                    text: "Yerdeki gümüş kolye kararmış ve yanık izi var. Canavar gümüşe dokunduğunda yanmış olmalı."
                }
            ],
            correctMonster: "shapeshifter",
            correctWeapon: "silver_bullet",
            solvedText: "Şekil Değiştiren'i gümüş kurşunla indirdik! Artık kimse başkasının yerine geçemez."
        },
        {
            number: 3,
            title: "Kırmızı Halüsinasyonlar",
            description: "Terk edilmiş bir depoda insanlar bilinçsiz halde bulunuyor. Hepsi mutlu bir rüya gördüklerini söylüyor.",
            background: "assets/backgrounds/warehouse.jpg",
            clues: [
                {
                    id: "c3_1",
                    x: 12, y: 20, w: 24, h: 25,
                    text: "Duvarda garip semboller var... Dokunduğunda mavi bir ışık yayıyor. Bunlar antik bir ritüele benziyor."
                },
                {
                    id: "c3_2",
                    x: 50, y: 55, w: 22, h: 22,
                    text: "Kurbanın günlüğünde yazıyor: 'Karım hayatta, mükemmel bir rüyadayım, hiç uyanmak istemiyorum...' Ama karısı yıllar önce ölmüş."
                },
                {
                    id: "c3_3",
                    x: 70, y: 15, w: 18, h: 22,
                    text: "Tavandaki kancalara insanlar asılmış ve kanları yavaş yavaş sağılmış. Kurbanlar hâlâ hayatta ama çok zayıf."
                }
            ],
            correctMonster: "djinn",
            correctWeapon: "lamb_blood_blade",
            solvedText: "Cin'i kuzu kanına batırılmış bıçakla yok ettik! Kurbanlar rüyadan uyandı."
        },
        {
            number: 4,
            title: "Tatlı Sürpriz",
            description: "Garip bir yer... Fizik kuralları burada işlemiyor. Tavanda sandalyeler, duvarlarda neon renkler. Ne oluyor burada?",
            background: "assets/backgrounds/trickster.jpg",
            clues: [
                {
                    id: "c4_1",
                    x: 20, y: 60, w: 22, h: 20,
                    text: "Yerde tonlarca çikolata ve şeker ambalajı var. Bu canavarın şekere büyük bir zaafı var!"
                },
                {
                    id: "c4_2",
                    x: 60, y: 30, w: 20, h: 22,
                    text: "Radyodan ciddi bir haber yerine sirk müziği çalıyor. Gerçeklik bu odada tamamen bükülmüş!"
                },
                {
                    id: "c4_3",
                    x: 40, y: 70, w: 24, h: 18,
                    text: "Bu bir ceset değil... Bu devasa bir oyuncak ayı! Biri bizimle dalga mı geçiyor?"
                }
            ],
            correctMonster: "trickster",
            correctWeapon: "wooden_stake",
            solvedText: "",
            isFinal: true
        }
    ];

    // ==================== STATE ====================
    let currentCase = 0;
    let foundClues = [];
    let monstersData = null;

    // ==================== DOM ELEMENTS ====================
    const gameStart = document.getElementById('game-start');
    const caseIntro = document.getElementById('case-intro');
    const gameScene = document.getElementById('game-scene');
    const gameSolve = document.getElementById('game-solve');
    const caseSolved = document.getElementById('case-solved');
    const gameFinale = document.getElementById('game-finale');
    const journalOverlay = document.getElementById('journal-overlay');

    const startBtn = document.getElementById('game-start-btn');
    const caseGoBtn = document.getElementById('case-go-btn');
    const solveBtn = document.getElementById('solve-btn');
    const nextCaseBtn = document.getElementById('next-case-btn');
    const journalToggleBtn = document.getElementById('journal-toggle-btn');
    const journalCloseBtn = document.getElementById('journal-close-btn');

    const caseNumber = document.getElementById('case-number');
    const caseTitle = document.getElementById('case-title');
    const caseDescription = document.getElementById('case-description');
    const sceneCaseBadge = document.getElementById('scene-case-badge');
    const cluesFound = document.getElementById('clues-found');
    const cluesTotal = document.getElementById('clues-total');
    const sceneBg = document.getElementById('scene-bg');
    const sceneImageContainer = document.getElementById('scene-image-container');
    const cluesList = document.getElementById('clues-list');
    const monsterOptions = document.getElementById('monster-options');
    const weaponOptions = document.getElementById('weapon-options');
    const weaponTitle = document.getElementById('weapon-title');
    const solvedTitle = document.getElementById('solved-title');
    const solvedText = document.getElementById('solved-text');
    const journalPages = document.getElementById('journal-pages');

    // Sesler
    const pageSound = document.getElementById('sound-page');
    const snapSound = document.getElementById('sound-snap');
    const engineSound = document.getElementById('sound-engine');
    const shotgunSound = document.getElementById('sound-shotgun');

    // ==================== INIT ====================
    async function init() {
        try {
            const res = await fetch('data/monsters.json');
            monstersData = await res.json();
            buildJournal();
        } catch(e) {
            console.error('Canavarlar yüklenemedi:', e);
        }
    }

    // ==================== JOURNAL (GÜNLÜK) ====================
    function buildJournal() {
        if (!monstersData) return;
        
        journalPages.innerHTML = '';
        monstersData.monsters.forEach(m => {
            const entry = document.createElement('div');
            entry.className = 'journal-entry';
            entry.innerHTML = `
                <div class="monster-name">${m.icon} ${m.name}</div>
                <div class="monster-info">
                    ${m.description}
                    <strong>İZLERİ:</strong>
                    ${m.signs}
                    <strong>ZAAFI:</strong>
                    ${m.weakness}
                </div>
            `;
            journalPages.appendChild(entry);
        });
    }

    // ==================== SCREEN MANAGEMENT ====================
    function showScreen(screen) {
        [gameStart, caseIntro, gameScene, gameSolve, caseSolved, gameFinale].forEach(s => {
            s.classList.add('hidden');
        });
        screen.classList.remove('hidden');
    }

    // ==================== CASE INTRO ====================
    function showCaseIntro() {
        const c = cases[currentCase];
        caseNumber.textContent = `VAKA #${c.number}`;
        caseTitle.textContent = c.title;
        caseDescription.textContent = c.description;
        showScreen(caseIntro);
    }

    // ==================== SCENE ====================
    function loadScene() {
        const c = cases[currentCase];
        foundClues = [];

        // HUD güncelle
        sceneCaseBadge.textContent = `Vaka #${c.number}`;
        cluesFound.textContent = '0';
        cluesTotal.textContent = c.clues.length.toString();
        cluesList.innerHTML = '';
        solveBtn.classList.add('hidden');

        // Arka plan
        sceneBg.src = c.background;
        sceneBg.alt = c.title;

        // Eski hotspot'ları temizle
        sceneImageContainer.querySelectorAll('.clue-hotspot').forEach(h => h.remove());
        // Eski popup'ları temizle
        document.querySelectorAll('.clue-popup').forEach(p => p.remove());

        // Hotspot'ları ekle
        c.clues.forEach((clue, i) => {
            const hotspot = document.createElement('div');
            hotspot.className = 'clue-hotspot';
            hotspot.style.left = `${clue.x}%`;
            hotspot.style.top = `${clue.y}%`;
            hotspot.style.width = `${clue.w}%`;
            hotspot.style.height = `${clue.h}%`;
            hotspot.dataset.clueIndex = i;

            hotspot.addEventListener('click', () => discoverClue(i));
            sceneImageContainer.appendChild(hotspot);
        });

        showScreen(gameScene);
    }

    // ==================== İPUCU BULMA ====================
    function discoverClue(index) {
        const c = cases[currentCase];
        const clue = c.clues[index];

        // Zaten bulunmuşsa atla
        if (foundClues.includes(index)) return;

        foundClues.push(index);
        playSound(pageSound);

        // Hotspot'u "found" yap
        const hotspot = sceneImageContainer.querySelector(`[data-clue-index="${index}"]`);
        if (hotspot) hotspot.classList.add('found');

        // HUD güncelle
        cluesFound.textContent = foundClues.length.toString();

        // İpucu listesine ekle
        const li = document.createElement('li');
        li.textContent = clue.text;
        cluesList.appendChild(li);

        // Popup göster
        showCluePopup(clue.text);

        // Tüm ipuçları bulunduysa çözüm butonunu göster
        if (foundClues.length >= c.clues.length) {
            setTimeout(() => {
                solveBtn.classList.remove('hidden');
                solveBtn.style.animation = 'fadeInUp 0.5s ease';
            }, 1500);
        }
    }

    function showCluePopup(text) {
        // Eski popup'ı kaldır
        document.querySelectorAll('.clue-popup').forEach(p => p.remove());

        const popup = document.createElement('div');
        popup.className = 'clue-popup';
        popup.innerHTML = `
            <p class="clue-popup-text">"${text}"</p>
            <button class="clue-popup-close">Tamam</button>
        `;
        document.body.appendChild(popup);

        popup.querySelector('.clue-popup-close').addEventListener('click', () => {
            popup.remove();
        });

        // 5 saniye sonra otomatik kapat
        setTimeout(() => {
            if (popup.parentElement) popup.remove();
        }, 5000);
    }

    // ==================== ÇÖZÜM EKRANI ====================
    function showSolveScreen() {
        if (!monstersData) return;

        const c = cases[currentCase];
        
        // Canavar seçenekleri (4 tane: 1 doğru + 3 rastgele)
        const correctId = c.correctMonster;
        const allMonsters = monstersData.monsters.map(m => m.id);
        const wrongMonsters = allMonsters.filter(id => id !== correctId);
        const shuffledWrong = shuffleArray(wrongMonsters).slice(0, 3);
        const options = shuffleArray([correctId, ...shuffledWrong]);

        monsterOptions.innerHTML = '';
        options.forEach(id => {
            const m = monstersData.monsters.find(mon => mon.id === id);
            const btn = document.createElement('button');
            btn.className = 'monster-opt-btn';
            btn.textContent = `${m.icon} ${m.name}`;
            btn.dataset.monsterId = id;
            btn.addEventListener('click', () => selectMonster(id));
            monsterOptions.appendChild(btn);
        });

        // Silah seçeneklerini gizle
        weaponTitle.classList.add('hidden');
        weaponOptions.classList.add('hidden');
        weaponOptions.innerHTML = '';

        showScreen(gameSolve);
    }

    function selectMonster(monsterId) {
        const c = cases[currentCase];
        const buttons = monsterOptions.querySelectorAll('.monster-opt-btn');

        buttons.forEach(btn => {
            btn.classList.add('disabled');
            btn.style.pointerEvents = 'none';
            if (btn.dataset.monsterId === c.correctMonster) {
                btn.classList.add('correct');
            } else if (btn.dataset.monsterId === monsterId && monsterId !== c.correctMonster) {
                btn.classList.add('wrong');
            }
        });

        if (monsterId === c.correctMonster) {
            playSound(shotgunSound);
            // Doğru canavar — silah seçimini göster
            setTimeout(() => showWeaponOptions(), 800);
        } else {
            // Yanlış canavar — tekrar dene
            setTimeout(() => {
                buttons.forEach(btn => {
                    btn.classList.remove('disabled', 'correct', 'wrong');
                    btn.style.pointerEvents = '';
                });
            }, 1500);
        }
    }

    function showWeaponOptions() {
        const c = cases[currentCase];
        
        // Silah seçenekleri (4 tane)
        const correctWeapon = c.correctWeapon;
        const allWeapons = monstersData.weapons.map(w => w.id);
        const wrongWeapons = allWeapons.filter(id => id !== correctWeapon);
        const shuffledWrong = shuffleArray(wrongWeapons).slice(0, 3);
        const options = shuffleArray([correctWeapon, ...shuffledWrong]);

        weaponTitle.classList.remove('hidden');
        weaponOptions.classList.remove('hidden');
        weaponOptions.innerHTML = '';

        options.forEach(id => {
            const w = monstersData.weapons.find(wp => wp.id === id);
            const btn = document.createElement('button');
            btn.className = 'weapon-opt-btn';
            btn.textContent = `${w.name}`;
            btn.dataset.weaponId = id;
            btn.addEventListener('click', () => selectWeapon(id));
            weaponOptions.appendChild(btn);
        });

        weaponTitle.style.animation = 'fadeInUp 0.3s ease';
        weaponOptions.style.animation = 'fadeInUp 0.3s ease';
    }

    function selectWeapon(weaponId) {
        const c = cases[currentCase];
        const buttons = weaponOptions.querySelectorAll('.weapon-opt-btn');

        buttons.forEach(btn => {
            btn.classList.add('disabled');
            btn.style.pointerEvents = 'none';
            if (btn.dataset.weaponId === c.correctWeapon) {
                btn.classList.add('correct');
            } else if (btn.dataset.weaponId === weaponId && weaponId !== c.correctWeapon) {
                btn.classList.add('wrong');
            }
        });

        if (weaponId === c.correctWeapon) {
            playSound(shotgunSound);
            setTimeout(() => {
                if (c.isFinal) {
                    showFinale();
                } else {
                    showCaseSolved();
                }
            }, 1000);
        } else {
            setTimeout(() => {
                buttons.forEach(btn => {
                    btn.classList.remove('disabled', 'correct', 'wrong');
                    btn.style.pointerEvents = '';
                });
            }, 1500);
        }
    }

    // ==================== VAKA ÇÖZÜLDÜ ====================
    function showCaseSolved() {
        const c = cases[currentCase];
        solvedTitle.textContent = 'Vaka Çözüldü!';
        solvedText.textContent = c.solvedText;

        if (currentCase >= cases.length - 2) {
            nextCaseBtn.textContent = 'Son Vaka →';
        } else {
            nextCaseBtn.textContent = 'Sonraki Vaka →';
        }

        showScreen(caseSolved);
    }

    // ==================== FİNAL ====================
    function showFinale() {
        showScreen(gameFinale);
        
        const snapEffect = document.getElementById('snap-effect');
        const finaleMessage = document.getElementById('finale-message');

        playSound(snapSound);

        // Snap efektinden sonra mesajı göster
        setTimeout(() => {
            snapEffect.style.display = 'none';
            finaleMessage.classList.remove('hidden');
            playSound(engineSound);
        }, 2500);
    }

    // ==================== UTILITIES ====================
    function shuffleArray(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function playSound(audioEl) {
        try {
            if (audioEl) {
                audioEl.currentTime = 0;
                audioEl.volume = 0.4;
                audioEl.play().catch(() => {});
            }
        } catch(e) {}
    }

    // ==================== EVENT LISTENERS ====================
    startBtn.addEventListener('click', async () => {
        startBtn.textContent = 'Yükleniyor...';
        startBtn.disabled = true;
        await init();
        currentCase = 0;
        showCaseIntro();
    });

    caseGoBtn.addEventListener('click', () => {
        loadScene();
    });

    solveBtn.addEventListener('click', () => {
        showSolveScreen();
    });

    nextCaseBtn.addEventListener('click', () => {
        currentCase++;
        if (currentCase < cases.length) {
            showCaseIntro();
        }
    });

    journalToggleBtn.addEventListener('click', () => {
        journalOverlay.classList.remove('hidden');
        playSound(pageSound);
    });

    journalCloseBtn.addEventListener('click', () => {
        journalOverlay.classList.add('hidden');
    });

    // Günlük dışına tıklayınca kapat
    journalOverlay.addEventListener('click', (e) => {
        if (e.target === journalOverlay) {
            journalOverlay.classList.add('hidden');
        }
    });
});
