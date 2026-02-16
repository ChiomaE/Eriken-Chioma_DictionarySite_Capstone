let submitBtn = document.getElementById("submitBtn");
let wordDefMainEl = document.getElementById("wordDefinition");
let fetchedWordEl = document.getElementById("fetchedWord");
let wordSpanEl = document.getElementById("wordSpanEl");
let wordPhonEl = document.getElementById("wordPhonEl");
let defListDiv = document.getElementById("definitionListDiv");
let noWordEl;
let wordDefEL;

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

        data.forEach((word) => {
          console.log("word", word.phonetics);
          wordDefEL = document.createElement("div");
          wordDefEL.classList.add("definiton-div");
          defListDiv.appendChild(wordDefEL);
          wordSpanEl.textContent = word.word;
          wordPhonEl.textContent = word.phonetics[2].text;

          word.meanings.forEach((meaning) => {
            console.log("meaning", meaning);
            let seperatorDiv = document.createElement("div");
            seperatorDiv.classList.add("def-seperator");
            let partOfSpeechEl = document.createElement("span");
            partOfSpeechEl.classList.add("part-of-speech", "fs-5");
            console.log(seperatorDiv, partOfSpeechEl);

            let lineEl = document.createElement("hr");
            lineEl.classList.add("w-100");
            partOfSpeechEl.textContent = meaning.partOfSpeech;
            seperatorDiv.appendChild(partOfSpeechEl);
            seperatorDiv.appendChild(lineEl);
            wordDefEL.appendChild(seperatorDiv);

            /* create and append meaning span */
            let meaningEl = document.createElement("span");
            meaningEl.classList.add("fs-6", "text-secondary");
            meaningEl.textContent = "Meaning";
            wordDefEL.appendChild(meaningEl);

            /* create and append definitons */

            let defUlList = document.createElement("ul");
            meaning.definitions.forEach((def) => {
              let defListItem = document.createElement("li");
              defListItem.textContent = def.definition;
              defUlList.appendChild(defListItem);
            });
            wordDefEL.appendChild(defUlList);

            /* if synonyms exist, create and append synonyms list*/

            if (meaning.synonyms.length > 0) {
              let synonymsDiv = document.createElement("div");
              synonymsDiv.classList.add("d-flex", "gap-3");

              let synonymSpanEl = document.createElement("span");
              synonymSpanEl.classList.add("fs-6", "text-secondary");
              synonymSpanEl.textContent = "Synonyms:";
              synonymsDiv.appendChild(synonymSpanEl);

              let synonymsListDiv = document.createElement("div");
              meaning.synonyms.forEach((synonym) => {
                let synonymItemEl = document.createElement("span");
                synonymItemEl.textContent = synonym;
                synonymsListDiv.appendChild(synonymItemEl);
              });

              synonymsDiv.appendChild(synonymsListDiv);
              wordDefEL.appendChild(synonymsDiv);
            }

            // append definition-div to parent
            fetchedWordEl.appendChild(wordDefEL);
          });
        });

        fetchedWordEl.hidden = false;
      }

      wordDefMainEl.hidden = false;
      console.log(wordDefMainEl);
    });
}

submitBtn.addEventListener("click", getWordDefinition);
