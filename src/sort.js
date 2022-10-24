import { allCards } from './category-cards';

export default function sort(prop) {
  return allCards.flat().sort((a, b) => {
    let nameA; // ignore upper and lowercase
    let nameB;
    const strings = ['name', 'translation', 'category'];
    if (strings.includes(prop)) {
      nameA = a[prop].toUpperCase(); // ignore upper and lowercase
      nameB = b[prop].toUpperCase(); // ignore upper and lowercase
    } else if (prop === 'accuracy') {
      nameA = Math.round(
        (parseInt(a.guessed, 10) / (parseInt(a.guessed, 10) + parseInt(a.miss, 10))) * 100,
      ) || 0;
      nameB = Math.round(
        (parseInt(b.guessed, 10) / (parseInt(b.guessed, 10) + parseInt(b.miss, 10))) * 100,
      ) || 0;
    } else {
      nameA = a[prop]; // ignore upper and lowercase
      nameB = b[prop]; // ignore upper and lowercase
    }

    if (nameA < nameB) {
      return -1;
    } if (nameA > nameB) {
      return 1;
    } return 0;
  });
}
