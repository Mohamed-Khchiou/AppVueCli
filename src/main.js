import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import User from './components/User.vue';
import Blog from './components/Blog.vue';
import Compte from './components/Compte.vue';
import Restaurant from './components/Restaurant.vue';
import Modal from './components/Modal.vue';
import Carte from './components/Carte.vue';
import Commande from './components/Commande.vue';

// Définition des routes
Vue.use(VueRouter);

const routes = [
	{path:'/blog', component: Blog},
	{path:'/compte', component: Compte},
	{path:'/restaurant', component: Restaurant},
	{path:'/modal', component: Modal},
	{path:'/carte', component: Carte},
	{path:'/commande', component: Commande},
	{path:'/', component: User},
]

const router = new VueRouter({
	routes: routes,
	mode:'history'
}) 
// La ligne ci-dessous rend le composant User utilisable
// partout, dans tous les fichiers .vue
// C'est un GLOBAL COMPONENT
Vue.component("app-user", User);

// register modal componentm
Vue.component('app-restau-detail', Modal);
  

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
