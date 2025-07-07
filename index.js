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

// Display multiple meals (Add a search bar to search for meals by name otherwise this gonna be looking real stupid)
function displayMeals(meals) {
    const container = document.getElementById('meals');
    if (!meals) {
        container.innerHTML = '<p>No meals found.</p>';
        return;
    }
    container.innerHTML = meals.map(meal => 
        <div class="meal">
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200"/>
            <p>${meal.strInstructions.substring(0, 200)}...</p>
        </div>
    ).join('');
}

// Set up search bar and event listeners (Also make sure the images are working properly, if not then try to use a different image source)
function setup() {
    const searchForm = document.createElement('form');
    searchForm.innerHTML = 
        <input type="text" id="searchInput" placeholder="Search for a meal..." />
        <button type="submit">Search</button>
        <button type="button" id="randomBtn">Random Meal</button>
    ;
    document.body.prepend(searchForm);

    const mealsDiv = document.createElement('div');
    mealsDiv.id = 'meals';
    document.body.appendChild(mealsDiv);

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const term = document.getElementById('searchInput').value.trim();
        if (term) {
            fetchMealsBySearch(term);
        }
    });

    document.getElementById('randomBtn').addEventListener('click', () => {
        fetchRandomMeal();
    });

    // Show a random meal on load
    fetchRandomMeal();
}

window.onload = setup;