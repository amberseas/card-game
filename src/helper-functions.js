import { sequence } from './index';
import { cards } from './index';

export function randomArray() {
  const random = [];
  const numberOfCards = cards.length;

  while (random.length < numberOfCards) {
    const num = (Math.floor(Math.random() * numberOfCards));

    if (!random.includes(num)) {
      random.push(num);
    }
  } return random;
}

export const playSound = (i) => {
  cards[sequence[i]].audio.play();
};
