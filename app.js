
// get the submit button
const submitButton = document.querySelector('.button')

// add an on click listener
submitButton.addEventListener(
    'click',
    async function (event) {

        // wipe the data currently on the page
        const pageContainer = document.querySelector(".result")
        pageContainer.innerHTML = ""

        pageContainer.textContent = "Loading...";

        const textInput = document.querySelector('.ingredients-input')
        const ingredients = textInput.value
        // log the value in the ingredients text input
        console.log(ingredients)

        const baseUrl = 'http://localhost:3000'

        // make a request to the api for the recipies
        const response = await fetch(`${baseUrl}/get-recipies?ingredients=${encodeURIComponent(ingredients)}`)

        if (!response.ok) {
            pageContainer.textContent = "Something went wrong. Please try again.";
            
            return;
        }

        // turn the response into a json object
        // log the result of that request
        const data = await response.json()
        console.log(data)

        pageContainer.textContent = "";

        if (!data.meals) {
            pageContainer.textContent = "No recipes found";
        }

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

        mealContainer.dataset.mealId = meal.idMeal;

        // 2.5:
        // - Add an event listener to the mealContainer that will fetch the recipe details when clicked
        // - create a function to fetch the recipe details
        // - create a function to construct the recipe details DOM element
        // - append the recipe details DOM element to the corresponding html container (.recipeContainer)
        


        // 3. Insert it into the web page (e.g., inside the <body> tag)
        const pageContainer = document.querySelector(".result")
        pageContainer.append(mealContainer);
        mealContainer.append(mealName);
        mealContainer.append(country);
        mealContainer.append(thumbnail);
}

const resultsContainer = document.querySelector(".result");

resultsContainer.addEventListener("click", async function (event) {
    //starts at whatever they clicked and finds the closest parent with the .meal class
    const mealElement = event.target.closest(".meal");
    
    //protects us in case they clicked somewhere inside .result that wasn't actually a recipe
    if (!mealElement) {
        return;
    }
    
    const recipeContainer = document.querySelector(".recipeContainer");
    recipeContainer.textContent = "Loading...";

    const mealId = mealElement.dataset.mealId;

    try {
        const recipe = await getRecipeDetails(mealId);

        createRecipeElement(recipe);

        document.querySelector(".recipeContainer").scrollIntoView({ 
            behavior: 'smooth' 
        });

    } catch (error) {
        recipeContainer.textContent = "Something went wrong. Please try again";
    }
});

async function getRecipeDetails(mealId) {
    const baseUrl = 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/get-recipe?mealId=${mealId}`);

    //checks whether my backend response was successful
    if (!response.ok) {
        throw new Error("Failed to get recipe");
        //creates an error that im going to catch in my click listener
    }

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
    const ingredientsList = document.createElement("ul");
    const instructions = document.createElement("p");
    const image = document.createElement("img");

    recipeName.textContent = recipe.name;
    category.textContent = recipe.category;
    country.textContent = recipe.country;

    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i];

        const listItem = document.createElement("li");

        listItem.textContent = `${ingredient.measure} ${ingredient.ingredient}`;

        ingredientsList.append(listItem);
    }

    instructions.textContent = recipe.instructions;

    image.setAttribute("src", recipe.image);
    image.classList.add("meal-thumbnail");

    recipeContainer.append(recipeName);
    recipeContainer.append(category);
    recipeContainer.append(country);
    recipeContainer.append(ingredientsList);
    recipeContainer.append(instructions);
    recipeContainer.append(image);
}
