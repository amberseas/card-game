export const tableContainer = document.querySelector('.stats__container');
export const tableHeaders = ['Word', 'Translation', 'Category', 'Training', 'Guessed', 'Miss', 'Accuracy [%]'];

export const createStatsTable = () => {
    const statsTable = document.createElement('table');
    statsTable.classList.add('stats-table', 'table', 'table-bordered');

    const statsTableHead = document.createElement('thead');
    statsTableHead.classList.add('stats-table__head');

    const statsTableHeaderRow = document.createElement('tr');
    statsTableHeaderRow.classList.add('stats-table__header-row');

    tableHeaders.forEach((header) => {
        const scoreHeader = document.createElement('th');
        scoreHeader.innerText = header;
        const sortIconBox = document.createElement('div');
        sortIconBox.classList.add('sort-icon-box');
        const sortIconUp = document.createElement('span');
        sortIconUp.classList.add('material-symbols-outlined');
        sortIconUp.innerText = 'arrow_drop_up';
        const sortIconDown = document.createElement('span');
        sortIconDown.classList.add('material-symbols-outlined');
        sortIconDown.innerText = 'arrow_drop_down';
        sortIconBox.appendChild(sortIconUp);
        sortIconBox.appendChild(sortIconDown);
        scoreHeader.appendChild(sortIconBox);
        statsTableHeaderRow.append(scoreHeader);
    });

    statsTableHead.append(statsTableHeaderRow);
    statsTable.append(statsTableHead);
    const statsTableBody = document.createElement('tbody');
    statsTableBody.classList.add('stats-table__body');
    statsTable.append(statsTableBody);
    tableContainer.append(statsTable);
};

export const appendScores = (card) => {
    const statsTable = document.querySelector('.stats-table');
    const statsTableBodyRow = document.createElement('tr');
    statsTableBodyRow.classList.add('stats-table__body-row', 'table-secondary');
    const word = document.createElement('td');
    word.innerText = card.name[0].toUpperCase() + card.name.slice(1);
    const translation = document.createElement('td');
    translation.innerText = card.translation;
    const category = document.createElement('td');
    category.innerText = card.category;
    const trained = document.createElement('td');
    trained.innerText = card.trained;
    const guessed = document.createElement('td');
    guessed.innerText = card.guessed;
    const miss = document.createElement('td');
    miss.innerText = card.miss;
    const accuracy = document.createElement('td');
    const cardAccuracy = Math.round(
        (parseInt(card.guessed, 10) / (parseInt(card.guessed, 10) + parseInt(card.miss, 10))) * 100,
    );
    sessionStorage.setItem(`${card.name}-accuracy`, cardAccuracy);
    accuracy.innerText = cardAccuracy || 0;
    statsTableBodyRow.append(word, translation, category, trained, guessed, miss, accuracy);
    statsTable.append(statsTableBodyRow);
};