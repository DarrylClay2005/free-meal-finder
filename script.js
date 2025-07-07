document.addEventListener('DOMContentLoaded', () => {
    // Create and add the refresh button
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = 'Get New Meal';
    document.body.appendChild(refreshBtn);

    // Container for meal content
    const mealContainer = document.createElement('div');
    mealContainer.style.transition = 'opacity 0.5s';
    mealContainer.style.opacity = 1;
    document.body.appendChild(mealContainer);

    function fetchAndDisplayMeal() {
        // Fade out
        mealContainer.style.opacity = 0;

        // Wait for fade out to finish before fetching and updating content (THIS IS VERY IMPORTANT OTHERWISE THIS GONNA BE LOOKING REAL MESSED UP)
        setTimeout(() => {
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(data => {
                    const meal = data.meals[0];
                    mealContainer.innerHTML = `
                        <h2>${meal.strMeal}</h2>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p>${meal.strInstructions}</p>
                    `;
                    // Fade in (after content is updated. Again, i might change this later)
                    mealContainer.style.opacity = 1;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    mealContainer.style.opacity = 1; // Ensure fade in on error
                });
        }, 500); // Match the transition duration
    }

    // Initial fetch from the api
    fetchAndDisplayMeal();

    // Refresh on button click (its random its not going to be the same meal)
    refreshBtn.addEventListener('click', fetchAndDisplayMeal);
});

