const axios = require("axios");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set("PORT", PORT);

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    let url = `https://indreed.herokuapp.com/api/jobs?q=internship&limit=20`;
    axios({
        method: 'get',
        url
    })
    .then(function (response) {
        let jobs = response.data;
        console.dir(response);
        console.log(jobs.length);
        res.render("index", { title: "Internships", jobs: jobs});
    })
    .catch(function (error) {
        console.log(error);
    });

});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' + app.get('PORT'));
});
