/* ============================================
   SUPERNATURAL — AVCI SINAVI (QUIZ)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let questions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;

    // DOM Elements
    const startScreen = document.getElementById('quiz-start');
    const questionScreen = document.getElementById('quiz-question');
    const resultScreen = document.getElementById('quiz-result');
    const startBtn = document.getElementById('quiz-start-btn');
    const retryBtn = document.getElementById('quiz-retry-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const questionText = document.getElementById('question-text');
    const answersGrid = document.getElementById('answers-grid');
    const progressFill = document.getElementById('quiz-progress-fill');
    const progressText = document.getElementById('quiz-progress-text');
    const feedbackDiv = document.getElementById('answer-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const scoreNumber = document.getElementById('score-number');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');

    // Sesler
    const correctSound = document.getElementById('sound-correct');
    const wrongSound = document.getElementById('sound-wrong');

    // Soruları yükle
    async function loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            const data = await response.json();
            questions = shuffleArray(data).slice(0, 10);
        } catch(e) {
            console.error('Sorular yüklenemedi:', e);
            questions = [];
        }
    }

    // Diziyi karıştır (Fisher-Yates)
    function shuffleArray(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Oyunu başlat
    function startQuiz() {
        currentIndex = 0;
        score = 0;
        answered = false;

        startScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');

        showQuestion();
    }

    // Soruyu göster
    function showQuestion() {
        answered = false;
        feedbackDiv.classList.add('hidden');

        const q = questions[currentIndex];
        questionText.textContent = q.question;
        
        // Progress güncelle
        progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
        progressText.textContent = `${currentIndex + 1} / ${questions.length}`;

        // Cevap butonlarını oluştur
        const letters = ['A', 'B', 'C', 'D'];
        answersGrid.innerHTML = '';
        
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.innerHTML = `<span class="answer-letter">${letters[i]})</span> ${opt}`;
            btn.addEventListener('click', () => selectAnswer(i));
            answersGrid.appendChild(btn);
        });
    }

    // Cevap seç
    function selectAnswer(index) {
        if (answered) return;
        answered = true;

        const q = questions[currentIndex];
        const buttons = answersGrid.querySelectorAll('.answer-btn');

        // Tüm butonları devre dışı bırak
        buttons.forEach(btn => btn.classList.add('disabled'));

        // Doğru cevabı yeşil yap
        buttons[q.correct].classList.add('correct');

        if (index === q.correct) {
            // DOĞRU
            score++;
            feedbackText.textContent = `✓ Doğru! ${q.explanation}`;
            feedbackText.className = 'feedback-text correct-feedback';
            playSound(correctSound);
        } else {
            // YANLIŞ
            buttons[index].classList.add('wrong');
            feedbackText.textContent = `✗ Yanlış! ${q.explanation}`;
            feedbackText.className = 'feedback-text wrong-feedback';
            playSound(wrongSound);
        }

        feedbackDiv.classList.remove('hidden');

        // Son soru ise buton metnini değiştir
        if (currentIndex >= questions.length - 1) {
            nextBtn.textContent = 'Sonuçları Gör →';
        } else {
            nextBtn.textContent = 'Sonraki Soru →';
        }
    }

    // Sonraki soru
    function nextQuestion() {
        currentIndex++;
        if (currentIndex >= questions.length) {
            showResults();
        } else {
            showQuestion();
        }
    }

    // Sonuçları göster
    function showResults() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        scoreNumber.textContent = score;

        if (score <= 3) {
            resultTitle.textContent = 'Çaylak Avcı';
            resultMessage.textContent = 'Daha çok Supernatural izlemen lazım, Azra! Ama merak etme, Winchester kardeşler de bir yerden başladı. 😄';
        } else if (score <= 6) {
            resultTitle.textContent = 'Deneyimli Avcı';
            resultMessage.textContent = 'Fena değilsin! Bobby seninle gurur duyardı. Ama hâlâ öğrenecek çok şey var. 🔫';
        } else if (score <= 9) {
            resultTitle.textContent = 'Elit Avcı';
            resultMessage.textContent = 'Harika! Sen tam bir Winchester\'sın, Azra! Neredeyse mükemmel bir skor! ⛤';
        } else {
            resultTitle.textContent = '🏆 Efsane Avcı';
            resultMessage.textContent = 'MÜKEMMEL! 10/10! Sen sadece avcı değilsin, sen bir efsanesin Azra! Bobby bile sana "idjit" diyemezdi! 👑';
        }
    }

    // Ses çal
    function playSound(audioEl) {
        try {
            if (audioEl) {
                audioEl.currentTime = 0;
                audioEl.volume = 0.4;
                audioEl.play().catch(() => {});
            }
        } catch(e) {}
    }

    // Event Listeners
    startBtn.addEventListener('click', async () => {
        startBtn.textContent = 'Yükleniyor...';
        startBtn.disabled = true;
        await loadQuestions();
        
        if (questions.length === 0) {
            startBtn.textContent = 'Sorular yüklenemedi, tekrar dene';
            startBtn.disabled = false;
            return;
        }
        startQuiz();
    });

    nextBtn.addEventListener('click', nextQuestion);
    retryBtn.addEventListener('click', async () => {
        await loadQuestions();
        startQuiz();
    });
});
