let correctAnswer = 0;

function speak(text) {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT';
  utterance.pitch = 1.3;
  utterance.rate = 0.95;
  speechSynthesis.speak(utterance);
  document.getElementById('speech').innerText = text;
}

function startSum() {
  const num1 = Math.floor(Math.random() * 5) + 1;
  const num2 = Math.floor(Math.random() * 5) + 1;
  correctAnswer = num1 + num2;

  const frase = `Quanto fa ${num1} più ${num2}?`;
  speak(frase);

  document.getElementById('sum-area').style.display = 'block';
  document.getElementById('question').innerText = `${num1} + ${num2} = ?`;
  document.getElementById('answer').value = '';
  document.getElementById('answer').focus();
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  if (userAnswer === correctAnswer) {
    speak('Bravo! Hai risposto correttamente!');
  } else {
    speak('Ops! Riprova ancora!');
  }
}
