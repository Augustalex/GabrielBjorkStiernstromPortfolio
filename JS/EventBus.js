module.exports = function () {
    
    let listeners = {}
    
    return {
        on(message, handler) {
            listeners[message] = listeners[message] || new Set()
            listeners[message].add(handler)
        },
        emit(message, data) {
            let handlers = listeners[message]
            if(!handlers) return
    
            handlers.forEach(listener => {
                listener(data)
            })
        }
    }
}