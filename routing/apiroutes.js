// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Routes
// =============================================================
module.exports = function(app, db) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    db.user_lost.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.user_lost.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post to lost file
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.user_lost.create(
      req.body
    )
    .then(function(dbPost) {
      res.redirect('../lostDisplay.html');
    });
  });


// POST route for saving a new post to found file
app.post("/api/posts", function(req, res) {
  console.log(req.body);
  db.user_found.create({
    // req.body
    nameFound: req.body.nameFound,
    emailFound: req.body.emailFound,
    phoneFound: req.body.phoneFound,
    addressFound: req.body.addressFound,
    typeFound: req.body.typeFound,
    dateFound: req.body.dateFound,
    genderFound: req.body.genderFound,
    commentFound: req.body.commentFound
  })
  .then(function(dbPost) {
    res.json(dbPost);
  });
});
};
