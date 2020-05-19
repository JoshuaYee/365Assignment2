import Vue from 'vue'
import App from './App.vue'
import ViewPetition from './ViewPetition.vue'
import Login from './Login.vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const routes = [
  {
    path:"/petitions/:id",
    component: ViewPetition
  },
  {
    path:"/users/login",
    component: Login
  }

];
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
