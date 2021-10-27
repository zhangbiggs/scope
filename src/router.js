import VueRouter from 'vue-router'
import DeviceSetting from "./components/DeviceSetting.vue";
import DataAnalyze from "./components/DataAnalyze.vue";
import SoftSupport from "./components/SoftSupport.vue";
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [
    // the following object is a route record
    {
      path: '/DeviceSetting',
      component: DeviceSetting,
      name: 'DeviceSetting',
    },
    {
      path: '/DataAnalyze',
      component: DataAnalyze,
      name: 'DataAnalyze',
    },
    {
      path: '/SoftSupport',
      component: SoftSupport,
      name: 'SoftSupport',
    }
  ]
})

export default router

