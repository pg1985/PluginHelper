/**
 * Created by Patrick on 9/24/15.
 */
function Weebly() {
    this.Q = require('q');
    this.request = require('request');
}

function getWeeblyUserInfo() {

}

function getWeeblySiteInfo() {

}

function getAccessToken(post_form) {

    deferred = this.Q.defer();

    request.post({url:req.query.callback_url, form: post_form}, function(err,res,body){

        if(err)
            deferred.reject(err);

        deferred.resolve(body.access_token);
        //save access token to community.
    });

    return deferred.promise();
}

module.exports = Weebly;