const express = require('express');
const hbs = require('express-handlebars');

const fs = require('fs');
const path = require('path');

const app = express();

const User = require('./models/User');

app.engine('hbs', hbs({   //двигун - hbs, і налаштування нашого шаблону:
    layoutsDir: 'views/layouts', //папка у які будуть шаблони
    defaultLayout: 'main-layouts.hbs', //дефолтний файлик для зберігання
    extname: 'hbs' // розширення, щоб кожного разу не прописувати його
}));

app.set('view engine', 'hbs'); // сетаємо наш двигун, кажемо йому hbs (співпадає із назвою, яку ми вказали у 10 рядку)
app.set('views', 'views'); //вказуємо шлях у до вюшок, які будуть в інших папках, етаємо шлях

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/users', (req, res) => {
//     const users = User.fetchALl();
//     res.render('users', {users})
// });


app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res, next) => {
    const {email, password} = req.body;
    const user = User.findUser(email, password);
    if (user) {
        //res.redirect('users')
        next();
    } else {
        res.render('login', {message: 'Wrong data'})
    }
}, (req, res) => {
    const users = User.fetchALl();
    res.render('users', {users})
});

app.get('/register', (req, res) => {
    res.render('register')
});
app.post('/register', (req, res) => {
    const {email, password} = req.body;
    const user = new User(email, password);
    const answer = user.save();
    if (answer) {
        res.redirect('login')
    } else {
        res.render('register', {message: 'Error in register'})
    }
});

app.use((req, res) => {
    res.status(404).render('404')
});

app.listen(3000, () => console.log('server was started on port 3000'));
