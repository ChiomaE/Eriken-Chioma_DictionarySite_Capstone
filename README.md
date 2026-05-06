# Eriken-Chioma_DictionarySite_Capstone

## Overview

This application uses the Free Dictionary API to retrieve word definitions, phonetics, and related metadata based on user input.

### Requirements to run the application:

- A modern web browser (Chrome, Edge, Firefox)
- Internet connection (required for API requests)

### Steps to run the application:

1. Clone repository

```
   git clone <your-repo-url>
```

2. Navigate to the project folder

```
   cd dictionary-app
```

3. Open file 'index.html' in your browser

## Tools Used

Languages-
-HTML
-CSS
-Javascript

API: [Free Dictionary Api](https://dictionaryapi.dev/)
Design Reference: [Frontend Mentor](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL)
Star Icons - [Free Star Icons](https://www.flaticon.com/free-icons/star)

## API Information

URL Syntax: https://api.dictionaryapi.dev/api/v2/entries/en/<word>

The application stores the user's input in the string variable wordInput. The value of wordInput is sent into the API, as shown below:

https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}

If the word exists, the API will return a word object inside of an array, as shown below:

```json
[
  {
    "word": "hello",
    "phonetic": "həˈləʊ",
    "phonetics": [
      {
        "text": "həˈləʊ",
        "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
      },
      {
        "text": "hɛˈləʊ"
      }
    ],
    "origin": "early 19th century: variant of earlier hollo ; related to holla.",
    "meanings": [
      {
        "partOfSpeech": "exclamation",
        "definitions": [
          {
            "definition": "used as a greeting or to begin a phone conversation.",
            "example": "hello there, Katie!",
            "synonyms": [],
            "antonyms": []
          }
        ]
      },
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "an utterance of ‘hello’; a greeting.",
            "example": "she was getting polite nods and hellos from people",
            "synonyms": [],
            "antonyms": []
          }
        ]
      },
      {
        "partOfSpeech": "verb",
        "definitions": [
          {
            "definition": "say or shout ‘hello’.",
            "example": "I pressed the phone button and helloed",
            "synonyms": [],
            "antonyms": []
          }
        ]
      }
    ]
  }
]
```

> [!NOTE]
> Word objects can have multiple objects in the meanings array. The application will show every meaning in the array.

If the word does not exist, the error message below will be shown:

Sorry pal, we couldn't find definitions for the word you were looking for.

## Features

### Home Page:

1. Locate the search bar and submit button at the top of the screen
2. Type a word into the search bar, then press Submit. Pressing the "Enter" key on the keyboard will not submit the word.
3. The word and all definitions will appear under the search bar.
   -If the word does not exist, the error message will appear. This error message is sent from the API.

### Favorites Page:

Shows all favorited words with their details. **Current Limitiation**: User cannot yet add or delete favorited words.

### Word of the Day Page:

Shows a word and all of its definitions. The server sends a new word every 24 hours.

### About Page

Shows the following information about this project:

- Project Overview
- Languages Used
- Tools Used
- What I Learned
- Future Improvements

## Design and Accessibility Considerations

- Semantic HTML used for better screen reader support
- Clear typography and spacing for readability

## Key Implementation Takeaways

- Integrated a third-party REST API using asynchronous JavaScript
- Parsed nested JSON response data
- Rendered dynamic UI content without frontend frameworks
- Implemented error handling for failed or invalid API requests

## Future Improvements

- Implement a framework (React, Angular) that would allow me to make the page more dynamic.

- Implement the audio files that the API provides.

- Implement the Favorites feature, which would allow users to save words to their account for future reference. Would also implement delete features to remove favorited words.
