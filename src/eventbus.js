import Vue from 'vue'
const EventBus = new Vue({
    data(){
        return {
            connect: false
        }
    }
})
// const EventBus = new Vue()
window.EventBus = EventBus
export default EventBus 