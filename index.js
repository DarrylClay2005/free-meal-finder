// index.js

// Fetch a random meal and display it (Also as a side note, try to add a fade in animation to the meal display)
async function fetchRandomMeal() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    displayMeal(data.meals[0]);
}

// Fetch meals by search term
async function fetchMealsBySearch(term) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`);
    const data = await res.json();
    displayMeals(data.meals);
}

// Display a single meal (Double check that this function is not doubled executing)
function displayMeal(meal) {
    const container = document.getElementById('meals');
    container.innerHTML = meal ? 
        <div class="meal">
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200"/>
            <p>${meal.strInstructions.substring(0, 200)}...</p>
        </div>
     : '<p>No meal found.</p>';
}