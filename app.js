
// get the submit button
const submitButton = document.querySelector('.button')

// add an on click listener
submitButton.addEventListener(
    'click',
    async function (event) {

        // wipe the data currently on the page
        const pageContainer = document.querySelector(".result")
        pageContainer.innerHTML = ""


        const textInput = document.querySelector('.ingredients-input')
        const ingredients = textInput.value
        // log the value in the ingredients text input
        console.log(ingredients)

        const baseUrl = 'http://localhost:3000'

        // make a request to the api for the recipies
        const response = await fetch(`${baseUrl}/get-recipies?ingredients=${encodeURIComponent(ingredients)}`)

        // turn the response into a json object
        // log the result of that request
        const data = await response.json()
        console.log(data)

        for (let i = 0; i < data.meals.length; i++) {
            // get the ith meal
            const meal = data.meals[i]
            // display the ith meal as html
            createMealElement(meal)
        }
    }
)

function createMealElement(meal) {
        // <div class="meal">
        //     <p>{mealName}</p>
        //     <p>{country}</p>
        //     <img src="{thumbnail}" alt="{mealName}">
        // </div>
        // 1. Create the element
        const mealContainer = document.createElement("div");
        const mealName = document.createElement("span");
        const country = document.createElement("span");
        const thumbnail = document.createElement("img");


        // 2. Configure the element (add content, classes, attributes)
        mealName.textContent = meal.strMeal
        country.textContent = meal.strCountry
        thumbnail.setAttribute("src", meal.strMealThumb);
        thumbnail.classList.add("meal-thumbnail");
        mealContainer.classList.add("meal");

        // 2.5:
        // - Add an event listener to the mealContainer that will fetch the recipe details when clicked
        // - create a function to fetch the recipe details
        // - create a function to construct the recipe details DOM element
        // - append the recipe details DOM element to the corresponding html container (.recipeContainer)
        
        mealContainer.addEventListener("click", async function () {
        const recipe = await getRecipeDetails(meal.idMeal);
        createRecipeElement(recipe);
    });

        // 3. Insert it into the web page (e.g., inside the <body> tag)
        const pageContainer = document.querySelector(".result")
        pageContainer.append(mealContainer);
        mealContainer.append(mealName);
        mealContainer.append(country);
        mealContainer.append(thumbnail);
}

async function getRecipeDetails(mealId) {
    const baseUrl = 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/get-recipe?mealId=${mealId}`);

    const data = await response.json();

    console.log(data);

    return data;
}

function createRecipeElement(recipe) {

    const recipeContainer = document.querySelector(".recipeContainer");

    recipeContainer.innerHTML = "";

    const recipeName = document.createElement("h2");
    const category = document.createElement("p");
    const country = document.createElement("p");
    const instructions = document.createElement("p");
    const image = document.createElement("img");

    recipeName.textContent = recipe.name;
    category.textContent = recipe.category;
    country.textContent = recipe.country;
    instructions.textContent = recipe.instructions;

    image.setAttribute("src", recipe.image);
    image.classList.add("meal-thumbnail");

    recipeContainer.append(recipeName);
    recipeContainer.append(category);
    recipeContainer.append(country);
    recipeContainer.append(instructions);
    recipeContainer.append(image);
}
