const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards')

// Слушаем 3000 порт
const { PORT = 3000, LOCALHOST = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64427ec973e5a1b823ac9965'
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(LOCALHOST, {
 useNewUrlParser: true
});

app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res) => res.status(400).send({message:'Страница не найдена'}));

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})

