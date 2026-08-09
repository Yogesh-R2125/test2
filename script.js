/**
 * MAIN INTERACTIVE SCRIPT FOR DHARSAN & DHARSHANI PROPOSAL EXPERIENCE
 * Mobile-Optimized with Web Audio Synthesizer, Evasive Button Physics, and Fireworks
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  let currentChapter = 1;
  let currentRiddleIndex = 0;
  let flippedPolaroidCount = 0;
  let collectedLetters = [];
  let soundEnabled = true;

  // Audio Context (Web Audio API Synthesizer)
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play synthetic audio chimes
  function playTone(freq, type = 'sine', duration = 0.3, volume = 0.2) {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio playback notice:', e);
    }
  }

  function playSuccessChime() {
    playTone(523.25, 'sine', 0.2, 0.25); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.2, 0.25), 100); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.4, 0.3), 200); // G5
  }

  function playStarSparkleNote(index) {
    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33]; // C major scale
    const note = scale[index % scale.length];
    playTone(note, 'triangle', 0.35, 0.3);
  }

  function playCelebrationMelody() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'sine', 0.4, 0.3), i * 140);
    });
  }

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundText = document.getElementById('soundText');

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundIcon.className = 'fa-solid fa-volume-high';
      soundText.innerText = 'Sound ON';
      playTone(440, 'sine', 0.2, 0.2);
    } else {
      soundIcon.className = 'fa-solid fa-volume-xmark';
      soundText.innerText = 'Sound OFF';
    }
  });

  // Navigation & Progress Bar
  const progressFill = document.getElementById('progressFill');
  const stepLabels = [
    document.getElementById('step1Label'),
    document.getElementById('step2Label'),
    document.getElementById('step3Label'),
    document.getElementById('step4Label')
  ];

  function setChapter(chapterNum) {
    currentChapter = chapterNum;

    // Hide all chapters
    document.querySelectorAll('.chapter-section').forEach(sec => sec.classList.remove('active'));

    // Show active chapter
    const activeSec = document.getElementById(`chapter${chapterNum}`);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    // Update progress fill & labels
    const progressPercent = (chapterNum / 4) * 100;
    progressFill.style.width = `${progressPercent}%`;

    stepLabels.forEach((label, idx) => {
      if (idx + 1 <= chapterNum) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // CHAPTER 1: RIDDLE LOGIC
  // =========================================================================
  const riddleCounter = document.getElementById('riddleCounter');
  const riddleTitle = document.getElementById('riddleTitle');
  const riddleQuestion = document.getElementById('riddleQuestion');
  const riddleOptions = document.getElementById('riddleOptions');
  const riddleHintBox = document.getElementById('riddleHintBox');
  const riddleHintText = document.getElementById('riddleHintText');
  const nextRiddleBtn = document.getElementById('nextRiddleBtn');

  function renderRiddle(index) {
    const data = CONFIG.riddles[index];
    if (!data) return;

    riddleCounter.innerText = `Clue ${index + 1} of ${CONFIG.riddles.length}`;
    riddleTitle.innerText = data.title;
    riddleQuestion.innerText = data.question;
    riddleHintBox.style.display = 'none';
    nextRiddleBtn.disabled = true;

    riddleOptions.innerHTML = '';
    data.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${optText}</span> <i class="fa-regular fa-circle"></i>`;
      
      const handleSelect = (e) => {
        e.preventDefault();
        selectRiddleOption(btn, optIdx, data.correctIndex, data.hint);
      };

      btn.addEventListener('click', handleSelect);
      riddleOptions.appendChild(btn);
    });
  }

  function selectRiddleOption(btnElement, selectedIdx, correctIdx, hintText) {
    initAudio();

    const allBtns = riddleOptions.querySelectorAll('.option-btn');
    
    if (selectedIdx === correctIdx) {
      allBtns.forEach(b => b.style.pointerEvents = 'none');
      btnElement.classList.add('selected-correct');
      btnElement.querySelector('i').className = 'fa-solid fa-circle-check';
      playSuccessChime();
      nextRiddleBtn.disabled = false;
    } else {
      btnElement.classList.add('selected-wrong');
      btnElement.querySelector('i').className = 'fa-solid fa-circle-xmark';
      playTone(180, 'sawtooth', 0.25, 0.2);
      riddleHintText.innerText = hintText;
      riddleHintBox.style.display = 'block';
    }
  }

  nextRiddleBtn.addEventListener('click', () => {
    currentRiddleIndex++;
    if (currentRiddleIndex < CONFIG.riddles.length) {
      renderRiddle(currentRiddleIndex);
    } else {
      setChapter(2);
      renderPolaroidGrid();
    }
  });

  renderRiddle(0);

  // =========================================================================
  // CHAPTER 2: POLAROID MEMORY GRID
  // =========================================================================
  const polaroidGrid = document.getElementById('polaroidGrid');
  const unlockBanner = document.getElementById('unlockBanner');
  const toConstellationBtn = document.getElementById('toConstellationBtn');

  function renderPolaroidGrid() {
    polaroidGrid.innerHTML = '';
    flippedPolaroidCount = 0;
    unlockBanner.style.display = 'none';

    CONFIG.memories.forEach((mem, idx) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      const rot = (idx % 2 === 0 ? 1 : -1) * (2 + idx);

      card.innerHTML = `
        <div class="polaroid-inner">
          <div class="polaroid-front" style="transform: rotate(${rot}deg)">
            <div class="polaroid-icon">${mem.icon}</div>
            <div class="polaroid-title">${mem.title}</div>
            <div class="polaroid-sub">${mem.date}</div>
          </div>
          <div class="polaroid-back">
            <p class="polaroid-back-text">${mem.text}</p>
          </div>
        </div>
      `;

      const flipCard = () => {
        if (!card.classList.contains('flipped')) {
          card.classList.add('flipped');
          playTone(400 + idx * 60, 'sine', 0.2, 0.2);
          flippedPolaroidCount++;
          if (flippedPolaroidCount >= CONFIG.memories.length) {
            setTimeout(() => {
              playSuccessChime();
              unlockBanner.style.display = 'block';
            }, 500);
          }
        }
      };

      card.addEventListener('click', flipCard);
      polaroidGrid.appendChild(card);
    });
  }

  toConstellationBtn.addEventListener('click', () => {
    setChapter(3);
    initConstellationPuzzle();
  });

  // =========================================================================
  // CHAPTER 3: CONSTELLATION STAR PUZZLE (D-H-A-R-S-H-A-N-I)
  // =========================================================================
  const letterSlotsContainer = document.getElementById('letterSlotsContainer');
  const starOrbitField = document.getElementById('starOrbitField');
  const toProposalBtn = document.getElementById('toProposalBtn');
  const constellationHint = document.getElementById('constellationHint');

  function initConstellationPuzzle() {
    letterSlotsContainer.innerHTML = '';
    starOrbitField.innerHTML = '';
    collectedLetters = [];
    toProposalBtn.style.display = 'none';
    constellationHint.style.display = 'block';

    const target = CONFIG.targetLetters; // ["D", "H", "A", "R", "S", "H", "A", "N", "I"]

    // Render Slots (Initially empty)
    target.forEach(() => {
      const slot = document.createElement('div');
      slot.className = 'letter-slot';
      slot.innerText = '_';
      letterSlotsContainer.appendChild(slot);
    });

    // Pair each letter with its exact position in the name
    const starItems = target.map((letter, originalIndex) => ({ letter, originalIndex }));

    // Shuffle stars in random scatter order
    const shuffledItems = [...starItems].sort(() => Math.random() - 0.5);

    shuffledItems.forEach((item, i) => {
      const star = document.createElement('div');
      star.className = 'star-node';
      star.innerText = '★';

      // Distribute randomly in orbit field
      const posX = 6 + Math.random() * 78;
      const posY = 10 + Math.random() * 70;

      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.animationDelay = `${i * 0.3}s`;

      const collectStar = (e) => {
        e.preventDefault();
        if (star.classList.contains('collected')) return;

        star.classList.add('collected');
        star.innerText = item.letter;

        collectedLetters.push(item);
        const currentCount = collectedLetters.length;

        playStarSparkleNote(currentCount - 1);

        // Fill the letter into its EXACT original slot in the name!
        const slots = letterSlotsContainer.querySelectorAll('.letter-slot');
        if (slots[item.originalIndex]) {
          slots[item.originalIndex].innerText = item.letter;
          slots[item.originalIndex].classList.add('filled');
        }

        if (currentCount === target.length) {
          setTimeout(() => {
            playSuccessChime();
            constellationHint.innerText = `✨ Secret Name Unlocked: ${CONFIG.girlName}! ✨`;
            constellationHint.style.color = '#ffd700';
            constellationHint.style.fontWeight = '700';
            toProposalBtn.style.display = 'inline-flex';
          }, 350);
        }
      };

      star.addEventListener('click', collectStar);
      star.addEventListener('touchstart', collectStar, { passive: false });
      starOrbitField.appendChild(star);
    });
  }

  toProposalBtn.addEventListener('click', () => {
    setChapter(4);
    setupProposalChapter();
  });

  // =========================================================================
  // CHAPTER 4: LOVE LETTER & MOBILE-FRIENDLY RUNAWAY NO BUTTON
  // =========================================================================
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const letterCard = document.getElementById('letterCard');
  const salutationText = document.getElementById('salutationText');
  const letterBody = document.getElementById('letterBody');
  const closingText = document.getElementById('closingText');
  const signatureText = document.getElementById('signatureText');
  const proposalQuestion = document.getElementById('proposalQuestion');
  const yesBtnText = document.getElementById('yesBtnText');
  const noBtnText = document.getElementById('noBtnText');

  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const noBtnWrapper = document.getElementById('noBtnWrapper');
  const noTooltip = document.getElementById('noTooltip');

  let tooltipIndex = 0;

  function setupProposalChapter() {
    salutationText.innerText = CONFIG.letter.salutation;
    closingText.innerText = CONFIG.letter.closing;
    signatureText.innerText = `${CONFIG.letter.signature} ❤️`;
    proposalQuestion.innerText = CONFIG.proposal.question;
    yesBtnText.innerText = CONFIG.proposal.yesButtonText;
    noBtnText.innerText = CONFIG.proposal.noButtonText;

    letterBody.innerHTML = '';
    CONFIG.letter.paragraphs.forEach(pText => {
      const p = document.createElement('p');
      p.innerText = pText;
      letterBody.appendChild(p);
    });

    envelopeWrapper.style.display = 'block';
    letterCard.style.display = 'none';
  }

  envelopeWrapper.addEventListener('click', () => {
    playSuccessChime();
    envelopeWrapper.style.display = 'none';
    letterCard.style.display = 'block';
  });

  // Evasive No Button dodge calculation for Mobile & Desktop
  function evadeNoButton(e) {
    if (e) e.preventDefault();

    const maxDistX = Math.min(130, window.innerWidth * 0.35);
    const maxDistY = Math.min(90, window.innerHeight * 0.2);

    const offsetX = (Math.random() - 0.5) * maxDistX * 2;
    const offsetY = (Math.random() - 0.5) * maxDistY * 2;

    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    playTone(320 + Math.random() * 180, 'sine', 0.15, 0.15);

    noTooltip.innerText = CONFIG.proposal.noTooltips[tooltipIndex % CONFIG.proposal.noTooltips.length];
    noTooltip.classList.add('show');
    tooltipIndex++;

    setTimeout(() => {
      noTooltip.classList.remove('show');
    }, 1400);
  }

  noBtn.addEventListener('mouseover', evadeNoButton);
  noBtn.addEventListener('pointerdown', evadeNoButton);
  noBtn.addEventListener('touchstart', evadeNoButton, { passive: false });
  noBtn.addEventListener('click', evadeNoButton);

  // YES Button Click
  yesBtn.addEventListener('click', () => {
    playCelebrationMelody();
    startFireworks();
    openCelebrationModal();
  });

  // =========================================================================
  // CELEBRATION MODAL & WHATSAPP LINK
  // =========================================================================
  const celebrationModal = document.getElementById('celebrationModal');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const replayBtn = document.getElementById('replayBtn');

  function openCelebrationModal() {
    celebrationModal.classList.add('active');

    let phone = CONFIG.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
    if (!phone) phone = '918973488089';

    const message = encodeURIComponent(CONFIG.whatsapp.customMessage);
    const waUrl = `https://wa.me/${phone}?text=${message}`;

    whatsappBtn.href = waUrl;
  }

  replayBtn.addEventListener('click', () => {
    celebrationModal.classList.remove('active');
    stopFireworks();
    setChapter(1);
    currentRiddleIndex = 0;
    renderRiddle(0);
  });

  // =========================================================================
  // STARFIELD ANIMATION
  // =========================================================================
  const starCanvas = document.getElementById('starfieldCanvas');
  const starCtx = starCanvas.getContext('2d');
  let stars = [];

  function resizeStarfield() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = [];
    const count = Math.min(130, Math.floor(window.innerWidth / 4));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        size: Math.random() * 2,
        alpha: Math.random(),
        speed: 0.2 + Math.random() * 0.4
      });
    }
  }

  function drawStarfield() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    starCtx.fillStyle = '#ffffff';

    stars.forEach(s => {
      s.alpha += s.speed * 0.01;
      const currentAlpha = (Math.sin(s.alpha) + 1) / 2;
      starCtx.globalAlpha = currentAlpha;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      starCtx.fill();
    });

    requestAnimationFrame(drawStarfield);
  }

  window.addEventListener('resize', resizeStarfield);
  resizeStarfield();
  drawStarfield();

  // =========================================================================
  // FIREWORKS CANVAS ENGINE
  // =========================================================================
  const fwCanvas = document.getElementById('fireworksCanvas');
  const fwCtx = fwCanvas.getContext('2d');
  let fireworksRunning = false;
  let particles = [];

  function resizeFireworks() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFireworks);
  resizeFireworks();

  function createExplosion(x, y) {
    const colors = ['#ff2a6d', '#ffd700', '#ff758c', '#00f2fe', '#ffffff'];
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0.94 + Math.random() * 0.03,
        size: 2 + Math.random() * 2.5
      });
    }
  }

  function animateFireworks() {
    if (!fireworksRunning) return;

    fwCtx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

    if (Math.random() < 0.12) {
      createExplosion(
        Math.random() * fwCanvas.width,
        Math.random() * (fwCanvas.height * 0.6)
      );
    }

    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.alpha *= p.life;

      fwCtx.save();
      fwCtx.globalAlpha = p.alpha;
      fwCtx.fillStyle = p.color;
      fwCtx.beginPath();
      fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fwCtx.fill();
      fwCtx.restore();

      if (p.alpha < 0.01) {
        particles.splice(idx, 1);
      }
    });

    requestAnimationFrame(animateFireworks);
  }

  function startFireworks() {
    fireworksRunning = true;
    particles = [];
    animateFireworks();
  }

  function stopFireworks() {
    fireworksRunning = false;
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  }
});
