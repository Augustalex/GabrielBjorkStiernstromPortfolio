let Vue = require('vue')

Vue.component('site-append', {
    data() {
        return {
            el: null
        }
    },
    render(h) {
        return h('div', {style: {display: 'none'}}, [this.$slots.default])
    },
    mounted() {
        this.el = this.$el.firstChild
        document.body.appendChild(this.el)
    },
    destroyed() {
        this.el.remove()
    }
})