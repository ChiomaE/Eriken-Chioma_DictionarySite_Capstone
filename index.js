let submitBtn = document.getElementById("submitBtn");

function getWordDefinition() {
  let wordInput = document.getElementById("wordInput");
  console.log("word:", wordInput);
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`)
    .then((response) => {
      return response.json();
    })
    .then((word) => {
      console.log(word);
    });
}

submitBtn.addEventListener("click", getWordDefinition);
