/**
 * MAIN INTERACTIVE SCRIPT FOR PROPOSAL EXPERIENCE
 * Built for Dharsan & Dharsini
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
    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
    const note = scale[index % scale.length];
    playTone(note, 'triangle', 0.4, 0.3);
  }

  function playCelebrationMelody() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'sine', 0.4, 0.3), i * 150);
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
      btn.addEventListener('click', () => selectRiddleOption(btn, optIdx, data.correctIndex, data.hint));
      riddleOptions.appendChild(btn);
    });
  }

  function selectRiddleOption(btnElement, selectedIdx, correctIdx, hintText) {
    initAudio();

    // Disable all options in box
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
      playTone(180, 'sawtooth', 0.3, 0.2); // buzz
      riddleHintText.innerText = hintText;
      riddleHintBox.style.display = 'block';
    }
  }

  nextRiddleBtn.addEventListener('click', () => {
    currentRiddleIndex++;
    if (currentRiddleIndex < CONFIG.riddles.length) {
      renderRiddle(currentRiddleIndex);
    } else {
      // Proceed to Chapter 2
      setChapter(2);
      renderPolaroidGrid();
    }
  });

  // Render initial riddle
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
      
      const rot = (idx % 2 === 0 ? 1 : -1) * (3 + idx * 2);

      card.innerHTML = `
        <div class="polaroid-inner">
          <div class="polaroid-front" style="--rotation: ${rot}">
            <div class="polaroid-icon">${mem.icon}</div>
            <div class="polaroid-title">${mem.title}</div>
            <div class="polaroid-sub">${mem.date}</div>
          </div>
          <div class="polaroid-back">
            <p class="polaroid-back-text">${mem.text}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
          card.classList.add('flipped');
          playTone(400 + idx * 60, 'sine', 0.2, 0.2);
          flippedPolaroidCount++;
          if (flippedPolaroidCount >= CONFIG.memories.length) {
            setTimeout(() => {
              playSuccessChime();
              unlockBanner.style.display = 'block';
            }, 600);
          }
        }
      });

      polaroidGrid.appendChild(card);
    });
  }

  toConstellationBtn.addEventListener('click', () => {
    setChapter(3);
    initConstellationPuzzle();
  });

  // =========================================================================
  // CHAPTER 3: CONSTELLATION STAR PUZZLE
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

    const target = CONFIG.targetLetters; // ["D", "H", "A", "R", "S", "I", "N", "I"]

    // Render Slots
    target.forEach(() => {
      const slot = document.createElement('div');
      slot.className = 'letter-slot';
      slot.innerText = '_';
      letterSlotsContainer.appendChild(slot);
    });

    // Create Shuffled Star Nodes
    const shuffledLetters = [...target].sort(() => Math.random() - 0.5);

    shuffledLetters.forEach((letter, i) => {
      const star = document.createElement('div');
      star.className = 'star-node';
      star.innerText = '★';

      // Random position inside container
      const posX = 10 + Math.random() * 75;
      const posY = 15 + Math.random() * 65;

      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.animationDelay = `${i * 0.4}s`;

      star.addEventListener('click', () => {
        if (star.classList.contains('collected')) return;

        star.classList.add('collected');
        star.innerText = letter;

        collectedLetters.push(letter);
        const currentCount = collectedLetters.length;

        // Sound effect
        playStarSparkleNote(currentCount - 1);

        // Fill slot
        const slots = letterSlotsContainer.querySelectorAll('.letter-slot');
        if (slots[currentCount - 1]) {
          slots[currentCount - 1].innerText = target[currentCount - 1];
          slots[currentCount - 1].classList.add('filled');
        }

        // Check completion
        if (currentCount === target.length) {
          setTimeout(() => {
            playSuccessChime();
            constellationHint.innerText = `✨ Mystery Name Unlocked: ${CONFIG.girlName}! ✨`;
            constellationHint.style.color = '#ffd700';
            constellationHint.style.fontWeight = '700';
            toProposalBtn.style.display = 'inline-flex';
          }, 400);
        }
      });

      starOrbitField.appendChild(star);
    });
  }

  toProposalBtn.addEventListener('click', () => {
    setChapter(4);
    setupProposalChapter();
  });

  // =========================================================================
  // CHAPTER 4: LOVE LETTER & RUNAWAY NO BUTTON
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

  // Click Envelope to Open
  envelopeWrapper.addEventListener('click', () => {
    playSuccessChime();
    envelopeWrapper.style.display = 'none';
    letterCard.style.display = 'block';
  });

  // Runaway "No" Button Logic
  function evadeNoButton(e) {
    const wrapperRect = noBtnWrapper.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random escape position
    const offsetX = (Math.random() - 0.5) * 260;
    const offsetY = (Math.random() - 0.5) * 160;

    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    playTone(300 + Math.random() * 200, 'sine', 0.15, 0.15);

    // Show humorous tooltip
    noTooltip.innerText = CONFIG.proposal.noTooltips[tooltipIndex % CONFIG.proposal.noTooltips.length];
    noTooltip.classList.add('show');
    tooltipIndex++;

    setTimeout(() => {
      noTooltip.classList.remove('show');
    }, 1500);
  }

  noBtn.addEventListener('mouseover', evadeNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    evadeNoButton(e);
  });
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    evadeNoButton(e);
  });

  // "YES!" Button Click -> Celebration
  yesBtn.addEventListener('click', () => {
    playCelebrationMelody();
    startFireworks();
    openCelebrationModal();
  });

  // =========================================================================
  // CELEBRATION MODAL & WHATSAPP INTEGRATION
  // =========================================================================
  const celebrationModal = document.getElementById('celebrationModal');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const replayBtn = document.getElementById('replayBtn');

  function openCelebrationModal() {
    celebrationModal.classList.add('active');

    // Build WhatsApp URL
    let phone = CONFIG.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
    if (!phone) phone = '919000000000'; // Default placeholder

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
  // STARFIELD BACKGROUND ANIMATION CANVAS
  // =========================================================================
  const starCanvas = document.getElementById('starfieldCanvas');
  const starCtx = starCanvas.getContext('2d');

  let stars = [];
  function resizeStarfield() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 140; i++) {
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
  // FIREWORKS CANVAS ANIMATION ENGINE
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
    const colors = ['#ff2a6d', '#ffd700', '#ff758c', '#00f2fe', '#4facfe', '#ffffff'];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0.95 + Math.random() * 0.03,
        size: 2 + Math.random() * 3
      });
    }
  }

  function animateFireworks() {
    if (!fireworksRunning) return;

    fwCtx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

    // Random fireworks trigger
    if (Math.random() < 0.1) {
      createExplosion(
        Math.random() * fwCanvas.width,
        Math.random() * (fwCanvas.height * 0.6)
      );
    }

    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravity
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
