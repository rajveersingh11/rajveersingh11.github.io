/* ============================================================
   GAME.JS — Guess the AI Term (Quiz with timer, lives, difficulty)
   ============================================================ */
PortfolioUtils.initPage('../', () => {

  // ---------- QUESTION BANK (20 questions) ----------
  const questionBank = [
    { text: "A machine learning technique where a model learns from labeled data to predict outcomes.", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Transfer Learning"], correct: 0, category: "Fundamentals", hint: "Think of a teacher providing correct answers during training.", explanation: "Supervised learning uses labeled datasets to train models to classify data or predict outcomes." },
    { text: "When a model performs well on training data but poorly on unseen data, it's called ___ .", options: ["Underfitting", "Overfitting", "Bias", "Variance"], correct: 1, category: "Model Evaluation", hint: "The model memorized the training data too well.", explanation: "Overfitting happens when a model learns noise and details too specifically, losing generalization." },
    { text: "Which neural network architecture is best suited for image recognition tasks?", options: ["RNN", "LSTM", "CNN", "GAN"], correct: 2, category: "Deep Learning", hint: "It uses convolution layers to detect spatial hierarchies.", explanation: "Convolutional Neural Networks (CNNs) are designed to process grid-like data like images." },
    { text: "The framework that helps build LLM applications with chains, agents, and memory is called ___ .", options: ["TensorFlow", "PyTorch", "LangChain", "Hugging Face"], correct: 2, category: "LLM Tools", hint: "It's named after 'language chains'.", explanation: "LangChain is the most popular framework for composing LLMs into applications." },
    { text: "What does RAG stand for in AI?", options: ["Recursive Attention Graph", "Retrieval-Augmented Generation", "Reinforced Adaptive Gradient", "Random Access Generator"], correct: 1, category: "LLM Techniques", hint: "It combines document retrieval with text generation.", explanation: "RAG retrieves relevant documents from a knowledge base and uses them to ground LLM responses." },
    { text: "Which algorithm is used to reduce dimensionality while preserving most variance?", options: ["PCA", "t-SNE", "LDA", "K-Means"], correct: 0, category: "Data Science", hint: "It stands for Principal Component Analysis.", explanation: "PCA transforms features into orthogonal components ordered by variance explained." },
    { text: "A technique that randomly turns off neurons during training to prevent overfitting.", options: ["Dropout", "BatchNorm", "Early Stopping", "Regularization"], correct: 0, category: "Deep Learning", hint: "It 'drops' units randomly.", explanation: "Dropout forces the network to learn redundant representations, improving generalization." },
    { text: "Which generative model uses a generator and discriminator in a competitive process?", options: ["VAE", "GAN", "Diffusion Model", "Autoencoder"], correct: 1, category: "Generative AI", hint: "It's a two-player game between a forger and a detective.", explanation: "Generative Adversarial Networks (GANs) learn to create realistic data by competing." },
    { text: "The measure of how well a model's predictions match the true values.", options: ["Accuracy", "Loss", "Precision", "Recall"], correct: 0, category: "Metrics", hint: "It's the ratio of correct predictions over total.", explanation: "Accuracy = (TP+TN)/(TP+TN+FP+FN)." },
    { text: "An algorithm that finds the optimal policy by maximizing cumulative reward.", options: ["Q-Learning", "Linear Regression", "KNN", "Decision Tree"], correct: 0, category: "Reinforcement Learning", hint: "It learns a value function for state-action pairs.", explanation: "Q-Learning is a model-free RL algorithm that learns the value of actions in states." },
    { text: "What is the main purpose of a confusion matrix?", options: ["Visualize misclassifications", "Reduce overfitting", "Speed up training", "Augment data"], correct: 0, category: "Evaluation", hint: "It shows where your classifier gets confused.", explanation: "A confusion matrix breaks down correct and incorrect predictions by class." },
    { text: "Which technique involves starting from a pre-trained model and training further on a specific task?", options: ["Transfer Learning", "Fine-tuning", "Zero-shot", "Few-shot"], correct: 1, category: "Deep Learning", hint: "It's like refining a general model for a specialized job.", explanation: "Fine-tuning adjusts pre-trained weights on a new dataset, usually with a lower learning rate." },
    { text: "What does 'LLM' stand for?", options: ["Large Language Model", "Low-Level Machine", "Linear Logic Module", "Latent Learning Model"], correct: 0, category: "LLM Basics", hint: "It's the model behind ChatGPT.", explanation: "Large Language Models (LLMs) are neural networks with billions of parameters trained on text." },
    { text: "Which library is best known for deep learning with dynamic computation graphs?", options: ["TensorFlow", "PyTorch", "Keras", "JAX"], correct: 1, category: "Frameworks", hint: "It's popular in research due to Pythonic debugging.", explanation: "PyTorch uses define-by-run graphs, making it intuitive for research." },
    { text: "The process of converting text into numerical vectors is called ___ .", options: ["Tokenization", "Embedding", "Vectorization", "Normalization"], correct: 1, category: "NLP", hint: "Words become dense vectors in a continuous space.", explanation: "Word embeddings like Word2Vec or GloVe map words to fixed-length vectors." },
    { text: "A metric used for imbalanced classification that averages precision and recall.", options: ["F1 Score", "AUC-ROC", "Log Loss", "R2 Score"], correct: 0, category: "Metrics", hint: "It's the harmonic mean of precision and recall.", explanation: "F1 score is useful when false positives and false negatives have different costs." },
    { text: "Which algorithm is used for clustering without labels?", options: ["K-Means", "SVM", "Linear Regression", "XGBoost"], correct: 0, category: "Unsupervised", hint: "It partitions data into K groups based on centroids.", explanation: "K-Means is an iterative centroid-based clustering algorithm." },
    { text: "A type of neural network well-suited for sequential data like time series.", options: ["CNN", "RNN", "MLP", "Autoencoder"], correct: 1, category: "Deep Learning", hint: "It has recurrent connections that loop back.", explanation: "Recurrent Neural Networks (RNNs) maintain a hidden state across time steps." },
    { text: "What does 'GPU' stand for in AI hardware?", options: ["General Processing Unit", "Graphics Processing Unit", "Gradient Parallel Unit", "Generative Program Unit"], correct: 1, category: "Hardware", hint: "Originally made for rendering graphics, now accelerates matrix math.", explanation: "GPUs massively parallelize tensor operations, speeding up deep learning." },
    { text: "The practice of automatically adjusting a model's hyperparameters to improve performance.", options: ["Hyperparameter Tuning", "Gradient Descent", "Backpropagation", "Ensemble Learning"], correct: 0, category: "Optimization", hint: "Searching for the best settings like learning rate.", explanation: "Techniques include grid search, random search, and Bayesian optimization." }
  ];

  // Difficulty settings
  const difficultySettings = {
    easy:   { timeSec: 45, pointsCorrect: 10, speedBonus: 0.2, lives: 5 },
    medium: { timeSec: 30, pointsCorrect: 20, speedBonus: 0.5, lives: 3 },
    hard:   { timeSec: 20, pointsCorrect: 30, speedBonus: 1.0, lives: 2 }
  };

  let currentDifficulty = 'medium';
  let currentQuestionIndex = 0;
  let score = 0;
  let lives = 3;
  let streak = 0;
  let bestStreak = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let timeLeft = 30;
  let timerInterval = null;
  let answerLocked = false;
  let gameActive = false;
  let selectedQuestions = [];
  let missedQuestions = [];

  // DOM elements
  const screens = {
    start: document.getElementById('screen-start'),
    game: document.getElementById('screen-game'),
    feedback: document.getElementById('screen-feedback'),
    gameover: document.getElementById('screen-gameover')
  };

  function updateHUD() {
    document.getElementById('hud-score').innerText = score;
    document.getElementById('hud-qnum').innerText = currentQuestionIndex + 1;
    document.getElementById('hud-streak').innerHTML = `${streak}🔥`;
    let hearts = '';
    for (let i=0; i<lives; i++) hearts += '❤️ ';
    document.getElementById('hud-lives').innerHTML = hearts.trim() || '💀';
    const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
    document.getElementById('q-progress').style.width = `${progress}%`;
  }

  let timerDuration = 30000;
  let timerRemaining = 30000;
  let lastTick = null;
  let timerAnimId = null;

  function stopTimer() {
    if (timerAnimId) {
      cancelAnimationFrame(timerAnimId);
      timerAnimId = null;
    }
  }

  function startTimer() {
    stopTimer();
    const settings = difficultySettings[currentDifficulty];
    timerDuration = settings.timeSec * 1000;
    timerRemaining = timerDuration;
    const timerStart = performance.now();
    lastTick = timerStart;
    
    const timerNum = document.getElementById('timer-num');
    const timerRing = document.getElementById('timer-ring');
    const circumference = 2 * Math.PI * 26;
    timerRing.style.strokeDasharray = circumference;
    timerRing.style.strokeDashoffset = 0;
    timerNum.innerText = settings.timeSec;
    timerNum.classList.remove('warn', 'danger');
    timerRing.classList.remove('warn', 'danger');

    function tick(now) {
      if (!gameActive || answerLocked) return;
      const delta = now - lastTick;
      lastTick = now;
      timerRemaining -= delta;
      
      if (timerRemaining <= 0) {
        timerRemaining = 0;
        timerNum.innerText = 0;
        timerRing.style.strokeDashoffset = circumference;
        handleTimeout();
      } else {
        const secs = Math.ceil(timerRemaining / 1000);
        timerNum.innerText = secs;
        timeLeft = secs;
        
        const offset = circumference * (1 - timerRemaining / timerDuration);
        timerRing.style.strokeDashoffset = offset;
        
        if (secs <= 5) {
          timerNum.classList.add('danger');
          timerRing.classList.add('danger');
        } else if (secs <= 10) {
          timerNum.classList.add('warn');
          timerRing.classList.add('warn');
        } else {
          timerNum.classList.remove('warn', 'danger');
          timerRing.classList.remove('warn', 'danger');
        }
        
        timerAnimId = requestAnimationFrame(tick);
      }
    }
    
    timerAnimId = requestAnimationFrame(tick);
  }

  // Handle visibility change to prevent burst timers on tab switch
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTimer();
    } else {
      if (gameActive && !answerLocked) {
        lastTick = performance.now();
        const timerNum = document.getElementById('timer-num');
        const timerRing = document.getElementById('timer-ring');
        const circumference = 2 * Math.PI * 26;
        
        function tick(now) {
          if (!gameActive || answerLocked) return;
          const delta = now - lastTick;
          lastTick = now;
          timerRemaining -= delta;
          
          if (timerRemaining <= 0) {
            timerRemaining = 0;
            timerNum.innerText = 0;
            timerRing.style.strokeDashoffset = circumference;
            handleTimeout();
          } else {
            const secs = Math.ceil(timerRemaining / 1000);
            timerNum.innerText = secs;
            timeLeft = secs;
            
            const offset = circumference * (1 - timerRemaining / timerDuration);
            timerRing.style.strokeDashoffset = offset;
            
            if (secs <= 5) {
              timerNum.classList.add('danger');
              timerRing.classList.add('danger');
            } else if (secs <= 10) {
              timerNum.classList.add('warn');
              timerRing.classList.add('warn');
            } else {
              timerNum.classList.remove('warn', 'danger');
              timerRing.classList.remove('warn', 'danger');
            }
            
            timerAnimId = requestAnimationFrame(tick);
          }
        }
        timerAnimId = requestAnimationFrame(tick);
      }
    }
  });

  function handleTimeout() {
    if (answerLocked) return;
    answerLocked = true;
    stopTimer();
    wrongAnswers++;
    lives--;
    streak = 0;
    updateHUD();
    const currentQ = selectedQuestions[currentQuestionIndex];
    missedQuestions.push({
      term: currentQ.options[currentQ.correct],
      correctAnswer: currentQ.options[currentQ.correct],
      explanation: currentQ.explanation,
      userAnswer: "Time's up"
    });
    showFeedback(false, currentQ, 0, 'timeout');
    if (lives <= 0) endGame();
  }

  function loadQuestion() {
    answerLocked = false;
    const q = selectedQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.text;
    document.getElementById('q-category').innerText = q.category;
    document.getElementById('q-diff-badge').innerText = currentDifficulty.toUpperCase();
    document.getElementById('q-hint').style.display = 'none';
    document.getElementById('q-hint-text').innerText = q.hint;
    // Clear previous hint flag
    window.hintUsedForCurrent = false;

    const container = document.getElementById('options-grid');
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${letters[idx]}</span>${opt}`;
      btn.dataset.idx = idx;
      btn.addEventListener('click', () => handleAnswer(idx));
      container.appendChild(btn);
    });
    updateHUD();
    startTimer();
  }

  function handleAnswer(selectedIdx) {
    if (answerLocked || !gameActive) return;
    answerLocked = true;
    stopTimer();
    const currentQ = selectedQuestions[currentQuestionIndex];
    const isCorrect = (selectedIdx === currentQ.correct);
    let pointsEarned = 0;
    const settings = difficultySettings[currentDifficulty];

    if (isCorrect) {
      pointsEarned = settings.pointsCorrect;
      const timeBonus = Math.floor((timeLeft / settings.timeSec) * settings.speedBonus * settings.pointsCorrect);
      pointsEarned += timeBonus;
      score += pointsEarned;
      correctAnswers++;
      streak++;
      if (streak > bestStreak) bestStreak = streak;
    } else {
      wrongAnswers++;
      lives--;
      streak = 0;
      missedQuestions.push({
        term: currentQ.options[currentQ.correct],
        correctAnswer: currentQ.options[currentQ.correct],
        explanation: currentQ.explanation,
        userAnswer: currentQ.options[selectedIdx]
      });
    }
    updateHUD();

    // Visual feedback
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQ.correct) btn.classList.add('correct');
      if (idx === selectedIdx && idx !== currentQ.correct) btn.classList.add('wrong');
    });
    showFeedback(isCorrect, currentQ, pointsEarned);
    if (lives <= 0) endGame();
  }

  function showScreen(screenName) {
    Object.keys(screens).forEach(key => {
      if (key === screenName) {
        screens[key].removeAttribute('hidden');
      } else {
        screens[key].setAttribute('hidden', '');
      }
    });
  }

  function showFeedback(isCorrect, question, points, reason = '') {
    showScreen('feedback');
    const iconEl = document.getElementById('fb-icon');
    const resultText = document.getElementById('fb-result-text');
    const termDiv = document.getElementById('fb-term');
    const explDiv = document.getElementById('fb-explanation');
    const pointsDiv = document.getElementById('fb-points');

    if (reason === 'timeout') {
      iconEl.innerHTML = '⏰';
      resultText.innerHTML = "Time's Up!";
      resultText.className = 'fb-result-text timeout';
      termDiv.innerText = `Answer: ${question.options[question.correct]}`;
      explDiv.innerText = question.explanation;
      pointsDiv.innerHTML = `No points · You lost a life ❤️`;
    } else if (isCorrect) {
      iconEl.innerHTML = '✓';
      resultText.innerHTML = 'Correct!';
      resultText.className = 'fb-result-text correct';
      termDiv.innerText = question.options[question.correct];
      explDiv.innerText = question.explanation;
      pointsDiv.innerHTML = `<span>+${points}</span> points (including speed bonus)`;
    } else {
      iconEl.innerHTML = '✗';
      resultText.innerHTML = 'Wrong!';
      resultText.className = 'fb-result-text wrong';
      termDiv.innerText = `Correct: ${question.options[question.correct]}`;
      explDiv.innerText = question.explanation;
      pointsDiv.innerHTML = `You lost a life ❤️`;
    }
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= selectedQuestions.length || lives <= 0) {
      if (lives <= 0) endGame();
      else completeQuiz();
    } else {
      showScreen('game');
      loadQuestion();
    }
  }

  function completeQuiz() {
    gameActive = false;
    stopTimer();
    showGameOverScreen(true);
  }

  function endGame() {
    gameActive = false;
    stopTimer();
    showGameOverScreen(false);
  }

  function showGameOverScreen(completed) {
    showScreen('gameover');
    document.getElementById('sd-final-score').innerText = score;
    document.getElementById('sd-correct').innerText = correctAnswers;
    document.getElementById('sd-wrong').innerText = wrongAnswers;
    const totalAttempts = correctAnswers + wrongAnswers;
    const accuracy = totalAttempts === 0 ? 0 : Math.round((correctAnswers / totalAttempts) * 100);
    document.getElementById('sd-accuracy').innerText = `${accuracy}%`;
    document.getElementById('sd-best-streak').innerText = bestStreak;

    let rankIcon, rankTitle, rankSub;
    if (score >= 350) {
      rankIcon = '🏆'; rankTitle = 'AI Master'; rankSub = 'You know your stuff!';
    } else if (score >= 200) {
      rankIcon = '🥈'; rankTitle = 'ML Practitioner'; rankSub = 'Solid understanding!';
    } else if (score >= 100) {
      rankIcon = '🥉'; rankTitle = 'AI Beginner'; rankSub = 'Keep learning!';
    } else {
      rankIcon = '📘'; rankTitle = 'Novice'; rankSub = 'Review the basics and try again.';
    }
    document.getElementById('rb-icon').innerText = rankIcon;
    document.getElementById('rb-title').innerText = rankTitle;
    document.getElementById('rb-sub').innerText = rankSub;

    const missedDiv = document.getElementById('missed-section');
    const missedList = document.getElementById('missed-list');
    if (missedQuestions.length > 0) {
      missedDiv.style.display = 'block';
      missedList.innerHTML = '';
      missedQuestions.forEach(m => {
        const item = document.createElement('div');
        item.className = 'missed-item';
        item.innerHTML = `<div class="mi-term">${m.term}</div><div class="mi-def">${m.explanation.substring(0, 100)}${m.explanation.length > 100 ? '…' : ''}</div>`;
        missedList.appendChild(item);
      });
    } else {
      missedDiv.style.display = 'none';
    }
  }

  function startGame(difficulty) {
    currentDifficulty = difficulty;
    const settings = difficultySettings[difficulty];
    lives = settings.lives;
    score = 0;
    streak = 0;
    bestStreak = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestionIndex = 0;
    missedQuestions = [];
    answerLocked = false;
    gameActive = true;
    selectedQuestions = [...questionBank];
    // Shuffle
    for (let i = selectedQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]];
    }
    showScreen('game');
    loadQuestion();
  }

  // Event listeners
  document.getElementById('btn-start').addEventListener('click', () => startGame(currentDifficulty));
  document.querySelectorAll('.ds-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ds-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDifficulty = btn.dataset.diff;
    });
  });
  document.getElementById('btn-next').addEventListener('click', nextQuestion);
  document.getElementById('btn-restart').addEventListener('click', () => {
    showScreen('start');
    gameActive = false;
    stopTimer();
  });
  document.getElementById('btn-play-again')?.addEventListener('click', () => {
    showScreen('start');
  });

  // Hint toggle
  document.getElementById('btn-hint-toggle').addEventListener('click', () => {
    if (answerLocked || !gameActive) return;
    const hintDiv = document.getElementById('q-hint');
    if (hintDiv.style.display === 'flex') return;
    hintDiv.style.display = 'flex';
    score = Math.max(0, score - 5);
    updateHUD();
    showToast('💡 Hint revealed: -5 points', 'info');
  });

  // Skip button
  document.getElementById('btn-skip').addEventListener('click', () => {
    if (answerLocked || !gameActive) return;
    answerLocked = true;
    stopTimer();
    score = Math.max(0, score - 10);
    wrongAnswers++;
    streak = 0;
    updateHUD();
    const currentQ = selectedQuestions[currentQuestionIndex];
    missedQuestions.push({
      term: currentQ.options[currentQ.correct],
      correctAnswer: currentQ.options[currentQ.correct],
      explanation: currentQ.explanation,
      userAnswer: 'Skipped'
    });
    showFeedback(false, currentQ, 0);
    if (lives <= 0) endGame();
  });

  // Share button
  document.getElementById('btn-share').addEventListener('click', () => {
    const text = `I scored ${score} points in the Guess the AI Term quiz! Can you beat me? 🧠`;
    if (navigator.share) {
      navigator.share({ title: 'AI Quiz Score', text });
    } else {
      navigator.clipboard.writeText(text);
      showToast('Score copied to clipboard!', 'success');
    }
  });
});
