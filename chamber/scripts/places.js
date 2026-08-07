import { places } from '../data/places.mjs';

const container = document.getElementById('places-list');

if (!container) {
  console.error('No #places-list container found in discover.html');
} else {
  places.forEach(place => {
    const card = document.createElement('article');
    card.className = 'place-card';
    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" class="place-image" width="300" height="200">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn more</button>
    `;
    container.appendChild(card);
  });
}

console.log('Loaded places:', places);