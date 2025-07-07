// Create search bar, button, and container elements
const searchContainer = document.createElement('div');
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search for a meal...';
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
const randomButton = document.createElement('button');
randomButton.textContent = 'Random Meal';
const mealContainer = document.createElement('div');

searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
searchContainer.appendChild(randomButton);
document.body.appendChild(searchContainer);
document.body.appendChild(mealContainer);

