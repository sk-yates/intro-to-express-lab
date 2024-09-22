// ----------------------------------------------------------------------------------------------------------

// Import Express
const express = require('express')

// Create an Express app
const app = express()

// Define routes here (we'll add them soon)

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
  

  // Define routes here:
app.get('/', (req, res) => {
    res.send('<h1>Root page</h1>');
  });

// ----------------------------------------------------------------------------------------------------------

// Status for each response
//res.status(num)
// (200) Success
// (400) Bad request
// (404) Not found

// ----------------------------------------------------------------------------------------------------------

//Task 1 - Greet a user

// Defines the route parent as /greetings/ with the value/param :username
app.get('/greetings/:username', (req, res) => {

    // using a temp-literal 'responds' with error status and a message including the username - within the params - provided in the 'req'est
    res.status(200).send(`<h1> Hello there, ${req.params.username} </h1>`);
  });

// ----------------------------------------------------------------------------------------------------------

// Task 2 - Rolling the dice  

//Defines the route parent as /roll/ with the value/param :rollnum
app.get('/roll/:rollnum', (req, res) => {
    const rollnum = req.params.rollnum;

    // Check that the value in the param is a number
    const number = parseInt(rollnum);

    if (isNaN(number)) {
        // If not a number, responds with an error status & an error message to the user
        res.status(400).send('<h1> You must specify a number. </h1>');
    } else {
        // Dice roll code contained in the const + (number + 1) includes the number in the param.
        const rollResult = Math.floor(Math.random() * (number + 1));
        res.status(200).send(`<h1> You rolled a ${rollResult}. </h1>`);
    }
});

// ----------------------------------------------------------------------------------------------------------

// Task 3 - I want THAT one!  

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

// Defines the route parent as /collectibles/ with the value/param :index
app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);

    // check whether the value in the index is a valid number
    if (isNaN(index)) {
        res.status(400).send('<h1> Please enter an item number </h1>');
    // check is the value is within the range of the array
    } else if (index < 0 || index >= collectibles.length) {
        res.status(404).send('<h1> This item is not yet in stock. Check back soon! </h1>');
    //
    } else {
        const item = collectibles[index];
        res.status(200).send(`<h1> So, you want <br/> the ${item.name}? <br/> For ${item.price}, it can be yours! </h1>`);
    }
});

// ----------------------------------------------------------------------------------------------------------

// Task 4 - Filter shoes by Query Params

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// 
app.get('/shoes', (req, res) => {
    const type = (req.query.type);
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);

    let filteredShoes = shoes

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => {
        return shoe.type === type
        })
    };

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => {
        return shoe.price <= maxPrice
        })
    };

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => {
        return shoe.price >= minPrice
        })
    };

res.status(200).json(filteredShoes);

});

// ----------------------------------------------------------------------------------------------------------