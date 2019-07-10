import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Movies from './views/Movies';
import Movie from './views/Movie';
import Celebs from './views/Celebs';
import Celeb from './views/Celeb';
import Polls from './views/Polls';
import Poll from './views/Poll';
import CreateDB from './views/CreateDB';
import Storage from './views/Storage';
import Search from './views/Search';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies,
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: Movie,
    },
    {
      path: '/celebs',
      name: 'celebs',
      component: Celebs,
    },
    {
      path: '/celebs/:id',
      name: 'celeb',
      component: Celeb,
    },
    {
      path: '/polls',
      name: 'polls',
      component: Polls,
    },
    {
      path: '/polls/:id',
      name: 'poll',
      component: Poll,
    },
    {
      path: '/database',
      name: 'createDB',
      component: CreateDB,
    },
    {
      path: '/firebase',
      name: 'storage',
      component: Storage,
    },
    {
      path: '/algolia',
      name: 'search',
      component: Search,
    },
  ],
});
