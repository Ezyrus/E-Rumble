var words = document.getElementById("word");
var moreInfo = document.getElementById("moreInfo");
var hint = document.getElementById("hint");
var inputField = document.getElementById("userAnswer");
const submitAnswer = document.getElementById("submitAnswer");
const rumble_btn = document.getElementById("rumbleWord");
const next_btn = document.getElementById("nextWord");
const words_list = [
  "PREHISTORIC",
  "CLASSICAL",
  "MIDDLE",
  "EARLY",
  "MODERN",
  "VALOR",
  "INDEPENDENCE",
  "RIZAL",
  "BONIFACIO",
  "CHRISTMAS"
];
const correct_words_list = [
  "PREHISTORIC",
  "CLASSICAL",
  "MIDDLE",
  "EARLY",
  "MODERN",
  "VALOR",
  "INDEPENDENCE",
  "RIZAL",
  "BONIFACIO",
  "CHRISTMAS"
];
const hint_word_list = [
  "HINT: Relating to or denoting the period before written records.",
  "HINT: Period of music as ranging from 1730 to 1820.",
  "HINT: Period lasted approximately from the late 5th to the late 15th centuries.",
  "HINT: Spans the period after the Late Middle Ages of the post-classical era.",
  "HINT: Wide span of time marked in part by technological innovations.",
  "HINT: Happens in April 9, 1942",
  "HINT: Happens in June 12",
  "HINT: Happens in December 30",
  "HINT: Happens in November 30",
  "HINT: Happens in December 25",
]
const more_info = [
  "Prehistory, the vast period of time before written records or human documentation, includes the Neolithic Revolution, Neanderthals and Denisovans, Stonehenge, the Ice Age and more.",
  "The Classical period was known as the Age of Enlightenment, or the Age of Reason. The era spanned about seventy years (1750-1820), but in its short duration, musical practices began that have influenced music ever since.",
  "Middle Ages to describe Europe between the fall of Rome in 476 CE and the beginning of the Renaissance in the 14th century.",
  "The period that witnessed the rise of the modern state, the discovery of the Americas, the emergence of the printing press, the humanist turn to history, the scientific revolution, the project of the enlightenment, but also religious dissent.",
  "The Modern Age, or modernity, is the postmedieval era, a wide span of time marked in part by technological innovations, urbanization, scientific discoveries, and globalization.",
  "The Day of Valor, officially known as Araw ng Kagitingan, is a national observance in the Philippines which commemorates the fall of Bataan to Japanese troops during World War II.",
  "Philippine Independence Day is annually celebrated on June 12. In the year 1898, the Philippines declared independence from Spain and became a free country.",
  "Rizal Day is a Philippine national holiday celebrated on December 30 to commemorate the life and works of José Rizal, a national hero of the Philippines. ",
  "He was the founder and eventual Supremo of the Katipunan, a secret society that triggered the Philippine Revolution of 1896 against the Spanish Empire. It is celebrated every November 30, the birth anniversary of Bonifacio.",
  "Christmas is an annual festival commemorating the birth of Jesus Christ, observed primarily on December 25 as a religious and cultural celebration among billions of people around the world."
];

var totalScore = 0;
var words_count = words_list.length;
var random_words_key;
var word_no = 1
var right_answers = [];

function randomWords() {
  return Math.floor(Math.random() * words_list.length);
}

random_words_key = randomWords(words_list);
var selected_words = scrambleWord(words_list[random_words_key]);
var right_words = correct_words_list[random_words_key];
var hint_words = hint_word_list[random_words_key];

submitAnswer.onclick = function () {
  var userAnswer = inputField.value.toUpperCase();
  var isLastWord = words_count === 1;
  word_no++;
  if (userAnswer === right_words) {
    totalScore++;
    right_answers.push({
      word: words_list[random_words_key],
      more_info: more_info[random_words_key]
    });
    Swal.fire({
      title: correct_words_list[random_words_key],
      text: more_info[random_words_key],
      icon: 'question',
      confirmButtonText: isLastWord ? 'Finish' : 'Continue',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false
    }).then(() => {

      words_list.splice(random_words_key, 1);
      correct_words_list.splice(random_words_key, 1);
      hint_word_list.splice(random_words_key, 1);
      more_info.splice(random_words_key, 1);
      words_count--;
      if (!isLastWord) {
        random_words_key = randomWords(words_list);
        selected_words = scrambleWord(words_list[random_words_key]);
        right_words = correct_words_list[random_words_key];
        hint_words = hint_word_list[random_words_key];

        words.innerHTML = word_no + ". " + selected_words;
        hint.innerHTML = hint_words;
      } else {
        displayFinalScore();
      }
    });
  } else {
    shake();
    if (!isLastWord) {

      words_list.splice(random_words_key, 1);
      correct_words_list.splice(random_words_key, 1);
      hint_word_list.splice(random_words_key, 1);
      more_info.splice(random_words_key, 1);
      words_count--;
      random_words_key = randomWords(words_list);
      selected_words = scrambleWord(words_list[random_words_key]);
      right_words = correct_words_list[random_words_key];
      hint_words = hint_word_list[random_words_key];

      words.innerHTML = word_no + ". " + selected_words;
      hint.innerHTML = hint_words;
      console.log("random_words_key: " + selected_words)
      console.log("selected_words: " + selected_words);
      console.log("Words: " + words_list);
      console.log("Words Count: " + words_count);
      console.log("Score:  " + totalScore);
    } else {
      displayFinalScore();
    }
  }
  inputField.value = "";
};

rumble_btn.onclick = function () {
  selected_words = scrambleWord(selected_words);
  if (selected_words == right_words) {
    selected_words = scrambleWord(selected_words);
  }
  words.innerHTML = word_no + ". " + selected_words;
};

next_btn.onclick = function () {
  random_words_key = randomWords(words_list);
  selected_words = scrambleWord(words_list[random_words_key]);
  right_words = correct_words_list[random_words_key];
  hint_words = hint_word_list[random_words_key];
  words.innerHTML = word_no + ". " + selected_words;
  hint.innerHTML = hint_words;
  moreInfo.innerHTML = "";
  next_btn.innerHTML = "Next";
  rumble_btn.style.display = "block";
  submitAnswer.style.display = "block";
  inputField.style.display = "block";
};

function displayFinalScore() {
  Swal.fire({
    title: `Game Over!`,
    html: 'Your final score is: ' + totalScore + '<br><br>' +
      right_answers.map(answer => '<b>' + answer.word + '</b> - ' + answer.more_info).join('<br><br>'),
    icon: 'info',
    showCancelButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonText: 'Play Again',
    cancelButtonText: 'Quit',
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      location.href = "index.html";
    }
  });
}

function scrambleWord(word) {
  if (word == null || word.trim() === '') {
    displayFinalScore();
    return null;
  }
  let charArray = word.split("");
  let newArray = [];
  while (charArray.length > 0) {
    let index = Math.floor(Math.random() * charArray.length);
    newArray.push(charArray[index]);
    charArray.splice(index, 1);
  }
  return newArray.join("");
}

function shake() {
  words.classList.add("shake");
  submitAnswer.classList.add("shake");
  document.getElementById("userAnswer").classList.add("shake");
  setTimeout(function () {
    words.classList.remove("shake");
    submitAnswer.classList.remove("shake");
    document.getElementById("userAnswer").classList.remove("shake");
  }, 500);
}