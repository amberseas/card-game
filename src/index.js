import {
  fairytaleCards,
  animalsCards,
  foodCards,
  activitiesCards,
  emotionsCards,
  clothesCards,
  carsCards,
  spaceCards, allCards
} from './category-cards';
import { main, fairytales, animals, food, activities, emotions, clothes, cars, space, mainPageCards } from './mainPage-cards';
import { randomArray, playSound } from './helper-functions';
import { createStatsTable, appendScores } from './statistics';
import sort from './sort';
import createRDFCards from './repeatDiffWords';

let activeSection;
let gameMode = false;
const mainPage = document.querySelector('.main-container');
// MENU
const navigationButton = document.querySelector('#navi-toggle');
const navigationCover = document.querySelector('.navigation__cover');
// TOGGLE BUTTON
const toggleButton = document.querySelector('#toggle');
const toggleCheck = document.querySelector('#toggle-input');
const toggleContainer = document.querySelector('#toggle-container');
const playButton = document.querySelector('#play');
const trainButton = document.querySelector('#train');
// GAME MODE
const play = document.querySelector('#game-mode');
let sequence = [];
let mistakes;
let num;
const scoreContainer = document.querySelector('.score__container');
const scorePage = document.querySelector('.score-page');
const correct = document.querySelector('#correct-audio');
const error = document.querySelector('#error-audio');
const success = document.querySelector('#success-audio');
const failure = document.querySelector('#failure-audio');
// STATISTICS
const statsButton = document.querySelector('#stats-button');
const statsPage = document.querySelector('.statistics');
const buttonResetScores = document.querySelector('#button-reset');
const repeatDiffWords = document.querySelector('#button-RDW');
const sortButtons = document.querySelectorAll('.material-symbols-outlined');
// DIFFICULT WORDS
const RDWContainer = document.querySelector('#RDW-container');
const RDWSection = document.querySelector('.repeat-difficult-words');

window.addEventListener('DOMContentLoaded', () => {
  main.link.classList.add('active');
  activeSection = main.section;
  gameMode = false;
});

let cards = [];

function selectCards() {
  switch (activeSection) {
    case fairytales.section:
      cards = fairytaleCards;
      break;
    case animals.section:
      cards = animalsCards;
      break;
    case food.section:
      cards = foodCards;
      break;
    case activities.section:
      cards = activitiesCards;
      break;
    case emotions.section:
      cards = emotionsCards;
      break;
    case clothes.section:
      cards = clothesCards;
      break;
    case cars.section:
      cards = carsCards;
      break;
    case space.section:
      cards = spaceCards;
      break;
    case RDWSection:
      cards = createRDFCards();
      break;
    default: cards = [];
  } return cards;
}

// close menu
navigationCover.addEventListener('click', () => {
  navigationButton.checked = false;
});

// Switch between GAME and TRAIN modes
function toggleModes() {
  playButton.classList.toggle('opacity-none');
  trainButton.classList.toggle('opacity-none');
  toggleContainer.classList.toggle('switch--play');

  if (playButton.classList.contains('opacity-none')) {
    toggleContainer.style.backgroundColor = '#90e0ef';
    gameMode = false;
    play.checked = false;
    scoreContainer.innerHTML = '';
    selectCards();

    cards.forEach((card) => {
      card.card.classList.remove('play-mode');
      card.card.classList.remove('inactive');
    });
  } else {
    toggleContainer.style.backgroundColor = '#ff99c8';
  }
}

toggleButton.addEventListener('click', () => {
  toggleModes();
});

// Game mode
// Start game
play.addEventListener('click', () => {
  if (activeSection !== main.section && play.checked) {
    selectCards();
    sequence = randomArray();
    gameMode = true;
    mistakes = 0;
    num = 0;
    playSound(num);
  }
});

// STARS
const pic = document.createElement('img');
const resultHeader = document.createElement('h3');
resultHeader.classList.add('tertiary-heading');
scorePage.appendChild(pic);
scorePage.appendChild(resultHeader);
const repeatButton = document.querySelector('.game-mode-button--repeat');

repeatButton.addEventListener('click', () => {
  playSound(num);
});

// CATEGORY CARDS EVENTS/TRAIN&GAME
function touch() {
  cards.forEach((card) => {
    toggleButton.addEventListener('click', () => {
      if (toggleContainer.classList.contains('switch--play')) {
        card.card.classList.add('play-mode');
      } else {
        card.card.classList.remove('play-mode');
      }
    });

    card.card.addEventListener('click', () => {
      if (!gameMode) {
        if (!card.card.classList.contains('rotate') && !card.card.classList.contains('play-mode')) {
          card.audio.play();
          card.trained += 1;
          sessionStorage.setItem(`${card.name}-trained`, card.trained);
        }
      } else if (gameMode) {
        const cardPressed = cards.indexOf(card);
        // if CORRECT
        if (cardPressed === sequence[num]) {
          correct.play();
          card.card.classList.add('inactive');
          card.guessed += 1;
          sessionStorage.setItem(`${card.name}-guessed`, card.guessed);
          const starSuccess = document.createElement('img');
          starSuccess.src = './data/img/star_success.svg';
          scoreContainer.appendChild(starSuccess);
          num += 1;
          // if not all cards are guessed
          if (num < cards.length) {
            playSound(num);
          } else {
            card.card.classList.remove('inactive');
            activeSection.classList.add('none');
            scorePage.classList.add('score-page--active');
            scorePage.classList.remove('score-page--disabled');
            play.checked = false;
            gameMode = false;
            card.card.classList.remove('play-mode');
            playButton.classList.toggle('opacity-none');
            trainButton.classList.toggle('opacity-none');
            toggleContainer.classList.toggle('switch--play');
            toggleContainer.style.backgroundColor = '#90e0ef';
            document.querySelector('#toggle-input').checked = false;

            cards.forEach((item) => {
              item.card.classList.remove('play-mode');
            });

            if (mistakes) {
              failure.play();
              pic.src = './data/img/fail.png';
              mistakes === 1 ? resultHeader.innerText = `${mistakes} mistake` : resultHeader.innerText = `${mistakes} mistakes`;
              resultHeader.style.color = '#d62828';
            } else {
              success.play();
              pic.src = './data/img/success.png';
              resultHeader.innerText = '0 mistakes';
              resultHeader.style.color = '#588157';
            }
            scorePage.addEventListener('click', () => {
              location.reload();
            });
          }
        } else {
          error.play();
          cards[sequence[num]].miss += 1;
          sessionStorage.setItem(`${cards[sequence[num]].name}-miss`, cards[sequence[num]].miss);
          const starError = document.createElement('img');
          starError.src = './data/img/star_error.svg';
          scoreContainer.appendChild(starError);
          mistakes += 1;
        }
      }
    });
    card.button.addEventListener('click', () => {
      card.card.classList.add('rotate');
    });
    card.card.addEventListener('mouseleave', () => {
      card.card.classList.remove('rotate');
    });
  });
}

// NAVIGATION
function navigator(card) {
  card.section.classList.remove('none');
  card.link.classList.add('active');
  navigationButton.checked = false;
  activeSection = card.section;
  selectCards();
  touch();

  mainPageCards.forEach((item) => {
    if (item.section !== card.section) {
      item.link.classList.remove('active');
      item.section.classList.add('none');
    }
  });

  if (!statsPage.classList.contains('none')) {
    statsPage.classList.add('none');
    mainPage.classList.remove('none');
  }
  if (card.card === main.card) {
    location.reload();
  }
}

mainPageCards.forEach((mainCard) => {
  mainCard.card.addEventListener('click', () => {
    navigator(mainCard);
  });

  mainCard.link.addEventListener('click', () => {
    navigator(mainCard);
    RDWSection.classList.add('none');
    scoreContainer.innerHTML = '';
    toggleCheck.checked = false;
    playButton.classList.add('opacity-none');
    trainButton.classList.remove('opacity-none');
    toggleContainer.classList.remove('switch--play');
    toggleContainer.style.backgroundColor = '#90e0ef';
    gameMode = false;
    play.checked = false;
    cards.forEach((card) => {
      card.card.classList.remove('play-mode');
      card.card.classList.remove('inactive');
    });
  });
});

// STATISTICS
statsButton.addEventListener('click', () => {
  allCards.forEach((items) => {
    items.forEach((item) => {
      appendScores(item);
      item.card.classList.remove('inactive');
    });
  });

  mainPage.classList.add('none');
  statsPage.classList.remove('none');
  mainPageCards.forEach((card) => {
    card.link.classList.remove('active');
  });
  navigationButton.checked = false;
});

createStatsTable();

// RESET SCORES
buttonResetScores.addEventListener('click', () => {
  RDWContainer.innerText = '';
  document.querySelector('.RDW-background-image').classList.remove('none');
  allCards.forEach((items) => {
    items.forEach((item) => {
      item.trained = 0;
      sessionStorage.setItem(`${item.name}-trained`, item.trained);
      item.guessed = 0;
      sessionStorage.setItem(`${item.name}-guessed`, item.guessed);
      item.miss = 0;
      sessionStorage.setItem(`${item.name}-miss`, item.miss);
      document.querySelector('.stats-table__body-row').remove();
      appendScores(item);
    });
  });
});

// SORT
const properties = [
  'name', 'name',
  'translation', 'translation',
  'category', 'category',
  'trained', 'trained',
  'guessed', 'guessed',
  'miss', 'miss',
  'accuracy', 'accuracy'];

for (let i = 0; i < sortButtons.length; i += 1) {
  const button = sortButtons[i];
  button.addEventListener('click', () => {
    let sorted;
    if (i % 2 === 0) {
      sorted = sort(properties[i]);
    } else {
      sorted = sort(properties[i]).reverse();
    }
    sorted.forEach((card) => {
      document.querySelector('.stats-table__body-row').remove();
      appendScores(card);
    });
  });
}

// DIFFICULT WORDS
repeatDiffWords.addEventListener('click', () => {
  statsPage.classList.add('none');
  mainPage.classList.remove('none');
  mainPageCards.forEach((item) => {
    item.section.classList.add('none');
    activeSection = RDWSection;
    RDWSection.classList.remove('none');
    cards = createRDFCards();
  });

  cards.forEach((card) => {
    RDWContainer.append(card.card);
  });

  if (cards.length) {
    document.querySelector('.RDW-background-image').classList.add('none');
  }
  selectCards();
  touch();
});

export {
  cards, sequence, activeSection, RDWSection,
};
