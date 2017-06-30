// /*      COOLSHOW PLUGINS        */
//
// /**
//  * Created by August on 2016-12-06.
//  */
//
// /**
//  * Used in the Promise object. Takes a function callback and a single value
//  * to be passed into the function. Has a function that initiates the function
//  * and returns a promise.
//  *
//  * @param func
//  * @param value
//  * @constructor
//  */
// function PromiseCallback(func, value){
//     var self = this;
//
//     this.promise = new Promise();
//     this.func = func;
//     this.value = value;
//
//     this.start = function(){
//         this.func(this.value)
//             .onSet(function(){
//                 self.promise.set(true);
//             });
//     };
// }
//
// function Countdown(goal, callbackFunction){
//     this.time = 0;
//
//     this.tick = function(){
//         this.time++;
//         if(this.time == goal)
//             callbackFunction();
//     };
// }
//
// /**
//  * A Promise stores operations for when a process either
//  * succeeds or fails. This means a user may declare method calls before
//  * receiving any values from the method now returning a Promise for the
//  * value instead. Make asynchronous programming more comfortable.
//  * @constructor
//  */
// function Promise(){
//
//     var fulfilment = null;
//
//     var errorCallback = {func: null};
//     var cancelCallback = {func: null};
//     var successCallback = {func: null};
//     var finalCallback = {func: null};
//
//     /**
//      * Prepares the error callback object.
//      *
//      * @returns {Promise}
//      */
//     this.onError = function(callback){
//         preparePromiseCallback(errorCallback, callback);
//
//         return this;
//     };
//
//     /**
//      * Prepares the cancel callback object.
//      *
//      * @param callback
//      * @returns {Promise}
//      */
//     this.onCancel = function(callback){
//         preparePromiseCallback(cancelCallback, callback);
//
//         return this;
//     };
//
//     /**
//      * Prepares the success callback object.
//      *
//      * @param callback
//      * @returns {Promise}
//      */
//     this.onSet = function(callback){
//         preparePromiseCallback(successCallback, callback);
//
//         return this;
//     };
//
//     /**
//      * Prepares the finally callback object.
//      *
//      * This executes after the successCallback.
//      * Useful for when additional successCallbacks might
//      * be adding during the Promise lifetime. The finally
//      * callback will always be called after all attached
//      * successCallbacks.
//      *
//      * @param callback
//      * @returns {Promise}
//      */
//     this.finally = function(callback){
//         preparePromiseCallback(finalCallback, callback);
//         return this;
//     };
//
//     /**
//      * Run when a value has been set. (Could be an error or cancellation message
//      * as well as a success value).
//      *
//      * If the callback is null, then the Promise fulfilment is set to the callback variable
//      * reference. If any callback is set by onError, onSet or onCancel, the fulfilment is
//      * checked against each callback object reference. If the reference matches the fulfilment
//      * then the fulfilment is run with the value stored in the callback object.
//      *
//      * @param callbackObj
//      * @param value
//      */
//     function fulfill(callbackObj, value){
//         setFulfilment(callbackObj, value);
//
//         if(callbackObj.func)
//             run(callbackObj);
//     }
//
//     /**
//      * Sets the value of a callback object and
//      * set the fulfilment reference to the
//      * callback object.
//      *
//      * @param callbackObj
//      * @param value
//      */
//     function setFulfilment(callbackObj, value){
//         callbackObj.value = value;
//
//         fulfilment = callbackObj;
//     }
//
//     /**
//      * Prepares a callback object with a given function.
//      *
//      * If the fulfilment of the Promise is already set
//      * then if the fulfilment is referencing the same
//      * callback object as the argument, then the fulfilment
//      * is run with the argument function.
//      *
//      * @param callbackObj
//      * @param callbackFunction
//      */
//     function preparePromiseCallback(callbackObj, callbackFunction){
//         if(fulfilment == callbackObj && !!callbackObj.value)
//             callbackFunction(fulfilment.value);
//         else
//             callbackObj.func = callbackFunction;
//     }
//
//     /**
//      * Tries to run a callback object with its function and value.
//      *
//      * If an error is caught then the error callback is tried.
//      *
//      * @param callbackObject
//      */
//     function run(callbackObject){
//         callbackObject.func(callbackObject.value);
//
//         if(callbackObject != finalCallback)
//             runFinalCallback();
//     }
//
//     function runFinalCallback(){
//         if(finalCallback.func) {
//             console.log("RUNNING FINAL");
//             run(finalCallback);
//         }
//     }
//
//     /**
//      * Sets a value to the promise and tries to run the successCallback.
//      * If the entered value is null, then the errorCallback is called.
//      * If the successCallbacks fails a try-catch will trigger the errorCallback
//      * with the thrown exception from the error.
//      *
//      * @param value
//      * @returns {Promise}
//      */
//     this.set = function(value){
//         fulfill(successCallback, value);
//
//         return this;
//     };
//
//     /**
//      * Cancels promise. If a callback for cancel is not set then a callback
//      * for error is called.
//      *
//      * The input parameter is a message explaining why the promise was canceled
//      * so that this message can be logged for later review.
//      * @param message
//      */
//     this.cancel = function(message){
//         fulfill(cancelCallback, message);
//
//         return this;
//     };
//
//     this.error = function(message){
//         fulfill(errorCallback, message);
//
//         return this;
//     };
//
//     this.copyFrom = function(otherPromise){
//         this.errorCallback = otherPromise.errorCallback;
//         this.cancelCallback = otherPromise.cancelCallback;
//         this.successCallback = otherPromise.successCallback;
//
//         return this;
//     };
//
//     this.attachOnSet = function(nextOnSet){
//         this.successCallback = function(value){
//             this.successCallback(value);
//             nextOnSet(value);
//         };
//
//         return this;
//     };
//
//     this.connect = function(otherPromise){
//         var self = this;
//         otherPromise.onSet(function(value){
//             self.set(value);
//         });
//
//         otherPromise.onError(function(message){
//             runCallback(self.errorCallback, message);
//         });
//
//         otherPromise.onCancel(function(message){
//             self.cancel(message);
//         });
//
//         return this;
//     };
//
//     this.combine = function(promisesArray){
//         for(var i = 1; i < promisesArray.length; i++)
//             promisesArray[i].connect(promisesArray[i-1]);
//
//         return this.connect(promisesArray[promisesArray.length - 1]);
//     };
//
//     this.synchronize = function(callbackArray){
//         for(var i = 0; i < callbackArray.length-1; i++) {
//             const index = i;
//
//             callbackArray[i].promise.onSet(function () {
//                 callbackArray[index + 1].start();
//             });
//         }
//
//         callbackArray[0].start();
//
//         return callbackArray[callbackArray.length-1].promise;
//     };
//
// }
//
// Promise.syncedBlock = function(promises){
//     return new PromiseCallback(
//         function(promises){
//             var promise = new Promise();
//
//             var countdown = new Countdown(promises.length, function(){
//                 promise.set(true);
//             });
//
//             for(var i = 0; i < promises.length; i++)
//                 promises[i].onSet(function(){
//                     countdown.tick();
//                 });
//
//             return promise;
//         },
//         promises
//     );
// };
//
//
// function setRelativePath(path){
//     window.coolshowUtils = {};
//     window.coolshowUtils.relativePath = path;
// }
//
// /**
//  * Loads a file asynchronously with XHR.
//  *
//  * Wraps the progress in a Promise that can be used
//  * to handle error, cancel and success scenarios.
//  * @param fileSource
//  * @returns {Promise}
//  */
// function loadContent(fileSource){
//     var loadPromise = new Promise();
//
//     console.log("Going to load content at: " + fileSource);
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", window.coolshowUtils.relativePath + fileSource, true);
//     xhr.onreadystatechange = function(){
//         if(this.status !== 200){
//             console.log(this);
//             loadPromise.error("Could not load " + window.coolshowUtils.relativePath + fileSource);
//         }
//         else{
//             loadPromise.set(this.responseText);
//         }
//     };
//     xhr.send();
//
//     return loadPromise;
// }
//
// //Wraps XHR AJAX with a Promise.
// function loadScript(subPageSource){
//     /*var promise = new Promise();
//
//      try {
//      if (!window.coolshowUtils)
//      promise.cancel("Relative path not set.");
//
//      $.getScript(window.coolshowUtils.relativePath + subPageSrc, function () {
//      console.log("Loaded " + subPageSrc);
//      promise.set(true);
//      });
//      }
//      catch(error){
//      console.log("Error: ", error);
//      promise.cancel(error);
//      }
//
//      return promise;*/
//
//     var promise = new Promise();
//
//     if (!window.coolshowUtils) {
//         console.log("Relative path not set, cannot load script " + subPageSource);
//         promise.cancel("Relative path not set, cannot load script " + subPageSource);
//     }
//     else{
//         var element = document.createElement('script');
//
//         element.onload = function(){
//             document.body.appendChild(element);
//             promise.set(element);
//         };
//
//         element.onerror = promise.error;
//
//         element.async = false;
//         element.type = 'text/javascript';
//         element.src = window.coolshowUtils.relativePath + subPageSource;
//     }
//
//     return promise;
// }
//
// /**
//  * Wraps a loadScript function inside a PromiseCallback
//  * to be used in a synchronous Promise array.
//  * @param subPageSrc
//  * @returns {PromiseCallback}
//  */
// function syncedLoadScript(subPageSrc){
//     return new PromiseCallback(
//         loadScript,
//         subPageSrc
//     );
// }
//
// function loadAbsoluteScript(url){
//     var promise = new Promise();
//     $.getScript(url, function(){
//         promise.set(true);
//     });
//
//     return promise;
// }