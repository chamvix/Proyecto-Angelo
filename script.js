let currentAnswer = '';
let currentLevel = 1;
let currentIndex = 0;
let fixedAddend = 1;
let problems = [];

function speak(text) {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT';
  utterance.pitch = 1.3;
  utterance.rate = 0.95;
  speechSynthesis.speak(utterance);
  document.getElementById('speech').innerText = text;
}

function startLevel(level) {
  currentLevel = level;
  fixedAddend = level;
  currentIndex = 0;
  currentAnswer = '';
  problems = [];

  for (let i = 1; i <= 9; i++) {
    problems.push({ a: fixedAddend, b: i, result: fixedAddend + i });
  }

  document.getElementById('levels-container').style.display = 'none';
  document.getElementById('game-area').style.display = 'block';
  generateButtons();
  showQuestion();
}

function showQuestion() {
  if (currentIndex >= problems.length) {
    document.getElementById('question').innerText = '🎉 Hai completato il livello!';
    speak('Bravissimo! Hai completato il livello!');
    document.getElementById('number-grid').style.display = 'none';
    document.getElementById('feedback').innerHTML = '🎊 LIVELLO COMPLETATO!';
    document.getElementById('feedback').className = 'feedback correct';
    return;
  }

  const { a, b } = problems[currentIndex];
  currentAnswer = '';
  document.getElementById('feedback').innerText = '';
  document.getElementById('number-grid').style.display = 'flex';
  document.getElementById('question').innerText = `${a} + ${b} = ?`;
  speak(`Quanto fa ${a} più ${b}?`);
}

function generateButtons() {
  const grid = document.getElementById('number-grid');
  grid.innerHTML = '';

  for (let i = 0; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.onclick = () => handleNumberClick(i);
    grid.appendChild(btn);
  }

  const delBtn = document.createElement('button');
  delBtn.innerText = '⬅';
  delBtn.onclick = () => {
    currentAnswer = currentAnswer.slice(0, -1);
    updateAnswerDisplay();
  };
  grid.appendChild(delBtn);

  const okBtn = document.createElement('button');
  okBtn.innerText = '✅';
  okBtn.onclick = checkAnswer;
  grid.appendChild(okBtn);
}

function handleNumberClick(num) {
  if (currentAnswer.length < 2) {
    currentAnswer += num.toString();
    updateAnswerDisplay();
  }
}

function updateAnswerDisplay() {
  const { a, b } = problems[currentIndex];
  document.getElementById('question').innerText = `${a} + ${b} = ${currentAnswer}`;
}

function checkAnswer() {
  const { result } = problems[currentIndex];
  const user = parseInt(currentAnswer);

  if (!isNaN(user)) {
    if (user === result) {
      document.getElementById('feedback').innerText = '🎉 CORRETTO!';
      document.getElementById('feedback').className = 'feedback correct';
      speak('Bravo! Risposta corretta!');
      currentIndex++;
      setTimeout(showQuestion, 1200);
    } else {
      document.getElementById('feedback').innerText = '❌ SBAGLIATO!';
      document.getElementById('feedback').className = 'feedback incorrect';
      speak('Ops! Non è corretto. Riprova!');
      currentAnswer = '';
      setTimeout(() => {
        updateAnswerDisplay();
        document.getElementById('feedback').innerText = '';
      }, 1000);
    }
  }
}
