import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: "",
    name: "main",
    component: () => import(/* webpackChunkName: "about" */ "../views/Main.vue"),
    children: [
      {
        path: '/',
        name: 'section',
        component: () => import(/* webpackChunkName: "about" */ "../views/Section.vue"),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
      },
      {
        path: '/calculator',
        name: 'calculator',
        component: () => import(/* webpackChunkName: "about" */ "../views/Calculator.vue"),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import(/* webpackChunkName: "about" */ "../views/Order.vue"),
      },
      {
        path: '/project',
        name: 'project',
        component: () => import(/* webpackChunkName: "about" */ "../views/Project.vue"),
      },
      {
        path: '/team',
        name: 'team',
        component: () => import(/* webpackChunkName: "about" */ "../views/Team.vue"),
      },
      {
        path: '/manageproduct',
        name: 'manageproduct',
        component: () => import(/* webpackChunkName: "about" */ "../views/ManageProduct.vue"),
      },
      {
        path: '/stock',
        name: 'stock',
        component: () => import(/* webpackChunkName: "about" */ "../views/Stock.vue"),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
