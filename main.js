/**
 * Created by Patrick on 9/24/15.
 */
var express = require('express');
var request = require('request');
var url = require('url');
var crypto = require('crypto');

var weebly = require('./lib/weebly.js');

var weebly_secret = "a2a3e2f7b96f0d4c3e887e886dc33e38bb96ab48a2b070a9afb3f6c1094345be";

var app = express();

app.get('/weebly/oauth', function(req, res){
    var user_id = req.query.user_id;
    var site_id = req.query.site_id;
    var timestamp = req.query.timestamp;
    var hmac = req.query.hmac;
    var callback = req.query.callback_url;
    
    //var hash_string = "user_id=" + user_id + "&timestamp=" + req.query.timestamp + "&site_id=" + site_id;
    //
    //var crypted_hash = crypto.createHmac('sha256', weebly_secret);
    //crypted_hash.update('hash_string');
    //console.log(crypted_hash);

    var redirect_url = "https://www.weebly.com/app-center/oauth/authorize?client_id=853814272&user_id="+user_id+"&site_id="+site_id+"&scope=read:site&redirect_uri=" + callback_url;

    res.redirect(redirect_url);

    //console.log(crypted_hash === hmac);
    
});

app.get('/weebly/authorize', function(req,res){

    var post_url = "https://www.weebly.com/app-center/oauth/access_token";

    var post_form = {
        client_id:"853814272",
        client_secret: weebly_secret,
        authorization_code: req.query.authorization_code
    };

    request.post({url:post_url, form: post_form}, function(err,res,body){
        console.log(res);
        console.log(body);
    });



    return res.json()
});

app.get('/weebly/admin', function(req, res){
    //return admin html
});

app.listen('9876');
console.log('Listening on 9876');

exports = module.exports = app;

