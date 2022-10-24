class Section {
  constructor(link, section, card) {
    this.link = link,
    this.section = section,
    this.card = card;
  }
}

const links = document.querySelectorAll('.navigation__item');
const sections = document.querySelectorAll('section');
const mainCards = document.querySelectorAll('.card-main');
const logo = document.querySelector('#logo');

// Main page cards
export const main = new Section(links[0], sections[0], logo);
export const fairytales = new Section(links[1], sections[1], mainCards[0]);
export const animals = new Section(links[2], sections[2], mainCards[1]);
export const food = new Section(links[3], sections[3], mainCards[2]);
export const activities = new Section(links[4], sections[4], mainCards[3]);
export const emotions = new Section(links[5], sections[5], mainCards[4]);
export const clothes = new Section(links[6], sections[6], mainCards[5]);
export const cars = new Section(links[7], sections[7], mainCards[6]);
export const space = new Section(links[8], sections[8], mainCards[7]);

export const mainPageCards = [
  main,
  fairytales,
  animals,
  food,
  activities,
  emotions,
  clothes,
  cars,
  space,
];
