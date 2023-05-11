var words = document.getElementById("word");
var moreInfo = document.getElementById("moreInfo");
var hint = document.getElementById("hint");
const submitAnswer = document.getElementById("submitAnswer");
const rumble_btn = document.getElementById("rumbleWord");
const next_btn = document.getElementById("nextWord");
const words_list = [
  "RELIGION",
  "ISLAM",
  "CATHOLIC",
  "IGLESIA",
  "AGLIPAYAN",
  "BUDDHISM",
  "HINDUISM",
  "JUDAISM",
  "CONFUCIANISM",
  "TAOISM",
];
const correct_words_list = [
  "RELIGION",
  "ISLAM",
  "CATHOLIC",
  "IGLESIA",
  "AGLIPAYAN",
  "BUDDHISM",
  "HINDUISM",
  "JUDAISM",
  "CONFUCIANISM",
  "TAOISM",
];
const hint_word_list = [
  "HINT: Also known as the service and worship of God or the supernatural.",
  "HINT: It teaches that Allah’s word was revealed to the project Muhammad through the angel Gabriel. Their followers are called Muslims",
  "HINT: It belongs to a Christ Centered faith community that views Jesus Christ as the foundation.",
  "HINT: This religion does not celebrate Christmas, Easter, Halloween, Valentine’s Day or any holiday based on pagan beliefs.",
  "HINT: This church believes that original matter, ether, heat, light, electricity, magnetism, gravity and life or reason, are manifestation of the one supreme cause which is God who is life and is the great mover of the Universe.",
  "HINT: It is the religion that based on the teaching of Siddhartha Gautama.",
  "HINT: It is one of the world’s oldest religions and is the oldest religion that is still practiced today.",
  "HINT: They believe that there’s only one God who has established a covenant. Their God communicates to believer through prophets and rewards good deeds while also punishing evil. ",
  "HINT: There is no deity worshipped in this religion, though the worship of ancestors and of Confucius himself as a sage master and teacher are practiced.",
  "HINT: This religion philosophy is based on three pillars. Simplicity, Patience and Compassion.",
];
const more_info = [
  "Religion is a range of social cultural systems, including designated behaviours and practices, morals, beliefs, worldviews that generally relate humanity to spiritual element.",
  "Islam is the second largest religion in the world after Christianity, with about 1.8 billion Muslims worldwide, although its roots go back further scholars typically date the creation of Islam of the 7th century, making it the youngest of the major world religions.",
  "Catholic has more than 86% of the population and 6% belongs to various nationalized Christian cults, and another 2% belong to well over 100 protestant denominations. Catholic Church traces its history to Jesus Christ and the Apostles.",
  "Iglesia is an Unitarian and non - Trinitarian in theology, holding that Jesus Christ is God’s chosen son but is not himself God. It teaches the doctrine of the last Judgement and upholds a wordsict biblical prohibition on consuming blood of animals.",
  "Aglipayan Church is a popular schematic Catholic Church founded in 1902 by the priest Gregorio Aglipay and Sr. Isabelo de Los Reyes. The schism was a function of the native Filipino clergy’s resentment of Spanish Catholic orders during the late Spanish colonial period, and receive early supports from some Filipino nationalist as well as American protestant",
  "Buddhism is one of the world’s largest religion and originated 2,500 years ago in India, it believes that the human life is one of the suffering, and meditation, spiritual and physical labor, and good behaviour are the ways to achieve enlightenment, or Nirvana.",
  "Hinduism is an religion with various gods and goddesses. And according to Hinduism, three gods rule the world. Brahma; The creator, Vishnu; The preserver and Shiva; The dewordsoyer.",
  "Judaism is the worlds oldest monotheistic religion, dating back nearly 4,000 years. The followers of Judaism believe in one God who revealed himself through ancient prophets.",
  "Confucianism is an ancient Chinese belief system, which focuses on the importance of personal ethics and morality. Whether it is only or a philosophy or also a religion is debated. Confucianism is a philosophy and belief system form ancient China, which is laid the foundation for much of Chinese culture.",
  "Taoism is a religion that developed a bit after Confucianism, around two thousand years ago. Taoism is mainly concerned with the spiritual elements of life, including the nature of the universe.",
];


function randomWords() {
  return Math.floor(Math.random() * words_list.length);
}

var totalScore = 0;
var words_count = words_list.length;
var random_words_key = randomWords(words_list);

var selected_words = rumbledWords(words_list[random_words_key]);
var right_words = correct_words_list[random_words_key];
var hint_words = hint_word_list[random_words_key];

submitAnswer.onclick = function () {
  var userAnswer = document.getElementById("userAnswer").value.toUpperCase();
  if (userAnswer == right_words) {
    totalScore++;
    Swal.fire({
      title: correct_words_list[random_words_key],
      text: more_info[random_words_key],
      icon: 'question',
      confirmButtonText: 'Continue',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false
    })
    // moreInfo.innerHTML = more_info[random_words_key];
    // rumble_btn.style.display = "none";
    // submitAnswer.style.display = "none";
  } else {
    shake();
  }

  if (words_count === 0) {
    Swal.fire({
      title: `Your total score is ${totalScore}.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Play Again',
      cancelButtonText: 'Quit',
    }).then((result) => {
      if (result.isConfirmed) {
        // Reload the page to play again
        location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Redirect to index page if user quits
        location.href = "index.html";
      }
    });

  } else {
    words_list.splice(random_words_key, 1);
    correct_words_list.splice(random_words_key, 1);
    hint_word_list.splice(random_words_key, 1);
    more_info.splice(random_words_key, 1);
    words_count--;
    random_words_key = randomWords(words_list);
    selected_words = rumbledWords(words_list[random_words_key]);
    right_words = correct_words_list[random_words_key];
    hint_words = hint_word_list[random_words_key];
  }

  words.innerHTML = selected_words;
  hint.innerHTML = hint_words;
  console.log("Words: " + words_list);
  console.log("Words Count: " + words_count);
  console.log("Score:  " + totalScore);
};

rumble_btn.onclick = function () {
  selected_words = rumbledWords(selected_words);
  if (selected_words == right_words) {
    selected_words = rumbledWords(selected_words);
  }
  words.innerHTML = selected_words;
};

next_btn.onclick = function () {
  random_words_key = randomWords(words_list);
  selected_words = rumbledWords(words_list[random_words_key]);
  right_words = correct_words_list[random_words_key];
  hint_words = hint_word_list[random_words_key];
  words.innerHTML = selected_words;
  hint.innerHTML = hint_words;
  moreInfo.innerHTML = "";
  next_btn.innerHTML = "Next";
  rumble_btn.style.display = "block";
  submitAnswer.style.display = "block";
};

function rumbledWords(words) {
  if (!words) {
    Swal.fire({
      title: `Your total score is ${totalScore}.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Play Again',
      cancelButtonText: 'Quit',
    }).then((result) => {
      if (result.isConfirmed) {
        // Reload the page to play again
        location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Redirect to index page if user quits
        location.href = "index.html";
      }
    })
  }
  let charArray = words.split("");
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