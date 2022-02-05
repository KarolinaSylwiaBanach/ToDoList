const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const {todoRouter} = require("./routers/todo");
const {homeRouter} = require("./routers/home");

const app = express();

//
app.use(methodOverride('_method'))
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(express.json());

//configuration handelbars
app.engine('.hbs', hbs({
    extname: '.hbs',
    //helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/todo', todoRouter);

app.listen(3000,'localhost',() => {
    console.log('Listening on http://localhost:3000');
});

