document.addEventListener('DOMContentLoaded', () => {
    // Container for meal content
    const mealContainer = document.createElement('div');
    mealContainer.style.transition = 'opacity 0.5s';
    mealContainer.style.opacity = 1;
    document.body.appendChild(mealContainer);

    function fetchAndDisplayMeal() {
        // Fade out
        mealContainer.style.opacity = 0;

        setTimeout(() => {
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(data => {
                    const meal = data.meals[0];
                    mealContainer.innerHTML = `
                        <h2>${meal.strMeal}</h2>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="cursor:pointer;">
                        <p>${meal.strInstructions}</p>
                    `;
                    // Add click event to image for refresh
                    const img = mealContainer.querySelector('img');
                    if (img) {
                        img.addEventListener('click', fetchAndDisplayMeal);
                    }
                    mealContainer.style.opacity = 1;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    mealContainer.style.opacity = 1;
                });
        }, 500);
    }

    // Initial fetch from the api
    fetchAndDisplayMeal();
});

function fetchAllMeals() { /*This function fetches all meals from TheMealDB API, processes the response to extract meal names, images, 
    and instructions, logs these arrays to the console, and dynamically renders all meals (with their name, image, and instructions) 
    to the web page. If no meals are found or an error occurs, it logs a message to the console. */
    // Fetch all meals from TheMealDB API (This the short version of the note)
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(response => response.json())
        .then(data => {
            if (!data.meals) {
                console.log('No meals found.');
                return;
            }
            // Create arrays of meal names, images, and instructions
            const mealNames = data.meals.map(meal => meal.strMeal);
            const mealImages = data.meals.map(meal => meal.strMealThumb);
            const mealInstructions = data.meals.map(meal => meal.strInstructions);

            // Log arrays to the console
            console.log('Meal Names:', mealNames);
            console.log('Meal Images:', mealImages);
            console.log('Meal Instructions:', mealInstructions);

            // Render all meals to the DOM
            const allMealsContainer = document.createElement('div');
            allMealsContainer.innerHTML = '<h2>All Meals</h2>';
            data.meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.style.marginBottom = '24px';
                mealDiv.innerHTML = `
                    <h3>${meal.strMeal}</h3>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width:200px;">
                    <p>${meal.strInstructions}</p>
                `;
                allMealsContainer.appendChild(mealDiv);
            });
            document.body.appendChild(allMealsContainer);
        })
        .catch(error => {
            console.error('Error fetching all meals:', error);
        });
}

// Call the function to fetch and display all meals
fetchAllMeals();
