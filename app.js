const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');
const Page = models.Page;
const routes = require('./routes');

// Nunjucks
app.engine('html', nunjucks.render); 
app.set('view engine', 'html'); 
const env = nunjucks.configure('views', { noCache: true });

// Using morgan to log middleware
app.use(morgan('dev'));

// Static middleware
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', function(req,res,next){
  Page.findAll()
  .then(function(pages){
    res.render('index', { pages: pages });
  })
});

models.db.sync({ force: false })
.then (function(){
  app.listen(3000,function(){
    console.log('Server is listening! Yay!');
  })
})