import Vue from 'vue'
import Router from 'vue-router'
import Main from './routes/Main.vue'
import Profile from './routes/Profile.vue'
import Leaderboard from './routes/Leaderboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard
    }
  ]
})