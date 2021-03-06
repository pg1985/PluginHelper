/**
 * Created by Patrick on 9/24/15.
 */
var express = require('express');
var request = require('request');
var url = require('url');
var crypto = require('crypto');
var Q = require('q');
var jwtDecode = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');

var Weebly = require('./lib/weebly.js');
var weebly =  new Weebly();
var Community = require('./lib/community.js');

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

    var redirect_url = callback + "?client_id=" + weebly.getClientID() + "&user_id="+user_id+"&site_id="+site_id+"&scope=read:site&redirect_uri=" + pushup_callback;

    res.redirect(redirect_url);

});

app.get('/weebly/authorize', function(req,res){

    var post_form = {
        client_id: weebly.getClientID(),
        client_secret: weebly.getSecret(),
        authorization_code: req.query.authorization_code
    };

    var token_result = weebly.getAccessToken(req.query.callback_url, post_form);

    res.redirect("https://www.weebly.com/app-center/oauth/finish?client_id=" + weebly.getClientID());
});

app.get('/weebly/decode', function(req, res){
    var data2 = jwtDecode.verify(req.query.jwt_token, weebly.getSecret());
    res.json(data2);
});

app.listen(port);
console.log('Listening on' + port);

exports = module.exports = app;

