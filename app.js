var koa         = require('koa');
var file_static = require('koa-static');
var mount 	    = require('koa-mount');
var router	    = require('koa-router');
var body_parser = require('koa-body');
var mongo       = require('mongodb').MongoClient;
var moment		= require('moment');
var _ 			= require('underscore');
var app         = koa();

var publisher = function(result, message){
	return JSON.stringify({
		success : result,
		message : message
	});
};

//Router
var api = new router();
api.get('/api', function *(next){
	this.type   = 'json';
	this.status = 200;
	this.body   = '{ "message" : "Hi, there." }';
});
api.post('/api/login', function *(next){
	var request = this.request.body;

	if(_.isUndefined(request.username) || _.isUndefined(request.password)){
		this.body = publisher(false, 'Username and Password are required');
	}else{
		this.body = publisher(true, 'Loggin succeed');
	}
});

//Logger
var logger = function *(next){
   var start = new Date();

   yield next;

   var ms = new Date() - start;

   console.log('%s %s - %s ms', this.method, this.url, ms);
};

var mongourl = 'mongodb://localhost:27017/data';

app.use(logger);
app.use(file_static('.'));
app.use(body_parser({formidable:{uploadDir: __dirname}}));
app.use(mount('/', api.middleware()));

app.listen(3000);

//Notify server has started
console.info('KOA started @ ' + new Date());

//Test MongoDB
mongo.connect(mongourl, function(err, db){
	if(err){
		console.error('Unable to connect to MongoDB');
	}else{
		console.info('MongoDB is good to go');
	}

	db.close();
});