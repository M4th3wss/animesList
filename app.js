express = require('express');
app = express();

mainController = require('./controller/mainController');


const path = require('node:path');


//using EJS
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));


//Middleware
app.get('/', mainController.getAllAnimes);
app.get('/add', mainController.createAnimeGet);
app.post('/add', mainController.createAnimePost);


app.listen(3000, () => {
    console.log("Server running on port 3000");
})