const express = require('express');
const dayjs = require('dayjs');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'ejs');

// Route for the main page
app.get('/', (req, res) => {
    res.render('index', { name: null, countdown: null });
});

// Route to handle the form submission
app.post('/countdown', (req, res) => {
    const { name, birthday } = req.body;
    const today = dayjs();
    let nextBirthday = dayjs(birthday).year(today.year());

    // Adjust nextBirthday to next year if the date has passed this year
    if (nextBirthday.isBefore(today)) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    const countdown = nextBirthday.diff(today, 'day');
    res.render('index', { name, countdown });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
