let submitBtn = document.getElementById("submitBtn");
let wordDefMainEl = document.getElementById("wordDefinition");
let fetchedWordEl = document.getElementById("fetchedWord");
let noWordEl;

function getWordDefinition() {
  let wordInput = document.getElementById("wordInput");
  if (!wordDefMainEl.hidden) {
    wordDefMainEl.hidden = true;
    if (!fetchedWordEl.hidden) {
      fetchedWordEl.hidden = true;
    }
  }
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`)
    .then((response) =>
      response.json().then((data) => ({ ok: response.ok, data })),
    )
    .then(({ ok, data }) => {
      if (!ok) {
        noWordEl = document.createElement("h4");
        noWordEl.textContent = data.message;
        wordDefMainEl.appendChild(noWordEl);
      } else {
        if (noWordEl) {
          wordDefMainEl.removeChild(noWordEl);
        }
        console.log(data.word);
        let wordDefEL = document.createElement("p");
        wordDefEL.textContent = data[0].word;
        fetchedWordEl.appendChild(wordDefEL);
        fetchedWordEl.hidden = false;
      }

      wordDefMainEl.hidden = false;
      console.log(wordDefMainEl);
    });
}

submitBtn.addEventListener("click", getWordDefinition);
