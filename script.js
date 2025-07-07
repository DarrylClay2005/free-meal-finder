// adding search buttons and functionality to the meal finder app (not really a app but you get the point)
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      // Process and display the search results
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
// Function to fetch a random meal (no need to try and make a search bar for this)
function fetchRandomMeal() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      // Process and display the random meal
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
// Call the function to fetch a random meal on page load (not set to a fixed page number)
document.addEventListener('DOMContentLoaded', () => {
  fetchRandomMeal();
});
