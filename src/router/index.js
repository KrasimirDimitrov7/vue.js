import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Tickets from '../views/Tickets.vue'
import oneTicket from '../views/oneTicket.vue'
import MyProfile from '../views/MyProfile.vue'
import Categories from '../views/Categories.vue'
import Tickettype from '../views/Tickettype.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets
  },
  {
    path: '/tickets/:ticket_id',
    name: 'oneTicket',
    component: oneTicket
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/tickettype',
    name: 'Tickettype',
    component: Tickettype
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
