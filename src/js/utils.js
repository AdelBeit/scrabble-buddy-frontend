const LOG_FILE_NAMES = false;
const DEBUG_MODE = false;
const DICT_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/<word>";

function fileLoadedCheck() {
  if (LOG_FILE_NAMES)
    console.log("loaded", document.currentScript.src.split("/").pop());
}

function log(...args) {
  if (DEBUG_MODE) console.log(args);
}

function toggleButtonUIHandler(button) {
  button.toggleAttribute("active");
}

function updateMode(newMode) {
  [...document.querySelectorAll(`.${mode}-mode`)].map((node) =>
    node.classList.toggle("hidden")
  );
  toggleButtonUIHandler(document.querySelector(`button.${mode}`));
  mode = newMode;
  [...document.querySelectorAll(`.${mode}-mode`)].map((node) =>
    node.classList.toggle("hidden")
  );
  toggleButtonUIHandler(document.querySelector(`button.${mode}`));
}

function submit() {
  let textarea = document.querySelector(`.${mode}-mode textarea`);
  let rawText = textarea.value;
  processRawText(rawText);
  cards = [
    {
      word: "table",
      type: "verb",
      definition: "something wooden",
      isValid: true,
    },
    { word: "honk", type: "n/a", definition: "n/a", isValid: false },
    {
      word: "grasshopper",
      type: "nooun",
      definition: "something hoppy and grassy",
      isValid: true,
    },
    {
      word: "kekkkkeekk",
      type: "n/a",
      definition: "n/a",
      isValid: false,
    },
  ];
  cards = [
    { word: "cat" },
    { word: "tact" },
    { word: "stuck" },
    { word: "struck" },
    { word: "track" },
  ];

  createCards(cards);
}

function processRawText(text) {
  if (mode === "validate") {
    text = text.replaceAll(" ", ",").split(",");
    text.map((word) => {
      let definition = "";
      let type = "";
      try {
        definition = getDefinition(word);
      } catch (e) {
        console.log("there was an error fetching the definition");
        definition = "there was an error fetching the definition";
      }
      let validWord = false;
      try {
        validWord = isValid(word);
      } catch (e) {
        console.log(e);
      }
      if (!validWord) {
        definition = "n/a";
        type = "n/a";
      }
      cards.push({ definition, word, type, validWord });
    });
  }
  if (mode === "search") {
    text = text.replaceAll(" ", "");
    let possbileWords = [];
    try {
      possbileWords = getPossibleWords(text);
    } catch (e) {
      console.log(e);
    }
    // possbileWords.forEach((word) => cards.push({ word }));
  }
}

function createCards(cards) {
  let container = document.querySelector(`div.${mode}-container.template`);
  let cardTemplate = container.querySelector("div.word-card.template");
  cardTemplate.classList.remove("template");
  cards.forEach((card) => {
    let newCard = cardTemplate.cloneNode(true);
    if (mode === "search") {
      newCard.textContent = card.word;
    }
    if (mode === "validate") {
      let validCard = card.isValid ? "valid" : "invalid";
      newCard.setAttribute(validCard, "");
      newCard.querySelector(".word").textContent = card.word;
      newCard.querySelector(".type").textContent = card.type;
      newCard.querySelector(".definition").textContent = card.definition;
      console.log(newCard);
    }
    container.appendChild(newCard);
  });
  container.removeChild(cardTemplate);
}

async function getDefinition(word) {
  let res = await fetch(DICT_API_URL.replace("<word>", word));
  let data = await res.json();
  return data.definition;
}

async function isValid(word) {
  let res = await fetch(`https://scrabble.adelbeit.com/check/${word}`);
  let data = await res.json();
  return data["msg"] === "Valid word!";
}

async function getPossibleWords(word) {
  let res = await fetch(`https://scrabble.adelbeit.com/includes/${word}`);
  let data = await res.json();
  console.log(data);
  return data;
}

fileLoadedCheck();
