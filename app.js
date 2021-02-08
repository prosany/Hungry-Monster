const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}">
                    </div>
                    <div class="meal-Name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#header" class="recipe-btn">See Recipe</a>
                    </div>
                    <div class="meal-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        4.5
                    </div>
                    <div class="meal-tag">${meal.strTags}</div>
                </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        // console.log('This is', mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    // console.log(meal);
    meal = meal[0];
    let html = `
    <div class="left-side">
    <div class="recipe-title"><h2>${meal.strMeal}</h2></div>
    <!--<div class="recipe-category"><span class="recipe-headline">Category:</span>${meal.strCategory} | <span class="recipe-headline">Area:</span>${meal.strArea}</div> -->
    <div class="recipe-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
</div>
        <div class="right-side">
            <div class="rateing1 rcp-margin">
                <div class="recipe-rating1">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <i class="far fa-star"></i>
                    3.5
                    <div class="whatfor">
                        Dining Reviews
                    </div>
                </div>
            </div>
            <div class="rateing2 rcp-margin">
                <div class="recipe-rating2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    4.5
                    <div class="whatfor">
                        Delivery Reviews
                    </div>
                </div>
            </div>
            <div class="recipe-ingredients">
                <h4>Ingredients</h4>
                <p><span><i class="far fa-check"></i>${meal.strIngredient1}</span></p>
                <p><span><i class="far fa-check"></i>${meal.strIngredient2}</span></p>
                <p><span><i class="far fa-check"></i>${meal.strIngredient3}</span></p>
                <p><span><i class="far fa-check"></i>${meal.strIngredient4}</span></p>
                <p><span><i class="far fa-check"></i>${meal.strIngredient5}</span></p>
                <p><span><i class="far fa-check"></i>${meal.strIngredient6}</span></p>
                <p><span><i class="far fa-check"></i>${meal.strIngredient7}</span></p>
            </div>
        </div>
        <div class="clear"></div>
        <div class="recipe-instruct">
        <h4>Cooking Instructions</h4>
        <p>${meal.strInstructions}</p>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}