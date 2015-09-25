/**
 * Created by Patrick on 9/24/15.
 */
function Weebly() {
    this.Q = require('q');
    this.request = require('request');
}

Weebly.prototype.getClientID = function() {
    return "853814272";
}

Weebly.prototype.getSecret = function(){
    return "a2a3e2f7b96f0d4c3e887e886dc33e38bb96ab48a2b070a9afb3f6c1094345be";
}

Weebly.prototype.getWeeblyUserInfo = function() {

};

Weebly.prototype.getWeeblySiteInfo = function() {

};

Weebly.prototype.getAccessToken = function(post_form) {

    var deferred = this.Q.defer();

    this.request.post({url:req.query.callback_url, form: post_form}, function(err,res,body){

        if(err)
            deferred.reject(err);

        deferred.resolve(body.access_token);
        //save access token to community.
    });

    return deferred.promise();
};

module.exports = Weebly;