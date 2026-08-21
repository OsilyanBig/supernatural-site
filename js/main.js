/* ============================================
   SUPERNATURAL SITE — ANA SAYFA
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    const enterBtn = document.getElementById('intro-enter-btn');
    const doorSound = document.getElementById('sound-door');

    // Kapıyı Aç butonu
    enterBtn.addEventListener('click', () => {
        // Kapı sesi çal (varsa)
        try {
            doorSound.currentTime = 0;
            doorSound.volume = 0.5;
            doorSound.play().catch(() => {});
        } catch(e) {}

        // Intro'yu kapat
        introScreen.classList.add('fade-out');

        // Intro tamamen kaybolunca ana ekranı göster
        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainScreen.classList.remove('hidden');
            mainScreen.style.animation = 'fadeIn 0.8s ease forwards';
        }, 800);
    });

    // Nav kartlarına dokunma efekti
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.querySelector('.nav-card-glow').style.opacity = '1';
        });
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                const glow = card.querySelector('.nav-card-glow');
                if (glow) glow.style.opacity = '0';
            }, 200);
        });
    });
});
