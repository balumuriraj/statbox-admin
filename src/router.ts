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
import Login from './views/Login';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: Movie,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/celebs',
      name: 'celebs',
      component: Celebs,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/celebs/:id',
      name: 'celeb',
      component: Celeb,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/polls',
      name: 'polls',
      component: Polls,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/polls/:id',
      name: 'poll',
      component: Poll,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/database',
      name: 'createDB',
      component: CreateDB,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/firebase',
      name: 'storage',
      component: Storage,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/algolia',
      name: 'search',
      component: Search,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = false;
  const localStore = sessionStorage.getItem('store');

  if (localStore) {
    const payload = JSON.parse(localStore);
    isLoggedIn = payload.isLoggedIn;
  }

  const requireAuth = to.matched.some((record) => record.meta.requireAuth);

  if (requireAuth && !isLoggedIn) {
    next('login');
  } else if (!requireAuth && isLoggedIn) {
    next('movies');
  } else {
    next();
  }
});

export default router;
