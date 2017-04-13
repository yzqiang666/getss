var express = require('express');
var superagent = require("superagent");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true;
var token = "e39ed54e-18ee-4eae-b372-41b4e05721f3";
var secret = "eoZ9cCkTpM0d6Rb7BEtXl5luBcqZyVeiNLZuKUxGjgOFnB1tqTChz3Wr8JKS2kJY";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
	superagent.get("https://app.arukas.io/api/containers").auth(token,secret,{type:"auto"})
	.end(function(err,res2){
		var data = res2.body.data;
		var app_list = [];
		for(var i=0;i<data.length;i++){
			var port = data[i].attributes.port_mappings[0][0].service_port;
			var host = data[i].attributes.port_mappings[0][0].host;
			var ip = host.substring(6,host.indexOf(".")).replace(/-/g,".");
			app_list.push({
				"ip":ip,
				"port":port,
				"method":"rc4-md5",
				"password":"yzqyzq"
			})
		}
		res.render("index",{
			"data":app_list
		});
	});
})

app.listen("3000",function(){
	console.log("server start……")
})