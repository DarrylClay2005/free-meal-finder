// index.js

// Fetch a random meal and display it (Also as a side note, try to add a fade in animation to the meal display)
async function fetchRandomMeal() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    displayMeal(data.meals[0]);
}