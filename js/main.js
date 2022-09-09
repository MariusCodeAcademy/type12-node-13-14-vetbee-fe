import { PetsService } from './modules/class/Http.js';

console.log('main.js');

const listEl = document.getElementById('pets-list');

const flow = async () => {
  const allPets = await PetsService.getPets();
  console.log('allPets ===', allPets);
};

flow();
