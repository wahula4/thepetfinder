// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var s3 = require('s3')
var keys = require("../keys.js");

var client = s3.createClient({
	maxAsyncS3: 20, // this is the default
	s3RetryCount: 3, // this is the default
	s3RetryDelay: 1000, // this is the default
	multipartUploadThreshold: 20971520, // this is the default (20 MB)
	multipartUploadSize: 15728640, // this is the default (15 MB)
	s3Options: {
		accessKeyId: keys.s3accesskey,
		secretAccessKey: keys.s3secretaccesskey,
// 		// any other options are passed to new AWS.S3()
// 		// See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
	},
});

// Routes
// =============================================================
module.exports = function(app, db) {

  // GET route for getting all of the posts from the lost table
  app.get("/api/lostposts", function(req, res) {
    db.user_lost.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

 // GET route for getting all of the posts from the found table
  app.get("/api/foundposts", function(req, res) {
    db.user_found.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post from the lost table
  app.get("/api/lostposts/:id", function(req, res) {
    db.user_lost.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

// Get route for retrieving a single post from the found table
  app.get("/api/foundposts/:id", function(req, res) {
    db.user_found.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post to lost file
  app.post("/api/lostposts", function(req, res) {
    db.user_lost.create(
      req.body
    )
    .then(function(dbPost) {
			if (objectHasNoKeys(req.files)) {
				return res.redirect('../lostDisplay.html');
	  	}

	  	var photoLost = req.files.photoLost;

	  	// Use the mv() method to place the file somewhere on your server
	  	photoLost.mv('uploads/' + req.files.photoLost.name, function(err) {
	  		if (err) {
	  			return res.status(500).send(err);
	  		}
	  	// Upload to S3


	  		var params = {
	  			localFile: 'uploads/' + req.files.photoLost.name,

	  			s3Params: {
	  				Bucket: keys.s3bucket,
	  				Key: req.files.photoLost.name, // File path of location on S3
	  			},
	  		};
	  		var uploader = client.uploadFile(params);
	  		uploader.on('error', function(err) {
	  			console.error("unable to upload:", err.stack);
	  			res.status(500).send(err.stack);
	  		});
	  		uploader.on('end', function() {
	  			console.log("done uploading");
	  			res.redirect('../lostDisplay.html');
	  		});
	  	});

    });
  });

function objectHasNoKeys(theObject) {
	var keys = Object.keys(theObject);
	if (keys.length <= 0) {
		return true
	}
	return false;
}


// POST route for saving a new post to found file
app.post("/api/foundposts", function(req, res) {
  console.log(req.body);
  db.user_found.create(
    req.body
    )
  .then(function(dbPost) {

    if (!req.files) {
  		// return res.redirect('../foundDisplay.html');
			res.status(400).send('No files were uploaded.');
  	}
			var photoFound = req.files.photoFound;

	  	// Use the mv() method to place the file somewhere on your server
	  	photoFound.mv('uploads/' + req.files.photoFound.name, function(err) {
	  		if (err) {
	  			return res.status(500).send(err);
	  		}
  		// Upload to S3
  		var params = {
  			localFile: 'uploads/' + req.files.photoFound.name,

  			s3Params: {
  				Bucket: keys.s3bucket,
  				Key: req.files.photoFound.name, // File path of location on S3
  			},
  		};
  		var uploader = client.uploadFile(params);
  		uploader.on('error', function(err) {
  			console.error("unable to upload:", err.stack);
  			res.status(500).send(err.stack);
  		});
  		uploader.on('end', function() {
  			console.log("done uploading");
  			res.redirect('../foundDisplay.html');
  		});
		});

  });
});
};
