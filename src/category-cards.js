import { activeSection, RDWSection } from './index';
import {
  fairytales, animals, food, activities, emotions, clothes, cars, space,
} from './mainPage-cards';
import createRDFCards from './repeatDiffWords';

class Card {
  constructor(name, translation, category, audio, card, button) {
    this.name = name,
      this.audio = audio,
      this.translation = translation,
      this.category = category,
      this.card = card,
      this.button = button,
      this.trained = parseInt(sessionStorage.getItem(`${this.name}-trained`)) || 0,
      this.guessed = parseInt(sessionStorage.getItem(`${this.name}-guessed`)) || 0,
      this.miss = parseInt(sessionStorage.getItem(`${this.name}-miss`)) || 0,
      this.accuracy = parseInt(sessionStorage.getItem(`${this.name}-accuracy`)) || 0;
  }
}
function makeCard(name, category) {
  return new Card(name, document.querySelector(`#${name}-game-card .game-card__side--back .game-card__title`).innerText, category, document.querySelector(`#${name}-audio`), document.querySelector(`#${name}-game-card`), document.querySelector(`#${name}-button`));
}

// section CARDS audio and rotation
export const fairytaleCards = [
  makeCard('dragon', 'Fairytales'),
  makeCard('prince', 'Fairytales'),
  makeCard('princess', 'Fairytales'),
  makeCard('fairy', 'Fairytales'),
  makeCard('mermaid', 'Fairytales'),
  makeCard('knight', 'Fairytales'),
  makeCard('witch', 'Fairytales'),
  makeCard('wizard', 'Fairytales'),
];

export const animalsCards = [
  makeCard('lion', 'Animals'),
  makeCard('camel', 'Animals'),
  makeCard('elephant', 'Animals'),
  makeCard('cow', 'Animals'),
  makeCard('koala', 'Animals'),
  makeCard('giraffe', 'Animals'),
  makeCard('whale', 'Animals'),
  makeCard('tiger', 'Animals'),
];

export const foodCards = [
  makeCard('salad', 'Food'),
  makeCard('pizza', 'Food'),
  makeCard('sandwich', 'Food'),
  makeCard('pancakes', 'Food'),
  makeCard('steak', 'Food'),
  makeCard('muffin', 'Food'),
  makeCard('salmon', 'Food'),
  makeCard('icecream', 'Food'),
];

export const activitiesCards = [
  makeCard('dance', 'Activities'),
  makeCard('draw', 'Activities'),
  makeCard('read', 'Activities'),
  makeCard('sing', 'Activities'),
  makeCard('swim', 'Activities'),
  makeCard('play', 'Activities'),
  makeCard('run', 'Activities'),
  makeCard('cook', 'Activities'),
];

export const emotionsCards = [
  makeCard('sad', 'Emotions'),
  makeCard('angry', 'Emotions'),
  makeCard('surprised', 'Emotions'),
  makeCard('scared', 'Emotions'),
  makeCard('tired', 'Emotions'),
  makeCard('happy', 'Emotions'),
  makeCard('sleepy', 'Emotions'),
  makeCard('shy', 'Emotions'),
];

export const clothesCards = [
  makeCard('pants', 'Clothes'),
  makeCard('shoes', 'Clothes'),
  makeCard('dress', 'Clothes'),
  makeCard('shirt', 'Clothes'),
  makeCard('socks', 'Clothes'),
  makeCard('hat', 'Clothes'),
  makeCard('jacket', 'Clothes'),
  makeCard('skirt', 'Clothes'),
];

export const carsCards = [
  makeCard('fire-engine', 'Cars'),
  makeCard('ambulance', 'Cars'),
  makeCard('police', 'Cars'),
  makeCard('bus', 'Cars'),
  makeCard('taxi', 'Cars'),
  makeCard('truck', 'Cars'),
  makeCard('motorcycle', 'Cars'),
  makeCard('train', 'Cars'),
];

export const spaceCards = [
  makeCard('rocket', 'Space'),
  makeCard('planet', 'Space'),
  makeCard('earth', 'Space'),
  makeCard('satellite', 'Space'),
  makeCard('sun', 'Space'),
  makeCard('meteorite', 'Space'),
  makeCard('moon', 'Space'),
  makeCard('astronaut', 'Space'),
];

export const allCards = [
  fairytaleCards,
  animalsCards,
  foodCards,
  activitiesCards,
  emotionsCards,
  clothesCards,
  carsCards,
  spaceCards];
