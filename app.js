var koa         = require('koa');
var file_static = require('koa-static');
var mount       = require('koa-mount');
var router      = require('koa-router');
var body_parser = require('koa-body');
var mongo       = require('mongodb').MongoClient;
var mongoose    = require('mongoose');
var moment      = require('moment');
var _           = require('underscore');

var mongourl = 'mongodb://localhost:27017/data';
var db       = mongoose.connection;
var app      = koa();

var UserSchema = mongoose.Schema({
	username : String,
	password : String
});
var User = mongoose.model('User', UserSchema);

var predefined_users = require('./data_source/users');
var dashes           = require('./data_source/dashes');
var grapher			 = require('./data_source/graphes');

var publisher = function(result, message, extra, options){
	extra = extra || {};
	options = options || {};

	return JSON.stringify({
		success: result,
		message: message,
		extra:   extra,
		options: options
	});
};

//Router
var api = new router();

/**
 * (GET) Return th greeting message
 */
api.get('/api', function *(next){
	this.type   = 'json';
	this.status = 200;
	this.body   = '{ "message" : "Hi, there." }';
});//eo get(/api)

/**
 * (GET) Return random data for chart
 */
api.get('/api/getRandomData', function(){
	var data = [],
        i = 0;
        
    var floor = 20;
    
    for (i = 0; i < 8; i++) {
        data.push({
            name: moment().month(i).format('MMM'),
            data1: Math.floor(Math.max((Math.random() * 100), floor)),
            data2: Math.floor(Math.max((Math.random() * 100), floor)),
            data3: Math.floor(Math.max((Math.random() * 100), floor)),
            data4: Math.floor(Math.max((Math.random() * 100), floor)),
            data5: Math.floor(Math.max((Math.random() * 100), floor)),
            data6: Math.floor(Math.max((Math.random() * 100), floor)),
            data7: Math.floor(Math.max((Math.random() * 100), floor)),
            data8: Math.floor(Math.max((Math.random() * 100), floor)),
            data9: Math.floor(Math.max((Math.random() * 100), floor))
        });
    }
    
    this.body = JSON.stringify({
    	items: data
    });
});

/**
 * (POST) Return the config JSON string for the dashboards
 */
api.post('/api/getDash', function *(next){
	var request = this.request.body;
	var user = yield User.find({ _id : request.user_token }).exec();

	dashes.main_border_panel.title = 'Hi, ' + user[0]['username'];

	this.body = JSON.stringify(dashes.main_border_panel);
});

/**
 * (POST) User login
 */
api.post('/api/login', function *(next){
	var request   = this.request.body;
	var all_users = yield User.find().exec();

	if(_.isUndefined(request.username) || _.isUndefined(request.password)){
		this.body = publisher(false, 'Username and Password are required');
	}else{
		var user = yield User.find(request).exec();

		if(user.length){

			var user = { 
				_id:        user[0]._id,      
				username:   user[0].username,
				login_time: moment().format('YYYY MMM Do H:s')
			};

			this.body = publisher(true, 'Loggin succeed', user);
		}else{
			this.body = publisher(false, 'Loggin failed');
		}
	}
});//eo post(/api/login)

/**
 * (POST) Return the main menu items
 */
api.post('/api/getMainMenu', function *(next){
	var request = this.request.body;
	var user = yield User.find({ _id : request.user_token }).exec();

	//find menu items for user
	this.body = JSON.stringify({
		suceess: true,
		total: 3,
		children: [
			{ 
				id: 1, 
				text: 'operations',
				expanded: true,
				children: [
					{ id: 2, text: 'List', action: 'show list', leaf: true },
					{ id: 3, text: 'Profile', action:'show profile', leaf: true }
				],
				leaf: false
			},
		]
	});
});

/**
 * (POST) Return chart graph
 */
api.post('/api/getGraph', function *(next){
	var request = this.request.body;
	var user = yield User.find({ _id : request.user_token }).exec();

	this.body = grapher.getRandomOne();
});

//Logger
var logger = function *(next){
   var start = new Date();

   yield next;

   var ms = new Date() - start;

   console.log('%s %s - %s ms', this.method, this.url, ms);
};

app.use(logger);
app.use(file_static('.'));
app.use(body_parser({formidable:{uploadDir: __dirname}}));
app.use(mount('/', api.middleware()));

app.listen(3000);

//Notify server has started
console.info('KOA started @ ' + new Date());

//Test MongoDB
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	if(_.isArray(predefined_users)){
		predefined_users.forEach(function(user_rec){
			var user = User.find(user_rec, function(err, u){
				if(!u.length){
					var new_user = new User(user_rec);
					new_user.save();

					console.info('User does not exist, create new one');
				}else{
					console.info(user_rec.username, ' exists');
				}//eo if-else
			});//eo User.find
		});//eo forEach
	}//eo if
});//eo open event
mongoose.connect('mongodb://localhost/data');
