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

function Promise(){

    var onHold = false;
    var valueHolder = null;

    this.errorCallback = null;
    this.successCallback = null;

    this.onError = function(callback){
        this.errorCallback = callback;
        return this;
    };

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

    var runCallback = function(callback, value){
        if(callback == null)
            console.log("No callback set.");
        else
            callback(value);
    };

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

    this.from = function(otherPromise){
        this.errorCallback = otherPromise.errorCallback;
        this.successCallback = otherPromise.successCallback;
        return this;
    };

    this.attach = function(callback){
        this.successCallback = function(value){
            const firstCallback = this.successCallback;
            runCallback(firstCallback, value);
            runCallback(callback, value);
        }
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

}

