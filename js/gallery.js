/* ============================================
   SUPERNATURAL — ANILAR DUVARI (GALERİ)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Kasetçalar ----
    const cassettePlayer = document.getElementById('cassette-player');
    const cassetteToggle = document.getElementById('cassette-toggle');
    const cassetteTitle = document.getElementById('cassette-title');
    const tapeBtns = document.querySelectorAll('.tape-btn');
    const ytContainer = document.getElementById('yt-embed-container');

    const tapes = [
        {
            name: 'Carry On Wayward Son',
            youtubeId: 'P5ZJui3aPoQ'
        },
        {
            name: 'Eye of the Tiger',
            youtubeId: 'btPJPFnesV4'
        },
        {
            name: 'Heat of the Moment',
            youtubeId: 'lCALGlGuVUA'
        }
    ];

    let currentTape = -1;

    // Kasetçalar aç/kapa
    cassetteToggle.addEventListener('click', () => {
        cassettePlayer.classList.toggle('open');
    });

    // Kaset seç
    tapeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tapeIndex = parseInt(btn.dataset.tape);
            
            // Aynı kasete basıldıysa kapat
            if (currentTape === tapeIndex) {
                stopMusic();
                return;
            }

            playTape(tapeIndex);
        });
    });

    function playTape(index) {
        currentTape = index;
        const tape = tapes[index];
        
        // Aktif kaset stilini güncelle
        tapeBtns.forEach(b => b.classList.remove('active'));
        tapeBtns[index].classList.add('active');

        // Başlığı güncelle
        cassetteTitle.textContent = `▶ ${tape.name}`;

        // YouTube iframe embed et
        ytContainer.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${tape.youtubeId}?autoplay=1&loop=1&playlist=${tape.youtubeId}" 
                allow="autoplay; encrypted-media" 
                allowfullscreen
                title="${tape.name}">
            </iframe>
        `;
        ytContainer.classList.add('visible');
    }

    function stopMusic() {
        currentTape = -1;
        tapeBtns.forEach(b => b.classList.remove('active'));
        cassetteTitle.textContent = 'Kaset Seç';
        ytContainer.innerHTML = '';
        ytContainer.classList.remove('visible');
    }

    // ---- Polaroid tıklama (büyütme) ----
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(p => {
        p.addEventListener('click', () => {
            // Zaten aktifse kapat
            if (p.classList.contains('zoomed')) {
                p.classList.remove('zoomed');
                return;
            }
            // Diğerlerini kapat
            polaroids.forEach(other => other.classList.remove('zoomed'));
            p.classList.add('zoomed');
        });
    });
});
