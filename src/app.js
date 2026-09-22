// DevType Client Application Engine
(function () {
  const { calculateWPM, calculateAccuracy, formatTime, evaluateChar } = window.DevTypeLogic;
  const SNIPPETS = window.DevTypeSnippets;
  const { tokenizeCode } = window.DevTypeSyntax;

  // Application State
  const state = {
    language: 'cpp',
    difficulty: 'easy',
    duration: 30, // seconds
    snippetIndex: 0,
    targetText: '',
    snippetName: '',
    tokens: [],
    typedText: '',
    mistakeCount: 0,
    startTime: null,
    timerId: null,
    timeLeft: 30,
    status: 'IDLE' // 'IDLE' | 'RUNNING' | 'FINISHED'
  };

  // DOM Elements
  const snippetDisplay = document.getElementById('snippet-display');
  const snippetTitle = document.getElementById('snippet-title');
  const snippetDiffBadge = document.getElementById('snippet-diff-badge');
  const hiddenInput = document.getElementById('hidden-input');
  const caret = document.getElementById('caret');
  const timeDisplay = document.getElementById('time-display');
  const wpmDisplay = document.getElementById('wpm-display');
  const accDisplay = document.getElementById('acc-display');
  const restartBtn = document.getElementById('restart-btn');
  const rerollBtn = document.getElementById('reroll-btn');
  const resultsCard = document.getElementById('results-card');
  const resultWpm = document.getElementById('result-wpm');
  const resultAcc = document.getElementById('result-acc');
  const resultChars = document.getElementById('result-chars');
  const resultErrors = document.getElementById('result-errors');
  const resultRestartBtn = document.getElementById('result-restart-btn');
  const typingBox = document.getElementById('typing-box');

  const langButtons = document.querySelectorAll('[data-lang]');
  const diffButtons = document.querySelectorAll('[data-diff]');
  const timeButtons = document.querySelectorAll('[data-time]');

  /**
   * Loads target snippet based on language, difficulty, and snippetIndex.
   */
  function loadSnippet() {
    const langData = SNIPPETS[state.language] || SNIPPETS.cpp;
    const diffList = langData[state.difficulty] || langData.medium;
    const current = diffList[state.snippetIndex % diffList.length];

    state.targetText = current.code;
    state.snippetName = current.name;

    if (snippetTitle) snippetTitle.textContent = current.name;
    if (snippetDiffBadge) snippetDiffBadge.textContent = state.difficulty;

    state.tokens = tokenizeCode(state.targetText, state.language);
    renderSnippet();
  }

  /**
   * Renders characters in snippet container with syntax and typing states.
   * If a character is typed incorrectly, displays user's typed character in red.
   */
  function renderSnippet() {
    snippetDisplay.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];
      const expected = token.char;
      const typed = state.typedText[i];
      const evalStatus = evaluateChar(expected, typed);

      const span = document.createElement('span');
      span.className = `char ${evalStatus} tok-${token.type}`;
      span.dataset.index = i;

      if (evalStatus === 'incorrect') {
        if (typed === ' ') {
          span.textContent = '·'; // Visual marker for mistyped space
          span.classList.add('char-space');
        } else {
          span.textContent = typed;
        }
      } else {
        span.textContent = expected;
      }

      fragment.appendChild(span);
    }

    snippetDisplay.appendChild(fragment);
    updateCaretPosition();
  }

  /**
   * Updates visual caret to sit at the active typing position.
   */
  function updateCaretPosition() {
    const charElements = snippetDisplay.querySelectorAll('.char');
    const activeIndex = state.typedText.length;

    if (activeIndex < charElements.length) {
      const targetEl = charElements[activeIndex];
      const rect = targetEl.getBoundingClientRect();
      const containerRect = typingBox.getBoundingClientRect();

      caret.style.display = 'block';
      caret.style.left = (rect.left - containerRect.left) + 'px';
      caret.style.top = (rect.top - containerRect.top) + 'px';
      caret.style.height = (rect.height || 28) + 'px';
    } else {
      caret.style.display = 'none';
    }
  }

  /**
   * Starts countdown timer and live metrics tracking.
   */
  function startTest() {
    state.status = 'RUNNING';
    state.startTime = performance.now();
    state.timeLeft = state.duration;

    state.timerId = setInterval(() => {
      state.timeLeft--;
      timeDisplay.textContent = formatTime(state.timeLeft);

      const elapsedSeconds = (performance.now() - state.startTime) / 1000;
      const correctCount = countCorrectChars();
      const currentWpm = calculateWPM(correctCount, elapsedSeconds);
      const currentAcc = calculateAccuracy(correctCount, state.typedText.length);

      wpmDisplay.textContent = currentWpm;
      accDisplay.textContent = currentAcc + '%';

      if (state.timeLeft <= 0) {
        endTest();
      }
    }, 1000);
  }

  /**
   * Counts correctly typed characters.
   */
  function countCorrectChars() {
    let correct = 0;
    for (let i = 0; i < state.typedText.length; i++) {
      if (state.typedText[i] === state.targetText[i]) {
        correct++;
      }
    }
    return correct;
  }

  /**
   * Completes test, calculates final statistics, and shows results modal.
   */
  function endTest() {
    clearInterval(state.timerId);
    state.status = 'FINISHED';

    const elapsedSeconds = state.duration - state.timeLeft || 1;
    const correctCount = countCorrectChars();
    const finalWpm = calculateWPM(correctCount, elapsedSeconds);
    const finalAcc = calculateAccuracy(correctCount, state.typedText.length);

    resultWpm.textContent = finalWpm;
    resultAcc.textContent = finalAcc + '%';
    resultChars.textContent = correctCount + '/' + state.typedText.length;
    resultErrors.textContent = state.mistakeCount;

    resultsCard.hidden = false;
    resultsCard.setAttribute('aria-hidden', 'false');
    hiddenInput.blur();
  }

  /**
   * Resets test state and prepares a fresh or next snippet.
   */
  function resetTest(nextSnippet) {
    clearInterval(state.timerId);
    state.status = 'IDLE';
    state.startTime = null;
    state.typedText = '';
    state.mistakeCount = 0;
    state.timeLeft = state.duration;

    if (nextSnippet) {
      const langData = SNIPPETS[state.language] || SNIPPETS.cpp;
      const diffList = langData[state.difficulty] || langData.medium;
      if (diffList && diffList.length > 1) {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * diffList.length);
        } while (nextIndex === (state.snippetIndex % diffList.length));
        state.snippetIndex = nextIndex;
      } else {
        state.snippetIndex++;
      }
    }

    timeDisplay.textContent = formatTime(state.duration);
    wpmDisplay.textContent = '0';
    accDisplay.textContent = '100%';

    resultsCard.hidden = true;
    resultsCard.setAttribute('aria-hidden', 'true');

    loadSnippet();
    hiddenInput.value = '';
    hiddenInput.focus();
  }

  // ── Input & Keystroke Handling ──

  hiddenInput.addEventListener('input', (e) => {
    if (state.status === 'FINISHED') return;

    if (state.status === 'IDLE') {
      startTest();
    }

    const newTyped = e.target.value;

    // Count mistakes when typing forward
    if (newTyped.length > state.typedText.length) {
      const idx = newTyped.length - 1;
      if (newTyped[idx] !== state.targetText[idx]) {
        state.mistakeCount++;
      }
    }

    state.typedText = newTyped;
    renderSnippet();

    // End test if full snippet is completed
    if (state.typedText.length >= state.targetText.length) {
      endTest();
    }
  });

  // Handle Tab key without losing input focus
  hiddenInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (state.status === 'FINISHED') return;

      if (state.status === 'IDLE') {
        startTest();
      }

      const currentPos = state.typedText.length;
      const target = state.targetText;
      let insertStr = '  '; // default 2 spaces

      if (target.slice(currentPos, currentPos + 4) === '    ') {
        insertStr = '    ';
      } else if (target.slice(currentPos, currentPos + 2) === '  ') {
        insertStr = '  ';
      } else if (target[currentPos] === '\t') {
        insertStr = '\t';
      }

      hiddenInput.value += insertStr;
      hiddenInput.dispatchEvent(new Event('input'));
    }
  });

  // Keep input focused when clicking typing container
  typingBox.addEventListener('click', () => {
    if (state.status !== 'FINISHED') {
      hiddenInput.focus();
    }
  });

  // Language buttons (C++, Java, C#)
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      langButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.language = btn.dataset.lang;
      state.snippetIndex = 0;
      resetTest(false);
    });
  });

  // Difficulty buttons (easy, med, hard)
  diffButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      diffButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.diff;
      state.snippetIndex = 0;
      resetTest(false);
    });
  });

  // Time buttons (15s, 30s, 60s)
  timeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      timeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.duration = parseInt(btn.dataset.time, 10);
      resetTest(false);
    });
  });

  // Reroll snippet button
  if (rerollBtn) {
    rerollBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetTest(true);
    });
  }

  restartBtn.addEventListener('click', () => resetTest(false));
  resultRestartBtn.addEventListener('click', () => resetTest(true));

  // Keyboard shortcut: Escape to restart
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      resetTest(false);
    }
  });

  window.addEventListener('resize', () => {
    updateCaretPosition();
  });

  // Initial load
  resetTest(false);
})();
