const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// BMI calculation route
app.post('/calculate', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const age = req.body.age;
    const gender = req.body.gender;

    // Input validation
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invalid Input</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>Invalid input</h1>
                <p>Please ensure weight and height are positive numbers.</p>
                <a href="/">Go back</a>
            </body>
            </html>
        `);
        return;
    }

    // Calculate BMI
    const bmi = weight / (height * height);
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    // Send result page
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>BMI Result</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Your BMI Result</h1>
            <p>BMI: ${bmi.toFixed(2)}</p>
            <p>Category: ${category}</p>
            <p>Age: ${age}, Gender: ${gender}</p>
            <a href="/">Go back</a>
        </body>
        </html>
    `);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
