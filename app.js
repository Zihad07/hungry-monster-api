const mealList = document.getElementById("meal-list");
const singleMealDetails = document.getElementById("single-meal-details");
/*
Search meal by name
https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
Lookup full meal details by id
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
Filter by Category
https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
*/

// api url
const listAllMealApiEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const singleMealApiEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`;
const categoryMealApiEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`;
const areaWiseMealApiEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=`;
//----------------------------------
const searchBtn = document.getElementById("searchMeal");
const searchFoodName = document.getElementById("foodName");

const spinnerHtml = `
<div class="text-center d-flex align-items-center justify-content-center" style="padding-top:30%;">
<div class="spinner-grow text-primary" role="status">
</div>
<div class="spinner-grow text-secondary" role="status">
</div>
<div class="spinner-grow text-success" role="status">
</div>
<div class="spinner-grow text-danger" role="status">
</div>
<div class="spinner-grow text-warning" role="status">
</div>
<div class="spinner-grow text-info" role="status">
</div>
<div class="spinner-grow text-light" role="status">
</div>
<div class="spinner-grow text-dark" role="status"></div>
</div>
`

function getLowerCase(sentence) {
    return sentence.toLocaleLowerCase();
}

function updateDOM(html) {
    mealList.innerHTML = html;
    singleMealDetails.innerHTML = '';
}

async function loadmealList(apiAddress, objDOM = null) {

    // Loading spinner before fetch Data.
    if (objDOM) {
        objDOM.innerHTML = spinnerHtml;
    }
    // console.log(apiAddress);
    const response = await fetch(apiAddress);
    const data = await response.json();

    // console.log(data);

    return data;
}






function getIngredient(obj) {
    const ingredients = [];
    let listIngredient = ``;
    for (key in obj) {
        // console.log(key)
        if (`${key}`.includes('strIngredient') && obj[key]) {
            // ingredients.push(obj[key])
            listIngredient += `<li class="list-group-item"><input class="form-check-input me-1" type="checkbox" checked aria-label="..."> ${obj[key]}</li>`;
        }
        // console.log(obj[key])
    }

    // console.table(listIngredient);
    return listIngredient;

}

function showSingleMealDetails(id) {
    console.log(id);
    loadmealList(singleMealApiEndpoint.replace(`i={id}`, `i=${id}`), singleMealDetails).then(data => {

        let HTML = ``;
        // console.log(data);
        const allMeal = data.meals;



        allMeal.forEach(eachMeal => {
            HTML += `
            <div class="card card-body">
                <img src="${eachMeal.strMealThumb}" class="card-img-top img-thumbnail" alt="...">
                <div class="card-body text-center">
                    <h4 class="card-title">${eachMeal.strMeal}</h4>
                </div>

                <h5 class="text-center">--Ingredient List---</h5>
                <ul class="list-group list-group-flush">
                    ${getIngredient(eachMeal)}
                </ul>
            </div>
          `
        });

        singleMealDetails.innerHTML = HTML;
    })
}

function loadSearchMeals(mealName) {
    loadmealList(listAllMealApiEndpoint.replace(`s=`, `s=${mealName}`), mealList).then(data => {

        let HTML = ``;
        // console.log(data);
        let allMeal = data.meals;

        if (!allMeal) {
            //search by category
            loadmealList(singleMealApiEndpoint.replace(`c=`, `c=${mealName}`)).then(data => {
                allMeal = data.meals
            })
        }

        if (!allMeal) {
            //search by area
            loadmealList(singleMealApiEndpoint.replace(`a=`, `a=${mealName}`)).then(data => {
                allMeal = data.meals
            })
        }

        // show error message
        if (!allMeal) {
            HTML += `<h3 class="text-danger">This is invalid meal name or category or area</h3>`
            updateDOM(HTML);
            return;
        }

        allMeal.forEach(eachMeal => {
            HTML += `
            <div class="m-2 shadow border-0 rounded p-0" style="width: 22%;cursor:pointer;" onclick="showSingleMealDetails('${eachMeal.idMeal}');">
                <img src="${eachMeal.strMealThumb}" class="card-img-top img-fluid" alt= "">
                <div class="card-body text-center">
                    <strong class="text-bold text-small" style="font-size:14px;">${eachMeal.strMeal}</strong>
                </div>
            </div>
          `
        });



        // dom html updated.
        updateDOM(HTML);
    })

}

// loadSearchMeals();


// Event handler action
searchBtn.addEventListener('click', function(e) {
    // console.log(searchFoodName);
    loadSearchMeals(searchFoodName.value);
});