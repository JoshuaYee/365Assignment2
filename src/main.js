import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import ViewPetition from './ViewPetition.vue'
import ViewAllPetitions from './ViewAllPetitions.vue'
import ViewUser from './ViewUser.vue'
import EditUser from './EditUser.vue'
import Register from './Register.vue'
import CreatePetition from './CreatePetition.vue'
import Login from './Login.vue'
import EditPetition from './EditPetition.vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.use(Vuetify)
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const routes = [
  {
    path:"/petitions/:id",
    component: ViewPetition
  },
  {
    path:"/editpetition/:id",
    component: EditPetition
  },
  {
    path:"/usersedit/:id",
    component: EditUser
  },
  {
    path:"/users/:id",
    component: ViewUser
  },
  {
    path:"/createpetition",
    component: CreatePetition
  },
  {
    path:"/viewpetitions",
    component: ViewAllPetitions
  },
  {
    path:"/userslogin",
    component: Login
  },
  {
    path:"/usersregister",
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
