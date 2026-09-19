import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Desayuno from '../views/Desayuno.vue'
import Almuerzo from '../views/Almuerzo.vue'
import Cena from '../views/Cena.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/desayuno', name: 'Desayuno', component: Desayuno },
  { path: '/almuerzo', name: 'Almuerzo', component: Almuerzo },
  { path: '/cena', name: 'Cena', component: Cena }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router