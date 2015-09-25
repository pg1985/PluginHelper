/**
 * Created by Patrick on 9/24/15.
 */
function Weebly() {
    this.Q = require('q');
    this.request = require('then-request');
}

Weebly.prototype.getClientID = function() {
    return "853814272";
};

Weebly.prototype.getSecret = function(){
    return "a2a3e2f7b96f0d4c3e887e886dc33e38bb96ab48a2b070a9afb3f6c1094345be";
};

Weebly.prototype.getWeeblyUserInfo = function() {

};

Weebly.prototype.getWeeblySiteInfo = function() {

};

Weebly.prototype.getAccessToken = function(callback_url, post_form) {
    console.log(callback_url);

    var deferred = this.Q.defer();

    this.request('POST', callback_url, {body:post_form}).done(function(res){
        console.log(res.getBody());
        deferred.resolve(res.getBody());
    });

    return deferred.promise;

};

module.exports = Weebly;