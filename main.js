/**
 * Created by Patrick on 9/24/15.
 */
var express = require('express');
var request = require('request');
var url = require('url');
var crypto = require('crypto');
var Q = require('q');

var weebly = require('./lib/weebly.js');

var weebly_secret = "a2a3e2f7b96f0d4c3e887e886dc33e38bb96ab48a2b070a9afb3f6c1094345be";
var weebly_client = "853814272";

var app = express();

var port = process.env.PORT || 8080;

app.get('/weebly/oauth', function(req, res){
    var user_id = req.query.user_id;
    var site_id = req.query.site_id;
    var timestamp = req.query.timestamp;
    var hmac = req.query.hmac;
    var callback = req.query.callback_url;

    var pushup_callback = "http://weeblyoauth.herokuapp.com/weebly/authorize";
    
    //var hash_string = "user_id=" + user_id + "&timestamp=" + req.query.timestamp + "&site_id=" + site_id;
    //
    //var crypted_hash = crypto.createHmac('sha256', weebly_secret);
    //crypted_hash.update('hash_string');
    //console.log(crypted_hash);

    var redirect_url = callback + "?client_id=" + weebly_client + "&user_id="+user_id+"&site_id="+site_id+"&scope=read:site&redirect_uri=" + pushup_callback;

    res.redirect(redirect_url);

});

app.get('/weebly/authorize', function(req,res){

    console.log(req.query);

    var post_form = {
        client_id: weebly_client,
        client_secret: weebly_secret,
        authorization_code: req.query.authorization_code
    };

    var token_result = weebly.getAccessToken(post_form);
    var callback_url = token_result.callback_url;

    res.redirect(callback_url);
});

app.get('/weebly/*', function(req, res){
    res.json(req.body)
});

app.get('/', function(req, res){
    res.end();
});

app.listen(port);
console.log('Listening on' + port);

exports = module.exports = app;

