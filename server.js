// Requiring npm packages
var express = require('express');
var bodyParser = require('body-parser');
var inquirer = require('inquirer');
var path = require('path');
var sequelize = require('sequelize');

// for file uploads
var fileUpload = require('express-fileupload');
var s3 = require('s3');
var keys = require('./views/js/keys.js');

var db = require('./models');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('./views'));

var client = s3.createClient({
	maxAsyncS3: 20, // this is the default
	s3RetryCount: 3, // this is the default
	s3RetryDelay: 1000, // this is the default
	multipartUploadThreshold: 20971520, // this is the default (20 MB)
	multipartUploadSize: 15728640, // this is the default (15 MB)
	s3Options: {
		accessKeyId: keys.s3accesskey,
		secretAccessKey: keys.s3secretaccesskey,
		// any other options are passed to new AWS.S3()
		// See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
	},
});

app.use(fileUpload());

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/views', 'ilost.html'));
});

app.post('/upload', function(req, res) {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	var sampleFile = req.files.sampleFile;

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv('uploads/' + req.files.sampleFile.name, function(err) {
		if (err) {
			return res.status(500).send(err);
		}

		// Upload to S3
		var params = {
			localFile: 'uploads/' + req.files.sampleFile.name,

			s3Params: {
				Bucket: keys.s3bucket,
				Key: req.files.sampleFile.name, // File path of location on S3
			},
		};
		var uploader = client.uploadFile(params);
		uploader.on('error', function(err) {
			console.error("unable to upload:", err.stack);
			res.status(500).send(err.stack);
		});
		uploader.on('end', function() {
			console.log("done uploading");
			res.send('File uploaded!');
		});
	});
});

//When working on local machine, uncomment this and comment the stuff below
db.sequelize.sync().then(function(){
  require('./routing/apiroutes.js')(app, db);
  app.listen(port, function(){
    console.log("Server listening on " + port);
  });
});

//When deploying to heroku.  Until we get mysql working, comment above and uncomment below

// app.listen(port, function(){
//   console.log("Server listening on " + port);
// });
