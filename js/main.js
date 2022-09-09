import { PetsService } from './modules/class/Http.js';

console.log('main.js');

const listEl = document.getElementById('pets-list');

async function deletePet(id) {
  console.log('deleting pet id', id);
  const deleteSuccess = await PetsService.delete(id);
  console.log('deleteResult ===', deleteSuccess);
  if (deleteSuccess) {
    flow();
  }
}

function makeOneCard(cardData) {
  // eslint-disable-next-line object-curly-newline
  const { id, name, dob, client_email } = cardData;

  const date = new Date(dob).toLocaleDateString('lt-LT');
  const divEl = document.createElement('div');
  divEl.classList = 'card pets';
  divEl.innerHTML = `
      <h3 class="title">${name}</h3>
      <p class="mb-0">${date}</p>
      <p>${client_email}</p>
      <div class="control">
        <a href="/logs.html?petId=${id}" class="btn">view log</a>
        <button id="delete" class="btn outline">delete</button>
      </div>
       `;
  divEl.querySelector('#delete').addEventListener('click', () => {
    deletePet(id);
  });
  return divEl;
}

/**
 *
 * @param {*} arr
 * @param {HTMLElement} dest
 */
function makeCardsList(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((el) => {
    const oneCard = makeOneCard(el);
    dest.append(oneCard);
  });
}

const flow = async () => {
  const allPets = await PetsService.getPets();
  console.log('allPets ===', allPets);
  makeCardsList(allPets, listEl);
};

flow();

// PetsService.create({
//   name: 'Jerry the mouse',
//   dob: '2000-07-07',
//   client_email: 'Jerry@mouse.lt',
// });
