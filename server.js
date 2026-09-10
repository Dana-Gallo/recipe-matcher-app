const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// find the api by ingredient endpt link on the api docs

// find the baseUrl

// append the parameters to the base Url (as a new finalUrl variable)

async function getRecipies(ingredients) {
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php';
    const finalUrl = `${baseUrl}?i=${encodeURIComponent(ingredients)}`;

// make the request with fetch
// turn the request result into a json object
// log the json request result
// return the json request result

    const response = await fetch(finalUrl);
    const data = await response.json();
    console.log(data);
    return data;
}

async function getRecipe(mealId) {
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php';
    const finalUrl = `${baseUrl}?i=${mealId}`;

    const response = await fetch(finalUrl);
    const data = await response.json();

    const meal = data.meals[0];

    const recipe = {
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        country: meal.strArea,
        instructions: meal.strInstructions,
        image: meal.strMealThumb
    };

    return recipe;
}


app.get(
    '/get-recipies',
    async (req, res) => {
    const ingredients = req.query.ingredients
    if (!ingredients) {
        res.send('pls pass in ingredients')
        return
    }

    const recipies = await getRecipies(ingredients)
    console.log(recipies)
    res.json(recipies)
    return
    })

app.get(
    '/get-recipe',
    async (req, res) => {
        const mealId = req.query.mealId;

        if (!mealId) {
            res.send('pls pass in a mealId');
            return;
        }

        const recipe = await getRecipe(mealId);

        console.log(recipe);

        res.json(recipe);
        return;
    }
);
// https://www.traininggrounds.co/dana/lessons/dana-recipe-matcher
// Homework:
// 1. create a new endpoint `/get-recipe` that takes a `mealId` and returns the recipe for that mealId.
//   a. ask ai to help test it with curl
//     `curl http://localhost:3000/get-recipe?mealId=52772`
// 2. then, transform the raw recipe data into something nicer to use on the front end
// api endpoint: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

