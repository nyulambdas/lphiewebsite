const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/dist'));

app.set('view engine', 'hbs');
app.set('view options', { layout: 'home' });

app.get('/', (req, res) => {
  res.render('home');
});

console.log('connected');

app.listen(process.env.PORT || 4444);
