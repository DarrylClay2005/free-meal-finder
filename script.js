document.addEventListener('DOMContentLoaded', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      document.body.innerHTML += `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
