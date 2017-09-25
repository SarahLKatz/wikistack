const router = require('express').Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 

router.get('/', function(req,res,next){
  Page.findAll()
  .then(function(pages){
    res.render('index', { pages: pages });
  })
});

router.post('/', function(req, res, next) {

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function(values){
    const user = values[0]
    
    const page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function(page){
      return page.setAuthor(user);
    })
  })
  .then(function(savedPage){
    const author = User.findOne({
      where: {
        id: savedPage.authorId
      }
    })
    res.render('wikipage', { currentPage: savedPage, author: author })
  })
  .catch(next);
});

router.get('/add', function(req,res,next){
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(foundPage){
    res.render('wikipage', { currentPage: foundPage })
  })
  .catch(next);

});


module.exports = router;