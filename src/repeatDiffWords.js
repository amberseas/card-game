import sort from './sort';

export default function createRDFCards() {
  const sortedCards = sort('miss').reverse();
  const result = [];
  for (let i = 0; i < 8; i += 1) {
    if (sortedCards[i].miss > 0) {
      result.push(sortedCards[i]);
    } else { return result; }
  } return result;
}
