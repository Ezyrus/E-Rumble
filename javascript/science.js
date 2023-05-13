var words = document.getElementById("word");
var moreInfo = document.getElementById("moreInfo");
var hint = document.getElementById("hint");
var inputField = document.getElementById("userAnswer");
const submitAnswer = document.getElementById("submitAnswer");
const rumble_btn = document.getElementById("rumbleWord");
const next_btn = document.getElementById("nextWord");
const words_list = [
  "BIOCHEMISTRY",
  "ASTRONOMY",
  "MATHEMATICS",
  "BIOLOGY",
  "PALEONTOLOGY",
  "ZOOLOGY",
  "ANTHROPOLOGY",
  "BOTANY",
  "ATOM",
  "PHOTOSYNTHESIS",
];
const correct_words_list = [
  "BIOCHEMISTRY",
  "ASTRONOMY",
  "MATHEMATICS",
  "BIOLOGY",
  "PALEONTOLOGY",
  "ZOOLOGY",
  "ANTHROPOLOGY",
  "BOTANY",
  "ATOM",
  "PHOTOSYNTHESIS",
];
const hint_word_list = [
  "HINT: Explores chemical processes related to living organisms.",
  "HINT: Study of everything in the universe",
  "HINT: The science and study of quality, structure, space, and change. ",
  "HINT: Natural science discipline that studies living things.",
  "HINT: Concerned with fossil animals and plants.",
  "HINT: Biology that studies the animal kingdom",
  "HINT: The study of what makes us human",
  "HINT: The study of plants",
  "HINT: The smallest unit of matter that retains the properties of an element",
  "HINT: The process by which plants convert light energy into chemical energy"
]
const more_info = [
  "Biochemistry combines biology and chemistry to study living matter. It powers scientific and medical discovery in fields such as pharmaceuticals, forensics and nutrition. With biochemistry, you will study chemical reactions at a molecular level to better understand the world and develop new ways to harness these.",
  "The Ancient Greeks used the word astron for STAR, so it only makes sense that astronomy would involve the study or the stars (and other unearthly topics). Someone who studies or works in astronomy is an astronomer, and one of the main tools of the trade is the telescope. As telescopes get more and more powerful, astronomers learn more and more about what's going on out there, such as how old a star or planet is. If you ever wondered what's out there besides the Earth, you should learn more about astronomy.",
  "Mathematics is an area of knowledge that includes the topics of numbers, formulas and related structures, shapes and the spaces in which they are contained, and quantities and their changes. Mathematics is essential in the natural sciences, engineering, medicine, finance, computer science and the social sciences. Although mathematics is extensively used for modeling phenomena, the fundamental truths of mathematics are independent from any scientific experimentation.",
  "Biology is a branch of science that deals with living organisms and their vital processes. Biology encompasses diverse fields, including botany, conservation, ecology, evolution, genetics, marine biology, medicine, microbiology, molecular biology, physiology, and zoology.",
  "Paleontology is the study of the history of life on Earth as based on fossils. Fossils are the remains of plants, animals, fungi, bacteria, and single-celled living things that have been replaced by rock material or impressions of organisms preserved in rock.",
  "Zoology is a branch of biology that studies the members of the animal kingdom and animal life in general. It includes both the inquiry into individual animals and their constituent parts, even to the molecular level, and the inquiry into animal populations, entire faunas, and the relationships of animals to each other, to plants, and to the nonliving environment. Though this wide range of studies results in some isolation of specialties within zoology, the conceptual integration in the contemporary study of living things that has occurred in recent years emphasizes the structural and functional unity of life rather than its diversity.",
  "Anthropology is the study of people, past and present, with a focus on understanding the human condition both culturally and biologically. This joint emphasis sets anthropology apart from other humanities and natural sciences.",
  "Botany is a branch of biology that deals with the study of plants, including their structure, properties, and biochemical processes. Also included are plant classification and the study of plant diseases and of interactions with the environment.",
  "Atoms are the building blocks of all matter, and the properties of different materials are determined by the types and arrangements of atoms that they contain. Atoms can combine with each other to form molecules, which are groups of two or more atoms that are chemically bonded together.",
  "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy from the sun into chemical energy in the form of organic compounds like glucose. This process is critical to the survival of many living organisms, as it produces the oxygen we breathe and is the foundation of the food chain."
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