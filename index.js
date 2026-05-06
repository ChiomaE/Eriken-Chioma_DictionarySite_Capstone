let submitBtn = document.getElementById("submitBtn");
let wordDefMainEl = document.getElementById("wordDefinition");
let fetchedWordEl = document.getElementById("fetchedWord");
let wordSpanEl = document.getElementById("wordSpanEl");
let wordPhonEl = document.getElementById("wordPhonEl");
let defListDiv = document.getElementById("definitionListDiv");
let noWordEl;
let wordDefEL;

function clearPreviousResult() {
  if (noWordEl) {
    noWordEl.remove();
    noWordEl = null;
  }

  defListDiv.innerHTML = "";
  wordSpanEl.textContent = "";
  wordPhonEl.textContent = "";
  fetchedWordEl.hidden = true;
  wordDefMainEl.hidden = true;
}

function getWordDefinition() {
  clearPreviousResult();

  let wordInput = document.getElementById("wordInput");
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`)
    .then((response) =>
      response.json().then((data) => ({ ok: response.ok, data })),
    )
    .then(({ ok, data }) => {
      if (!ok) {
        noWordEl = document.createElement("h4");
        noWordEl.textContent = data.message;
        wordDefMainEl.appendChild(noWordEl);
        wordDefMainEl.hidden = false;
        return;
      }

      data.forEach((word) => {
        wordDefEL = document.createElement("div");
        wordDefEL.classList.add("definiton-div");
        defListDiv.appendChild(wordDefEL);
        wordSpanEl.textContent = word.word;

        word.phonetics.forEach((phon) => {
          if (phon.text) {
            wordPhonEl.textContent = phon.text;
            return;
          }
        });

        word.meanings.forEach((meaning) => {
          let seperatorDiv = document.createElement("div");
          seperatorDiv.classList.add("def-seperator");
          let partOfSpeechEl = document.createElement("span");
          partOfSpeechEl.classList.add("part-of-speech", "fs-5");

          let lineEl = document.createElement("hr");
          lineEl.classList.add("w-50");
          partOfSpeechEl.textContent = meaning.partOfSpeech;
          seperatorDiv.appendChild(partOfSpeechEl);
          seperatorDiv.appendChild(lineEl);
          wordDefEL.appendChild(seperatorDiv);

          let meaningEl = document.createElement("span");
          meaningEl.classList.add("fs-6", "text-secondary");
          meaningEl.textContent = "Meaning";
          wordDefEL.appendChild(meaningEl);

          let defUlList = document.createElement("ul");
          meaning.definitions.forEach((def) => {
            let defListItem = document.createElement("li");
            defListItem.textContent = def.definition;
            defUlList.appendChild(defListItem);
          });
          wordDefEL.appendChild(defUlList);

          if (meaning.synonyms.length > 0) {
            let synonymsDiv = document.createElement("div");
            synonymsDiv.classList.add("d-flex", "gap-3");

            let synonymSpanEl = document.createElement("span");
            synonymSpanEl.classList.add("fs-6", "text-secondary");
            synonymSpanEl.textContent = "Synonyms:";
            synonymsDiv.appendChild(synonymSpanEl);

            let synonymsListDiv = document.createElement("div");
            synonymsListDiv.classList.add("w-75");
            meaning.synonyms.forEach((synonym) => {
              let synonymItemEl = document.createElement("span");
              synonymItemEl.textContent = `${synonym} ${meaning.synonyms.length > 1 ? "," : ""} `;
              synonymsListDiv.appendChild(synonymItemEl);
            });

            synonymsDiv.appendChild(synonymsListDiv);
            wordDefEL.appendChild(synonymsDiv);
          }
        });
      });

      fetchedWordEl.hidden = false;
      wordDefMainEl.hidden = false;
    });
}

submitBtn.addEventListener("click", getWordDefinition);
