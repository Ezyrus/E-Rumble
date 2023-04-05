var words = document.getElementById("word");
var moreInfo = document.getElementById("moreInfo");
var hint = document.getElementById("hint");
const submitAnswer = document.getElementById("submitAnswer");
const rumble_btn = document.getElementById("rumbleWord");
const next_btn = document.getElementById("nextWord");
const words_list = [
    "INTERNET",
    "BIOMETRICS",
    "GAMIFICATION",
    "SOFTWARE",
    "ROBOTICS",
    "TELEVISION",
    "BLOCKCHAIN",
    "CRYPTOCURRENCY",
    "GEOLOCATION",
    "NANOTECHNOLOGY",
];
const correct_words_list = [
    "INTERNET",
    "BIOMETRICS",
    "GAMIFICATION",
    "SOFTWARE",
    "ROBOTICS",
    "TELEVISION",
    "BLOCKCHAIN",
    "CRYPTOCURRENCY",
    "GEOLOCATION",
    "NANOTECHNOLOGY",
];
const hint_word_list = [
    "Quickly find information, communicate with people around the world.",
    "The use of physical or behavioral characteristics, such as fingerprints or voice recognition, to identify individuals.",
    "The use of game design elements, such as points, badges, and leaderboards, to make non-game activities more engaging and enjoyable.",
    "It is the opposite of hardware.",
    "Use of machines to perform tasks done traditionally by human beings.",
    "Used to broadcast programs for entertainment, information, and education. ",
    "Uses cryptographic hashes to secure transactions and protect data.",
    "Digital or virtual currency that uses cryptography for security and operates independently of a central bank.",
    "The process of identifying the physical location of a device or user based on their IP address, GPS coordinates, or other factors.",
    "The manipulation of matter on an atomic, molecular, or supramolecular scale for the development of new materials, devices, and structures."
]
const more_info = [
    "Internet is a global network of interconnected computers and servers that communicate with each other using standardized protocols. It provides a platform for users to share information, communicate, and collaborate on a global scale. The internet has become an essential tool for individuals, businesses, and governments, providing access to information, services, and resources.",
    "Biometrics is the technology that uses unique biological characteristics of an individual to authenticate their identity. These biological characteristics can include fingerprints, facial features, iris patterns, voice patterns, and even behavioral characteristics such as typing rhythm. Biometrics is used as a method of authentication in a variety of applications, including access control, financial transactions, and identification.",
    "Gamification is the use of game design principles and techniques in non-game contexts to motivate and engage people in activities and processes that might otherwise be considered mundane or boring. This approach aims to make tasks more enjoyable and rewarding by incorporating elements such as competition, achievement, and feedback into the experience.",
    "Software is a set of instructions, data or programs used to operate computers and execute specific tasks. Software is a generic term used to refer to applications, scripts and programs that run on a device.",
    "Robotics are widely used in such industries as automobile manufacture to perform simple repetitive tasks, and in industries where work must be performed in environments hazardous to humans.",
    "Television, often abbreviated as TV, is a communication medium used to transmit moving images and sound to a wide audience. It is a device that receives broadcast signals and displays them on a screen, usually with the ability to adjust the volume and channel selection.",
    "Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. An asset can be tangible (a house, car, cash, land) or intangible (intellectual property, patents, copyrights, branding). Virtually anything of value can be tracked and traded on a blockchain network, reducing risk and cutting costs for all involved.",
    "Cryptocurrency is a form of digital or virtual currency that uses cryptography to secure and verify transactions and to control the creation of new units. Unlike traditional currencies, which are issued by a central authority like a government or a bank, cryptocurrencies are decentralized, meaning that they operate independently of any central authority.",
    "The most common method of geolocation is using GPS technology, which uses satellites to determine the precise location of a device. Other methods include using Wi-Fi triangulation, which estimates the location of a device based on the strength and direction of nearby Wi-Fi signals, and cellular network triangulation, which uses the signals from nearby cell towers to determine the location of a device.",
    "Nanotechnology is the study, design, creation, manipulation, and application of materials and devices at the nanometer scale (typically, one billionth of a meter). This field is concerned with the development of new materials, devices, and systems that have unique and desirable properties that cannot be achieved with conventional materials and technologies.",
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
