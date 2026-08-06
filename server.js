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

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
