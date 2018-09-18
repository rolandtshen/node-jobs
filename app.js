const axios = require("axios");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const handlebars = require('express-handlebars');
const hbs = handlebars.create({
  helpers: {
    grouped_each: function(every, context, options) {
        var out = "", subcontext = [], i;
        if (context && context.length > 0) {
            for (i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    out += options.fn(subcontext);
                    subcontext = [];
                }
                subcontext.push(context[i]);
            }
            out += options.fn(subcontext);
        }
        return out;
    }
  }
})

app.engine('.hbs', hbs.engine);
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
