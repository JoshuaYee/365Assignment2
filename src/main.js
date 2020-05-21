import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import ViewPetition from './ViewPetition.vue'
import ViewAllPetitions from './ViewAllPetitions.vue'
import Register from './Register.vue'
import Login from './Login.vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuetify)
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const routes = [
  {
    path:"/petitions/:id",
    component: ViewPetition
  },
  {
    path:"/petitions",
    component: ViewAllPetitions
  },
  {
    path:"/users/login",
    component: Login
  },
  {
    path:"/users/register",
    component: Register
  }

];
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router: router,
  render: h => h(App)
});
