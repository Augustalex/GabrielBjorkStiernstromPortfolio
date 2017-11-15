let assert = require('assert')
let sinon = require('sinon')
let EventBus = require('../../JS/EventBus.js')
module.exports = {
    'EventBus': {
        'when listen to message and emit message should call listener': function () {
            let eventBus = EventBus()
            let listener = sinon.stub()
            eventBus.on('message', listener)
            
            eventBus.emit('message')
            
            sinon.assert.calledOnce(listener)
        },
        'when listen with two different listeners to message and emit message should call both listeners': function () {
            let eventBus = EventBus()
            let firstListener = sinon.stub()
            eventBus.on('message', firstListener)
            let secondListener = sinon.stub()
            eventBus.on('message', secondListener)
    
            eventBus.emit('message')
    
            sinon.assert.calledOnce(firstListener)
            sinon.assert.calledOnce(secondListener)
        },
        'when listen to message twice with same listener and emit message should call listener once': function () {
            let eventBus = EventBus()
            let listener = sinon.stub()
            eventBus.on('message', listener)
            eventBus.on('message', listener)
    
            eventBus.emit('message')
    
            sinon.assert.calledOnce(listener)
        },
        'when listen to message and emit message with data should call listener with that data': function () {
            let eventBus = EventBus()
            let listener = sinon.stub()
            eventBus.on('message', listener)
    
            eventBus.emit('message', 'data')
    
            sinon.assert.calledWith(listener, 'data')
        },
        'when listen to message and emit other message should NOT call listener': function () {
            let eventBus = EventBus()
            let listener = sinon.stub()
            eventBus.on('message', listener)
    
            eventBus.emit('otherMessage')
    
            sinon.assert.notCalled(listener)
        }
    }
}