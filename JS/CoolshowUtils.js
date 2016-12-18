/**
 * Created by August on 2016-12-06.
 */

function Countdown(goal, callbackFunction){
    this.time = 0;

    this.tick = function(){
        this.time++;
        if(this.time == goal)
            callbackFunction();
    };
}

/**
 * A Promise stores operations for when a process either
 * succeeds or fails. This means a user may declare method calls before
 * receiving any values from the method now returning a Promise for the
 * value instead. Make asynchronous programming more comfortable.
 * @constructor
 */
function Promise(){

    var onHold = false;
    var valueHolder = null;

    this.errorCallback = null;
    this.cancelCallback = null;
    this.successCallback = null;

    /**
     * Sets a callback for if any of the callback
     * of the Promise fails, or if any passed value
     * to the success callback is null.
     * @param callback
     * @returns {Promise}
     */
    this.onError = function(callback){
        this.errorCallback = callback;
        return this;
    };

    /**
     * Sets a callback for if the Promise is canceled.
     * @param callback
     * @returns {Promise}
     */
    this.onCancel = function(callback){
        this.cancelCallback = callback;
        return this;
    };

    /**
     * Sets a callback for the success scenario,
     * that is if a legitimate value is later set on
     * the Promise object.
     *
     * If a value is already set on the Promise then
     * this executes the success callback immediately.
     *
     * @param callback
     * @returns {Promise}
     */
    this.onSet = function(callback){
        if(valueHolder != null)
            try {
                callback(valueHolder);
            }
            catch(error){
                runCallback(this.errorCallback, error);
            }
        else
            this.successCallback = callback;

        return this;
    };

    /**
     * Internal function for trying to run a callback.
     * If the callback is not set (is null) then a
     * console log is executed instead.
     * @param callback
     * @param value
     */
    var runCallback = function(callback, value){
        if(callback == null)
            console.log("No callback set.");
        else
            callback(value);
    };

    /**
     * Sets a value to the promise and tries to run the successCallback.
     * If the entered value is null, then the errorCallback is called.
     * If the successCallbacks fails a try-catch will trigger the errorCallback
     * with the thrown exception from the error.
     *
     * @param value
     * @returns {Promise}
     */
    this.set = function(value){
        if(this.successCallback == null)
            valueHolder = value;
        else if(!onHold) {
            if (value == null)
                runCallback(this.errorCallback, "Value was null.");
            else
                try {
                    runCallback(this.successCallback, value);
                }
                catch (error) {
                    runCallback(this.errorCallback, error);
                    console.log(value);
                    console.log(this.successCallback);
                }
        }

        return this;
    };

    /**
     * Cancels promise. If a callback for cancel is not set then a callback
     * for error is called.
     *
     * The input parameter is a message explaining why the promise was canceled
     * so that this message can be logged for later review.
     * @param message
     */
    this.cancel = function(message){
        if(this.cancelCallback != null)
            this.cancelCallback(message);
        else if(this.errorCallback != null)
            this.errorCallback(message);
        else
            console.log("Promise was canceled. Cancellation message: " + message);

        return this;
    };

    this.copyFrom = function(otherPromise){
        this.errorCallback = otherPromise.errorCallback;
        this.cancelCallback = otherPromise.cancelCallback;
        this.successCallback = otherPromise.successCallback;

        return this;
    };

    this.connect = function(otherPromise){
        var self = this;
        otherPromise.onSet(function(value){
            self.set(value);
        });

        otherPromise.onError(function(message){
            runCallback(self.errorCallback, message);
        });

        otherPromise.onCancel(function(message){
            self.cancel(message);
        });

        return this;
    };

    /**
     * Makes it so that callbacks are not triggered once the value is set.
     * Instead they are only triggered once the method "activate" has been called.
     *
     * @returns {Promise}
     */
    this.setToHold = function(){
        onHold = true;
        return this;
    };

    this.active = function(){
        runCallback(this.successCallback, valueHolder);
    };

    this.combine = function(promisesArray){
        for(var i = 1; i < promisesArray.length; i++)
            promisesArray[i].connect(promisesArray[i-1]);

        return this.connect(promisesArray[promisesArray.length - 1]);
    };

}

function setRelativePath(path){
    coolshowUtils = {};
    coolshowUtils.relativePath = path;
}

//Wraps JQuery AJAX with a Promise.
function loadScript(subPageSrc){
    var promise = new Promise();
    if(!coolshowUtils)
        throw Error("Relative path not set");
    $.getScript(coolshowUtils.relativePath + subPageSrc, function(){
        promise.set(true);
    });
    return promise;
}
function loadAbsoluteScript(url){
    var promise = new Promise();
    $.getScript(url, function(){

    });

    return promoi
}