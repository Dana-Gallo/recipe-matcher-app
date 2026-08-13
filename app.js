
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

        for (let i = 0; i < data.meals.length - 1; i++) {
            // get the ith meal
            const meal = data.meals[i]
            // display the ith meal as html
            createMealElement(meal)
        }

        // const firstMeal = data.meals[0]
        // console.log(firstMeal)
       
        // const secondMeal = data.meals[1]
        // console.log(secondMeal)

        // // display the first 10 results as html
        // createMealElement(firstMeal)
        // createMealElement(secondMeal)
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
        

        // 3. Insert it into the web page (e.g., inside the <body> tag)
        const pageContainer = document.querySelector(".result")
        pageContainer.append(mealContainer);
        mealContainer.append(mealName);
        mealContainer.append(country);
        mealContainer.append(thumbnail);
}