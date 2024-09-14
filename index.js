if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const morgan = require('morgan'); // Import morgan

const indexRouter = require('./routes/index');
const authorsrouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// Use morgan middleware for logging requests
app.use(morgan('combined')); // You can choose 'dev' or 'combined' for a more concise output
app.use(morgan('dev'));

mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorsrouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
