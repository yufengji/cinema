import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import City from '@/components/city/city'
import NowPlaying from '@/components/now-playing/now-playing'
import ComingSoon from '@/components/coming-soon/coming-soon'
import Film from '@/components/film/film'
import Detail from '@/components/detail/detail'
import Cinema from '@/components/cinema/cinema'
import Login from '@/components/login/login'
import Center from '@/components/center/center'
import Seats from '@/components/seats/seats'
import AllCinema from '@/components/cinema/all-cinema'
import CinemaDetail from '@/components/cinema-detail/cinema-detail'
import CinemaFilm from '@/components/cinema-film/cinema-film'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/city',
      component: City
    },
    {
      path: '/film',
      component: Film,
      redirect: '/film/now-playing',
      children: [
        {
          path: 'now-playing',
          component: NowPlaying
        },
        {
          path: 'coming-soon',
          component: ComingSoon
        },
        {
          path: ':id',
          component: Detail
        },
        {
          path: ':id/cinema',
          name: 'cinemawithid',
          component: Cinema
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/center',
      component: Center
    },
    {
      path: '/seats/:scheduleid',
      name: 'scheduleDetail',
      component: Seats
    },
    {
      path: '/allcinema',
      component: AllCinema
    },
    {
      path: '/allcinema/:cinemaid',
      name: 'detailcinema',
      component: CinemaDetail
    },
    {
      path: '/allcinema/:cinemaid/film',
      name: 'cinemafilm',
      component: CinemaFilm
    }
  ]
})
