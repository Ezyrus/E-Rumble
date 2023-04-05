var words = document.getElementById("word");
var moreInfo = document.getElementById("moreInfo");
var hint = document.getElementById("hint");
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
    "Relating to or denoting the period before written records.",
    "Period of music as ranging from 1730 to 1820.",
    "Period lasted approximately from the late 5th to the late 15th centuries.",
    "Spans the period after the Late Middle Ages of the post-classical era.",
    "Wide span of time marked in part by technological innovations.",
    "Happens in April 9, 1942",
    "Happens in June 12",
    "Happens in December 30",
    "Happens in November 30",
    "Happens in December 25",
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

function randomWords() {
    return Math.floor(Math.random() * words_list.length);
}
var random_words_key = randomWords();

var selected_words = words_list[random_words_key];
selected_words = rumbledWords(selected_words);

submitAnswer.onclick = function () {
    var userAnswer = document.getElementById("userAnswer").value;
    var rightAnswer = correct_words_list[random_words_key];

    if (userAnswer.toUpperCase() == rightAnswer) {
        moreInfo.innerHTML = more_info[random_words_key];
    } else {
        shake();
    }
};

rumble_btn.onclick = function () {
    var right_words = words_list[random_words_key];
    selected_words = rumbledWords(selected_words);
    var hint_words = hint_word_list[random_words_key];

    rumble_btn.innerHTML = "Rumble Word";
    next_btn.style.display = "block";
    if (selected_words == right_words) {
        selected_words = rumbledWords(selected_words);
    }
    words.innerHTML = selected_words;
    hint.innerHTML = hint_words;
};

next_btn.onclick = function () {
    random_words_key = randomWords();
    var right_words = words_list[random_words_key];
    selected_words = rumbledWords(right_words);
    var hint_words = hint_word_list[random_words_key];
    moreInfo.innerHTML = "";
    if (selected_words == right_words) {
        selected_words = rumbledWords(selected_words);
    }
    words.innerHTML = selected_words;
    hint.innerHTML = hint_words;
};

function rumbledWords(words) {
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
