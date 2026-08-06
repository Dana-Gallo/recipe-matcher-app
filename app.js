
// get the submit button
const submitButton = document.querySelector('.button')

// add an on click listener
submitButton.addEventListener(
    'click',
    async function (event) {
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
       
        // display the result as html
        
    }
)

